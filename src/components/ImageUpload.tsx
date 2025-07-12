import React, { useCallback, useState } from 'react';
import { Upload, FileImage, Loader2, Brain } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => Promise<void>;
  loading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleAnalyze = useCallback(async () => {
    if (selectedFile) {
      await onImageUpload(selectedFile);
    }
  }, [selectedFile, onImageUpload]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  return (
    <div className="max-w-4xl mx-auto">
      {!selectedFile ? (
        <div
          className={`relative bg-white/5 backdrop-blur-lg rounded-3xl border-2 border-dashed transition-all duration-300 ${
            dragActive
              ? 'border-blue-400 bg-blue-500/10'
              : 'border-white/20 hover:border-blue-400/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="p-16 text-center">
            <div className="mb-8">
              <div className="inline-flex p-6 bg-blue-500/20 rounded-2xl mb-6">
                <Upload className="w-12 h-12 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Upload Chest X-Ray</h2>
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                Drag and drop your chest X-ray image here, or click to browse files.
                Supported formats: JPG, JPEG, PNG
              </p>
            </div>

            <div className="space-y-4">
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <span className="inline-flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 cursor-pointer hover:transform hover:scale-105">
                  <FileImage className="w-6 h-6" />
                  <span>Select Image File</span>
                </span>
              </label>
              
              <p className="text-blue-300 text-sm">
                Maximum file size: 10MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Image Preview */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Image Preview</h3>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={previewUrl!}
                  alt="Selected chest X-ray"
                  className="max-w-md max-h-96 rounded-2xl shadow-2xl"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white text-sm font-medium">{selectedFile.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-200 border border-white/20"
            >
              Choose Different Image
            </button>
            
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 disabled:opacity-50 hover:transform hover:scale-105 disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="w-6 h-6" />
                  <span>Analyze X-Ray</span>
                </>
              )}
            </button>
          </div>

          {loading && (
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-center space-x-4">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-300">AI Analysis in Progress</h3>
                  <p className="text-blue-200">Running deep learning inference and generating visual explanations...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;