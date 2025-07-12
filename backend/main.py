import os
import io
import base64
import torch
import torch.nn as nn
from torchvision import models, transforms
import cv2
import numpy as np
from PIL import Image
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import preprocess_image
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tempfile
import shutil

app = FastAPI(title="Lung Disease Detection API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLASSES = ["Normal", "COVID", "TB", "Pneumonia", "Lung_Opacity"]
CLASS_COLORS = {
    "Normal":        (0, 200, 83),
    "COVID":         (255, 69, 96),
    "TB":            (72, 133, 237),
    "Pneumonia":     (255, 193, 7),
    "Lung_Opacity":  (142, 36, 170)
}

MODEL_PATH = "model.pth"

def get_model():
    model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
    model.fc = nn.Linear(512, len(CLASSES))
    return model

def run_grad_cam_on_image(img_path, model_path, cam_threshold=0.6):
    model = get_model()
    model.load_state_dict(torch.load(model_path, map_location="cpu"))
    model.eval()

    raw = cv2.imread(img_path)
    rgb = cv2.cvtColor(raw, cv2.COLOR_BGR2RGB)
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    gray_3ch = cv2.cvtColor(gray, cv2.COLOR_GRAY2RGB)
    resized_rgb = cv2.resize(rgb, (224, 224))
    input_tensor = preprocess_image(resized_rgb, mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])

    output = model(input_tensor)
    probs = torch.sigmoid(output).detach().numpy()[0]
    predicted = (probs > 0.5).astype(int)

    cam = GradCAM(model=model, target_layers=[model.layer4[-1]])
    overlays = []
    
    for i, present in enumerate(predicted):
        if present:
            class_name = CLASSES[i]
            grayscale_cam = cam(input_tensor=input_tensor, targets=[ClassifierOutputTarget(i)])[0]
            grayscale_cam = cv2.resize(grayscale_cam, (gray.shape[1], gray.shape[0]))
            mask = np.uint8(grayscale_cam > cam_threshold) * 255
            contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            fill_color = CLASS_COLORS[class_name]
            mask_rgb = np.zeros_like(gray_3ch)
            cv2.drawContours(mask_rgb, contours, -1, fill_color, thickness=cv2.FILLED)
            alpha = 0.5
            blended = np.where(mask_rgb > 0, cv2.addWeighted(gray_3ch, 1 - alpha, mask_rgb, alpha, 0), gray_3ch)
            cv2.drawContours(blended, contours, -1, (255, 255, 255), 1)
            overlays.append((blended, class_name, probs[i]))
    
    return overlays, probs

def image_to_base64(image_array):
    """Convert numpy array to base64 string"""
    pil_img = Image.fromarray(image_array.astype(np.uint8))
    buffer = io.BytesIO()
    pil_img.save(buffer, format='PNG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    return f"data:image/png;base64,{img_str}"

@app.get("/")
async def root():
    return {"message": "Lung Disease Detection API is running"}

@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_path = temp_file.name
        
        try:
            # Check if model exists
            if not os.path.exists(MODEL_PATH):
                raise HTTPException(status_code=500, detail="Model file not found. Please ensure model.pth is in the backend directory.")
            
            # Run inference and Grad-CAM
            overlays, all_probs = run_grad_cam_on_image(temp_path, MODEL_PATH)
            
            # Prepare results
            results = []
            detected_diseases = []
            
            # Add all predictions with confidence scores
            for i, (class_name, prob) in enumerate(zip(CLASSES, all_probs)):
                results.append({
                    "disease": class_name,
                    "confidence": float(prob),
                    "detected": prob > 0.5,
                    "color": f"rgb({CLASS_COLORS[class_name][0]}, {CLASS_COLORS[class_name][1]}, {CLASS_COLORS[class_name][2]})"
                })
                
                if prob > 0.5:
                    detected_diseases.append(class_name)
            
            # Convert overlay images to base64
            overlay_images = []
            for blended, class_name, confidence in overlays:
                img_base64 = image_to_base64(blended)
                overlay_images.append({
                    "disease": class_name,
                    "image": img_base64,
                    "confidence": float(confidence)
                })
            
            # Read original image for display
            original_img = cv2.imread(temp_path)
            original_rgb = cv2.cvtColor(original_img, cv2.COLOR_BGR2RGB)
            original_base64 = image_to_base64(original_rgb)
            
            return JSONResponse({
                "success": True,
                "predictions": results,
                "detected_diseases": detected_diseases,
                "overlay_images": overlay_images,
                "original_image": original_base64,
                "total_detections": len(detected_diseases)
            })
            
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)