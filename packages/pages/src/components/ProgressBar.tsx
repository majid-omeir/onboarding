import React from 'react';
import type { ProgressBarProps } from '../types';

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  completedSteps,
  clickable = false,
  className = ''
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepStatus = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepStyles = (stepNumber: number) => {
    const status = getStepStatus(stepNumber);
    
    const baseStyles = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 relative z-10";
    
    switch (status) {
      case 'completed':
        return `${baseStyles} bg-green-500 text-white`;
      case 'current':
        return `${baseStyles} bg-blue-600 text-white ring-4 ring-blue-100`;
      case 'upcoming':
        return `${baseStyles} bg-gray-200 text-gray-600`;
      default:
        return baseStyles;
    }
  };

  const getStepIcon = (stepNumber: number) => {
    const status = getStepStatus(stepNumber);
    
    if (status === 'completed') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    
    return stepNumber;
  };

  const handleStepClick = (stepNumber: number) => {
    if (clickable && completedSteps.includes(stepNumber)) {
      // Handle navigation to completed step
      console.log(`Navigate to step ${stepNumber}`);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((stepNumber) => (
              <button
                key={stepNumber}
                onClick={() => handleStepClick(stepNumber)}
                disabled={!clickable || !completedSteps.includes(stepNumber)}
                className={`
                  ${getStepStyles(stepNumber)}
                  ${clickable && completedSteps.includes(stepNumber) 
                    ? 'cursor-pointer hover:scale-110' 
                    : 'cursor-default'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                `}
                aria-label={`Step ${stepNumber}`}
              >
                {getStepIcon(stepNumber)}
              </button>
            ))}
          </div>
          
          {/* Step Labels */}
          <div className="mt-3 flex justify-between">
            {['Account', 'Profile', 'Tour', 'Sign', 'Feedback'].map((label, index) => (
              <div 
                key={label}
                className="text-center"
              >
                <span className={`
                  text-sm font-medium
                  ${getStepStatus(index + 1) === 'current' ? 'text-blue-600' : 'text-gray-600'}
                `}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        <div className="mt-2 text-center">
          <span className="text-lg font-semibold text-gray-900">
            {['Account Creation', 'Profile Setup', 'Feature Tour', 'E-Signature', 'Feedback'][currentStep - 1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;