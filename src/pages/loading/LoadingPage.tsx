import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

interface LoadingPageProps {
  duration?: number; // Duration in milliseconds (default: 10 seconds)
  onLoadingComplete?: () => void;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ 
  duration = 10000, 
  onLoadingComplete 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 25;
      if (currentProgress > 90) {
        currentProgress = 90;
      }
      setProgress(currentProgress);
    }, 200);

    const timer = setTimeout(() => {
      setProgress(100);
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 300);
      }
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, onLoadingComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-40 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 -ml-48 -mb-48"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="text-white"
            >
              <path 
                d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="mb-8">
          <LoadingSpinner />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
          Business Nexus
        </h1>
        <p className="text-lg text-gray-600 mb-8 font-medium">
          Connecting Opportunities
        </p>

        {/* Progress text */}
        <p className="text-sm text-gray-500 mb-4">
          {Math.round(progress)}%
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden shadow-sm">
          <div
            className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Status messages */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 animate-pulse">
            {progress < 30 && 'Initializing...'}
            {progress >= 30 && progress < 60 && 'Loading your workspace...'}
            {progress >= 60 && progress < 90 && 'Almost ready...'}
            {progress >= 90 && 'Finishing up...'}
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-blue-500 to-primary-600"></div>
    </div>
  );
};
