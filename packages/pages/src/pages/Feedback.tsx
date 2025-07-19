import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FeedbackData } from '../types';

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const preferenceOptions = [
    { id: 'easy-setup', label: 'Easy setup' },
    { id: 'performance', label: 'Performance' },
    { id: 'security', label: 'Security' },
    { id: 'support', label: 'Support' },
    { id: 'integration', label: 'Integration' },
    { id: 'pricing', label: 'Pricing' }
  ];

  useEffect(() => {
    // Show skip button after 10 seconds
    const timer = setTimeout(() => {
      setShowSkipButton(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  const handlePreferenceToggle = (preferenceId: string) => {
    setPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const feedbackData: FeedbackData = {
        rating,
        comment: comment.trim() || undefined,
        preferences,
        timestamp: new Date().toISOString()
      };

      // Update saved data
      const existingData = localStorage.getItem('onboarding-data');
      const savedData = existingData ? JSON.parse(existingData) : {};

      localStorage.setItem('onboarding-data', JSON.stringify({
        ...savedData,
        step: 5,
        feedbackData,
        onboardingCompleted: true,
        completedAt: new Date().toISOString()
      }));

      // Navigate to success page or dashboard
      navigate('/welcome');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemindLater = async () => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Save reminder preference
      const existingData = localStorage.getItem('onboarding-data');
      const savedData = existingData ? JSON.parse(existingData) : {};

      localStorage.setItem('onboarding-data', JSON.stringify({
        ...savedData,
        step: 5,
        feedbackReminder: true,
        onboardingCompleted: true,
        completedAt: new Date().toISOString()
      }));

      navigate('/welcome');
    } catch (error) {
      console.error('Error setting reminder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Save skip preference
      const existingData = localStorage.getItem('onboarding-data');
      const savedData = existingData ? JSON.parse(existingData) : {};

      localStorage.setItem('onboarding-data', JSON.stringify({
        ...savedData,
        step: 5,
        feedbackSkipped: true,
        onboardingCompleted: true,
        completedAt: new Date().toISOString()
      }));

      navigate('/welcome');
    } catch (error) {
      console.error('Error skipping feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-md w-full p-8 mx-4">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-success-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to CloudflareFlow!
          </h2>
          <p className="text-gray-600">
            How was your onboarding experience?
          </p>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className={`text-3xl transition-colors ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400`}
                aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
              >
                ⭐
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-sm text-gray-600 mt-2">
              {rating === 1 && "We'd love to improve"}
              {rating === 2 && "Thanks for the feedback"}
              {rating === 3 && "Good to know"}
              {rating === 4 && "Great, thanks!"}
              {rating === 5 && "Awesome, glad you enjoyed it!"}
            </p>
          )}
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Tell us more (optional):
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like most? Any suggestions for improvement?"
            rows={3}
            maxLength={250}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm resize-none"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">
              Your feedback helps us improve
            </span>
            <span className="text-xs text-gray-500">
              {comment.length}/250
            </span>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 mb-3">
            What's most important to you?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {preferenceOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handlePreferenceToggle(option.id)}
                className={`text-sm px-3 py-2 rounded border transition-colors ${
                  preferences.includes(option.id)
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">
                  {preferences.includes(option.id) ? '☑' : '☐'}
                </span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
              rating > 0 && !isSubmitting
                ? 'bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              'Submit Feedback'
            )}
          </button>

          <button
            onClick={handleRemindLater}
            disabled={isSubmitting}
            className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Remind me later (24 hours)
          </button>

          {showSkipButton && (
            <button
              onClick={handleSkip}
              disabled={isSubmitting}
              className="w-full py-2 px-4 text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              Skip feedback
            </button>
          )}
        </div>

        {!showSkipButton && (
          <p className="text-center text-xs text-gray-500 mt-4">
            Skip option available in {Math.max(0, 10 - Math.floor((Date.now() % 10000) / 1000))} seconds
          </p>
        )}
      </div>
    </div>
  );
};

export default Feedback;