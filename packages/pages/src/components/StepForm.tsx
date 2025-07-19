import React from 'react';
import type { StepFormProps } from '../types';

const StepForm: React.FC<StepFormProps> = ({
  stepId: _stepId,
  title,
  description,
  children,
  onNext,
  onPrevious,
  isValid,
  isSubmitting = false,
  autoSave = true
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="text-center mb-8">
        <h1 className="text-h1 text-gray-900 mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-body-lg text-gray-600">
            {description}
          </p>
        )}
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-card shadow-card p-6 lg:p-8 mb-8">
        {children}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {onPrevious ? (
          <button
            type="button"
            onClick={onPrevious}
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-component text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center space-x-4">
          {/* Auto-save indicator */}
          {autoSave && (
            <div className="text-sm text-gray-500">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Saved
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onNext}
            disabled={!isValid || isSubmitting}
            className={`
              inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-component text-white transition-all
              ${isValid && !isSubmitting
                ? 'bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-button hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Continue
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Save and continue later */}
      <div className="text-center mt-6">
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Save and continue later
        </button>
      </div>
    </div>
  );
};

export default StepForm;