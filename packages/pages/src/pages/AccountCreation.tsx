import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StepForm from '../components/StepForm';
import FormField from '../components/FormField';
import { apiService, type User } from '../utils/api';

const AccountCreation: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<User>>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { score: 0, text: '' };
    if (password.length < 6) return { score: 1, text: 'Weak' };
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { score: 2, text: 'Fair' };
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      return { score: 3, text: 'Good' };
    }
    return { score: 4, text: 'Strong' };
  };

  const passwordStrength = getPasswordStrength(password);

  const isValid = formData.email && 
                  formData.firstName &&
                  formData.lastName &&
                  password && 
                  confirmPassword && 
                  password === confirmPassword && 
                  password.length >= 8 && 
                  agreedToTerms;

  const handleNext = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Start onboarding with the Worker API
      const response = await apiService.startOnboarding({
        email: formData.email!,
        firstName: formData.firstName!,
        lastName: formData.lastName!,
        company: formData.company || '',
        password: password,
        agreedToTerms: agreedToTerms,
      });

      if (response.success) {
        // Save step data
        await apiService.saveStep({
          stepId: 'account',
          data: {
            ...formData,
            completedAt: new Date().toISOString()
          }
        });

        // Navigate to next step
        navigate('/profile');
      } else {
        setErrors({ submit: response.error || 'Failed to create account' });
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof User) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <StepForm
      stepId="account"
      title="Welcome to CloudflareFlow"
      description="Create your account to get started with our onboarding process"
      onNext={handleNext}
      isValid={Boolean(isValid)}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          type="text"
          label="First Name"
          value={formData.firstName || ''}
          onChange={updateFormData('firstName')}
          placeholder="Enter your first name"
          autoComplete="given-name"
          error={errors.firstName}
          required
        />
        
        <FormField
          type="text"
          label="Last Name"
          value={formData.lastName || ''}
          onChange={updateFormData('lastName')}
          placeholder="Enter your last name"
          autoComplete="family-name"
          error={errors.lastName}
          required
        />
      </div>

      <FormField
        type="email"
        label="Email Address"
        value={formData.email || ''}
        onChange={updateFormData('email')}
        placeholder="Enter your email address"
        required
        error={errors.email}
        autoComplete="email"
      />

      <FormField
        type="text"
        label="Company (Optional)"
        value={formData.company || ''}
        onChange={updateFormData('company')}
        placeholder="Enter your company name"
        autoComplete="organization"
      />

      <FormField
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Create a strong password"
        required
        error={errors.password}
        autoComplete="new-password"
      />

      {password && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  passwordStrength.score === 1 ? 'bg-red-500 w-1/4' :
                  passwordStrength.score === 2 ? 'bg-yellow-500 w-2/4' :
                  passwordStrength.score === 3 ? 'bg-yellow-400 w-3/4' :
                  passwordStrength.score === 4 ? 'bg-green-500 w-full' : 'w-0'
                }`}
              />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {passwordStrength.text}
            </span>
          </div>
        </div>
      )}

      <FormField
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Confirm your password"
        required
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 underline">
              Privacy Policy
            </a>
          </label>
          {errors.terms && (
            <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
          )}
        </div>
      </div>

      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/signin" className="text-blue-600 hover:text-blue-500 underline font-medium">
          Sign in
        </Link>
      </div>
    </StepForm>
  );
};

export default AccountCreation;