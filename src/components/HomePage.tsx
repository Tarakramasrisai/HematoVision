import React, { useState, useRef } from 'react';
import { Upload, Activity, Microscope, FileImage, Loader2 } from 'lucide-react';
import type { PredictionResult } from '../App';

interface HomePageProps {
  onPrediction: (result: PredictionResult) => void;
}

const bloodCellTypes = ['eosinophil', 'lymphocyte', 'monocyte', 'neutrophil'];

export default function HomePage({ onPrediction }: HomePageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateClassification = async () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction result
    const randomClass = bloodCellTypes[Math.floor(Math.random() * bloodCellTypes.length)];
    const confidence = 85 + Math.random() * 12; // 85-97% confidence
    
    const result: PredictionResult = {
      className: randomClass,
      confidence: Math.round(confidence * 100) / 100,
      imageUrl: imagePreview!
    };
    
    setIsProcessing(false);
    onPrediction(result);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-full mr-4">
            <Microscope className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Blood Cell Classification</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Advanced AI-powered classification of blood cell types using deep learning technology
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <Activity className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate Classification</h3>
          <p className="text-gray-600">High-precision identification of eosinophils, lymphocytes, monocytes, and neutrophils</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
            <FileImage className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Upload</h3>
          <p className="text-gray-600">Drag and drop or click to upload blood cell microscopy images</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
            <Microscope className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3>
          <p className="text-gray-600">Get classification results with confidence scores in seconds</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Upload Blood Cell Image</h2>
          
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              imagePreview ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                />
                <p className="text-green-600 font-medium">Image uploaded successfully</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-full w-fit mx-auto">
                  <Upload className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">Drop your image here, or click to browse</p>
                  <p className="text-gray-500 mt-1">Supports PNG, JPG, JPEG formats</p>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {!imagePreview && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose File
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            {imagePreview && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Change Image
              </button>
            )}
            
            <button
              onClick={simulateClassification}
              disabled={!selectedFile || isProcessing}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedFile && !isProcessing
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Activity className="h-5 w-5" />
                  Predict Classification
                </>
              )}
            </button>
          </div>
        </div>

        {/* Cell Types Info */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Blood Cell Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bloodCellTypes.map((type) => (
              <div key={type} className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900 capitalize">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}