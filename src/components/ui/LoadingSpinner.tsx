import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="inline-block">
      <div className="relative w-12 h-12">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-600 border-r-primary-600 animate-spin"></div>
        
        {/* Middle rotating ring (slower) */}
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-b-primary-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Inner dot */}
        <div className="absolute inset-4 bg-primary-600 rounded-full"></div>
      </div>
    </div>
  );
};
