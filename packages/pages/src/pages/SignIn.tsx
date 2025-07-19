import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import FormField from '../components/FormField';
import { apiService } from '../utils/api';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  useEffect(() => {
    // Check if user came from "save and continue later"
    if (searchParams.get('saved') === 'true') {
      setShowSavedMessage(true);
      // Clear the URL parameter
      window.history.replaceState({}, '', '/signin');
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await apiService.signIn(formData);
      
      if (response.success) {
        // Navigate to appropriate step based on user's progress
        const userData = response.data?.user;
        if (userData?.completedSteps?.includes('signature')) {
          navigate('/welcome');
        } else if (userData?.completedSteps?.includes('tour')) {
          navigate('/signature');
        } else if (userData?.completedSteps?.includes('profile')) {
          navigate('/tour');
        } else if (userData?.completedSteps?.includes('account')) {
          navigate('/profile');
        } else {
          navigate('/account');
        }
      } else {
        setErrors({ submit: response.error || 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = formData.email && formData.password && /\S+@\S+\.\S+/.test(formData.email);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">
            Sign in to continue your onboarding journey
          </p>
          
          {showSavedMessage && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700">
                ✅ Your progress has been saved! Sign in to continue where you left off.
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
              placeholder="Enter your email address"
              required
              error={errors.email}
              autoComplete="email"
            />

            <FormField
              type="password"
              label="Password"
              value={formData.password}
              onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
              placeholder="Enter your password"
              required
              error={errors.password}
              autoComplete="current-password"
            />

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`
                w-full py-3 px-4 rounded-md text-white font-medium transition-all
                ${isValid && !isSubmitting
                  ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm hover:shadow-md'
                  : 'bg-gray-300 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/account" 
                className="text-blue-600 hover:text-blue-500 underline font-medium"
              >
                Create one here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;