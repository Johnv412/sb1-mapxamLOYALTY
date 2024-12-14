import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'border-blue-500' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`
        ${sizeClasses[size]}
        animate-spin
        rounded-full
        border-2
        border-t-transparent
        ${color}
      `}></div>
    </div>
  );
};

export default LoadingSpinner;