import React, { useState, useEffect } from 'react';

interface LoadingStateProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  size = 'medium',
  fullScreen = false,
  text = 'Loading...'
}) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Only show loading state after 100ms to prevent flickering
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) {
    return null;
  }

  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-primary-600 border-t-transparent`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingState; 