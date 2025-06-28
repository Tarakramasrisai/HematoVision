import React from 'react';
import { ArrowLeft, CheckCircle, Activity, Eye, TrendingUp } from 'lucide-react';
import type { PredictionResult } from '../App';

interface ResultPageProps {
  result: PredictionResult;
  onBackHome: () => void;
}

const cellTypeDescriptions: Record<string, string> = {
  eosinophil: 'Eosinophils are white blood cells that play a role in allergic reactions and parasitic infections.',
  lymphocyte: 'Lymphocytes are crucial components of the adaptive immune system, including T cells and B cells.',
  monocyte: 'Monocytes are large white blood cells that differentiate into macrophages and dendritic cells.',
  neutrophil: 'Neutrophils are the most abundant type of white blood cells and first responders to infection.'
};

const cellTypeColors: Record<string, string> = {
  eosinophil: 'from-orange-500 to-red-500',
  lymphocyte: 'from-purple-500 to-indigo-500',
  monocyte: 'from-green-500 to-teal-500',
  neutrophil: 'from-blue-500 to-cyan-500'
};

export default function ResultPage({ result, onBackHome }: ResultPageProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 90) return 'Very High';
    if (confidence >= 80) return 'High';
    if (confidence >= 70) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBackHome}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mr-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Upload
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Classification Results</h1>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Analyzed Image</h2>
          </div>
          <div className="relative">
            <img
              src={result.imageUrl}
              alt="Blood cell sample"
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
              <span className="text-sm font-medium text-gray-700">Original Sample</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Classification Result</h2>
            </div>

            <div className="text-center space-y-4">
              <div className={`bg-gradient-to-r ${cellTypeColors[result.className]} p-8 rounded-xl text-white`}>
                <div className="space-y-3">
                  <Activity className="h-12 w-12 mx-auto" />
                  <h3 className="text-3xl font-bold capitalize">{result.className}</h3>
                  <p className="text-lg opacity-90">Blood Cell Type</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {cellTypeDescriptions[result.className]}
                </p>
              </div>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Confidence Analysis</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Confidence Score</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                  {getConfidenceLabel(result.confidence)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Accuracy</span>
                  <span className="font-medium">{result.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onBackHome}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Analyze Another
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Print Results
            </button>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 bg-blue-50 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Notice</h3>
        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-700">
            <strong>Disclaimer:</strong> This AI classification tool is for educational and research purposes only. 
            Results should not be used for medical diagnosis or treatment decisions. Always consult with qualified 
            healthcare professionals for medical advice and proper diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}