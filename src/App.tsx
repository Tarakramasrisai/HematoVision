import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ResultPage from './components/ResultPage';

export interface PredictionResult {
  className: string;
  confidence: number;
  imageUrl: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'result'>('home');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const handlePrediction = (result: PredictionResult) => {
    setPredictionResult(result);
    setCurrentPage('result');
  };

  const handleBackHome = () => {
    setCurrentPage('home');
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {currentPage === 'home' ? (
        <HomePage onPrediction={handlePrediction} />
      ) : (
        <ResultPage 
          result={predictionResult!} 
          onBackHome={handleBackHome} 
        />
      )}
    </div>
  );
}

export default App;