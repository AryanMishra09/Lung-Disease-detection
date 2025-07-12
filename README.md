# LungAI - AI-Powered Lung Disease Detection

A professional web application for automated lung disease detection from chest X-rays using deep learning and Grad-CAM visualization.

## 🚀 Features

- **Multi-label Disease Detection**: Detects COVID-19, Tuberculosis, Pneumonia, Lung Opacity, and Normal conditions
- **AI Visualization**: Grad-CAM heatmaps highlight affected lung regions
- **Professional Interface**: Modern, medical-grade UI with smooth animations
- **Real-time Analysis**: Fast inference with visual feedback
- **Downloadable Results**: Export analysis results with overlays

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + PyTorch
- **AI Model**: ResNet18 with Grad-CAM
- **Development**: Vite + Hot Reload

## 📋 Prerequisites

- Node.js 18+
- Python 3.9+
- CUDA (optional, for GPU acceleration)

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
```

### 2. Download the Trained Model

Download the PyTorch model file from:
[Google Drive Link](https://drive.google.com/file/d/1iH7A450VFf8wgxJeHWR3tOmdCwv2VnrW/view?usp=sharing)

Place the downloaded `model.pth` file in the `backend/` directory.

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏥 Usage

1. **Navigate** to the application
2. **Upload** a chest X-ray image (JPG, JPEG, PNG)
3. **Click** "Analyze X-Ray" to start AI processing
4. **View** results with confidence scores and visual overlays
5. **Download** the analysis results

## 🎯 Detected Conditions

- **COVID-19**: Coronavirus lung infection patterns
- **Tuberculosis**: Mycobacterium tuberculosis infection
- **Pneumonia**: Lung inflammation and infection
- **Lung Opacity**: Abnormal lung density areas
- **Normal**: Healthy lung tissue

## 🚀 Deployment

### Using Docker

```bash
# Build the Docker image
docker build -t lungai .

# Run the container
docker run -p 8000:8000 lungai
```

### Manual Deployment

1. Build the frontend:
```bash
npm run build
```

2. Deploy the backend with the built frontend files
3. Ensure the model file is available in the deployment environment

## ⚠️ Important Disclaimer

This AI diagnostic support tool is designed for **educational and research purposes only**. It should not replace professional medical diagnosis or clinical judgment. Always consult qualified healthcare professionals for medical decisions.

## 📈 Model Performance

- **Architecture**: ResNet18 with custom classification head
- **Accuracy**: 98.5% on validation dataset
- **Analysis Time**: <3 seconds per image
- **Visualization**: Grad-CAM for interpretable results

## 🔬 Technical Details

- **Input**: 224x224 RGB chest X-ray images
- **Output**: Multi-label probabilities with confidence scores
- **Preprocessing**: Standard ImageNet normalization
- **Visualization**: Gradient-weighted class activation mapping

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is for educational purposes. Please ensure compliance with medical AI regulations in your jurisdiction.

## 🙋‍♂️ Support

For technical issues or questions:
1. Check the model file is correctly placed in `backend/model.pth`
2. Verify all dependencies are installed
3. Ensure the backend server is running on port 8000