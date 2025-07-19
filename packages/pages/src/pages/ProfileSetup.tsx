import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepForm from '../components/StepForm';
import FormField from '../components/FormField';
import type { User, SelectOption } from '../types';

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<User>>({
    role: '',
    companySize: '',
    industry: '',
    phone: '',
    timezone: '',
    referralSource: '',
    useCase: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Auto-detect timezone
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setFormData(prev => ({ ...prev, timezone: detectedTimezone }));
  }, []);

  const roleOptions: SelectOption[] = [
    { value: 'developer', label: 'Developer' },
    { value: 'devops', label: 'DevOps Engineer' },
    { value: 'sysadmin', label: 'System Administrator' },
    { value: 'architect', label: 'Solutions Architect' },
    { value: 'manager', label: 'Engineering Manager' },
    { value: 'cto', label: 'CTO' },
    { value: 'founder', label: 'Founder' },
    { value: 'other', label: 'Other' }
  ];

  const companySizeOptions: SelectOption[] = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const industryOptions: SelectOption[] = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'education', label: 'Education' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'saas', label: 'SaaS' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'other', label: 'Other' }
  ];

  const referralOptions: SelectOption[] = [
    { value: 'search', label: 'Search Engine' },
    { value: 'social', label: 'Social Media' },
    { value: 'blog', label: 'Blog/Article' },
    { value: 'colleague', label: 'Colleague/Friend' },
    { value: 'conference', label: 'Conference/Event' },
    { value: 'advertising', label: 'Online Advertising' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    if (!formData.companySize) {
      newErrors.companySize = 'Please select your company size';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Please select your industry';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValid = formData.role && formData.companySize && formData.industry;

  const handleNext = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update saved data
      const existingData = localStorage.getItem('onboarding-data');
      const savedData = existingData ? JSON.parse(existingData) : {};
      
      localStorage.setItem('onboarding-data', JSON.stringify({
        ...savedData,
        step: 2,
        profileData: formData,
        completedAt: new Date().toISOString()
      }));
      
      navigate('/tour');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    navigate('/account');
  };

  const updateFormData = (field: keyof User) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <StepForm
      stepId="profile"
      title="Tell us about yourself"
      description="Help us personalize your experience"
      onNext={handleNext}
      onPrevious={handlePrevious}
      isValid={Boolean(isValid)}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          type="select"
          label="Role/Position"
          value={formData.role || ''}
          onChange={updateFormData('role')}
          placeholder="Select your role"
          required
          error={errors.role}
          options={roleOptions}
        />
        
        <FormField
          type="select"
          label="Company Size"
          value={formData.companySize || ''}
          onChange={updateFormData('companySize')}
          placeholder="Select company size"
          required
          error={errors.companySize}
          options={companySizeOptions}
        />
      </div>

      <FormField
        type="select"
        label="Industry"
        value={formData.industry || ''}
        onChange={updateFormData('industry')}
        placeholder="Select your industry"
        required
        error={errors.industry}
        options={industryOptions}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          type="tel"
          label="Phone Number (Optional)"
          value={formData.phone || ''}
          onChange={updateFormData('phone')}
          placeholder="Enter your phone number"
          autoComplete="tel"
        />
        
        <div className="relative">
          <FormField
            type="text"
            label="Time Zone"
            value={formData.timezone || ''}
            onChange={updateFormData('timezone')}
            placeholder="Auto-detected"
            help="Automatically detected from your browser"
          />
          <div className="absolute right-3 top-9 text-primary-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <FormField
        type="select"
        label="How did you hear about us?"
        value={formData.referralSource || ''}
        onChange={updateFormData('referralSource')}
        placeholder="Select an option"
        options={referralOptions}
      />

      <FormField
        type="textarea"
        label="Use Case (Optional)"
        value={formData.useCase || ''}
        onChange={updateFormData('useCase')}
        placeholder="Tell us briefly about your primary use case or what you're looking to achieve..."
        help="This helps us provide more relevant recommendations"
      />
    </StepForm>
  );
};

export default ProfileSetup;