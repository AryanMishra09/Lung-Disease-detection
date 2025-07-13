import React, { useState, useCallback } from "react";
import ImageUpload from "./ImageUpload";
import ResultsDisplay from "./ResultsDisplay";
import { AlertCircle } from "lucide-react";

export interface PredictionResult {
  disease: string;
  confidence: number;
  detected: boolean;
  color: string;
}

export interface OverlayImage {
  disease: string;
  image: string;
  confidence: number;
}

export interface AnalysisResults {
  success: boolean;
  predictions: PredictionResult[];
  detected_diseases: string[];
  overlay_images: OverlayImage[];
  original_image: string;
  total_detections: number;
}

const RadiologyPage: React.FC = () => {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://lung-disease-detection-wvi9.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Analysis failed");
      }

      const data: AnalysisResults = await response.json();
      setResults(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Chest X-Ray Analysis
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Upload a chest X-ray image for automated lung disease detection with
            AI-powered visual analysis
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-400/30 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-300 mb-2">
                  Analysis Error
                </h3>
                <p className="text-red-200">{error}</p>
                {error.includes("Model file not found") && (
                  <div className="mt-4 p-4 bg-red-500/20 rounded-lg">
                    <p className="text-red-200 text-sm">
                      <strong>Setup Required:</strong> Please download the model
                      file from the provided Google Drive link and place it as{" "}
                      <code className="bg-black/30 px-2 py-1 rounded">
                        model.pth
                      </code>{" "}
                      in the backend directory.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!results ? (
          <ImageUpload onImageUpload={handleImageUpload} loading={loading} />
        ) : (
          <ResultsDisplay results={results} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default RadiologyPage;
