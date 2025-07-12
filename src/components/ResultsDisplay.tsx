import React from 'react';
import { AnalysisResults } from './RadiologyPage';
import { Download, RotateCcw, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

interface ResultsDisplayProps {
  results: AnalysisResults;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset }) => {
  const handleDownload = () => {
    // Create a canvas to combine original and overlay images
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Download the image
      const link = document.createElement('a');
      link.download = `lungai_analysis_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = results.original_image;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500/20';
    if (confidence >= 0.6) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 mb-6">
          <Activity className="w-6 h-6 text-green-400" />
          <span className="text-white font-semibold">Analysis Complete</span>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Diagnostic Results</h2>
        <p className="text-blue-200 text-lg">
          {results.total_detections === 0 
            ? "No abnormalities detected - appears normal"
            : `${results.total_detections} condition${results.total_detections > 1 ? 's' : ''} detected`
          }
        </p>
      </div>

      {/* Detection Summary */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {results.predictions.map((prediction, index) => (
          <div
            key={index}
            className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
              prediction.detected 
                ? 'border-white/30 bg-white/10' 
                : 'border-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: prediction.color }}
              ></div>
              {prediction.detected ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <div className="w-5 h-5"></div>
              )}
            </div>
            
            <h3 className={`text-lg font-semibold mb-2 ${
              prediction.detected ? 'text-white' : 'text-gray-400'
            }`}>
              {prediction.disease}
            </h3>
            
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              getConfidenceBg(prediction.confidence)
            }`}>
              <span className={getConfidenceColor(prediction.confidence)}>
                {(prediction.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Analysis */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Original Image */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Original X-Ray</h3>
          <div className="flex justify-center">
            <img
              src={results.original_image}
              alt="Original chest X-ray"
              className="max-w-full max-h-96 rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Overlay Analysis */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">AI Analysis Overlay</h3>
          
          {results.overlay_images.length > 0 ? (
            <div className="space-y-6">
              {results.overlay_images.map((overlay, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-white">{overlay.disease}</h4>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getConfidenceBg(overlay.confidence)
                    }`}>
                      <span className={getConfidenceColor(overlay.confidence)}>
                        {(overlay.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <img
                    src={overlay.image}
                    alt={`${overlay.disease} analysis`}
                    className="w-full rounded-2xl shadow-lg"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Normal Scan</h4>
              <p className="text-blue-200 text-center">
                No abnormalities detected in the chest X-ray. The lung tissue appears healthy.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-6 h-6 text-amber-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-amber-300 mb-2">Important Notice</h3>
            <p className="text-amber-100">
              This AI analysis is for research and educational purposes only. It should not replace 
              professional medical diagnosis. Please consult a qualified radiologist or healthcare 
              professional for clinical decision-making.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 border border-white/20"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Analyze Another Image</span>
        </button>
        
        <button
          onClick={handleDownload}
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 hover:transform hover:scale-105"
        >
          <Download className="w-5 h-5" />
          <span>Download Results</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;