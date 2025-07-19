import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepForm from '../components/StepForm';
import type { SignatureData } from '../types';

const Signature: React.FC = () => {
  const navigate = useNavigate();
  const [legalName, setLegalName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsScrolled, setTermsScrolled] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const termsContent = `
    CLOUDFLAREFLOW SERVICE AGREEMENT

    Last Updated: January 18, 2025

    1. SERVICE DESCRIPTION
    CloudflareFlow provides edge computing, content delivery network (CDN), and security services to help improve the performance, security, and reliability of your website or application.

    2. USER RESPONSIBILITIES
    You agree to use our services in compliance with all applicable laws and regulations. You are responsible for:
    - Maintaining the security of your account credentials
    - Ensuring your content complies with our Acceptable Use Policy
    - Monitoring your service usage and associated costs
    - Promptly reporting any suspected security incidents

    3. DATA PROCESSING AND PRIVACY
    We process your data in accordance with our Privacy Policy. By using our services, you consent to:
    - Collection and processing of technical data for service delivery
    - Analytics data collection to improve our services
    - Compliance with applicable data protection regulations (GDPR, CCPA)

    4. SERVICE LEVEL AGREEMENT
    We strive to maintain 99.9% uptime for our core services. In the event of service interruptions:
    - We will provide timely status updates
    - Service credits may be available as outlined in our SLA
    - We commit to transparent communication about incidents

    5. LIMITATION OF LIABILITY
    Our liability is limited to the maximum extent permitted by law. We are not liable for:
    - Indirect, incidental, or consequential damages
    - Loss of profits, data, or business opportunities
    - Third-party content or services accessed through our platform

    6. TERMINATION
    Either party may terminate this agreement with 30 days written notice. Upon termination:
    - Your access to services will be discontinued
    - Data will be deleted in accordance with our retention policy
    - Outstanding fees remain payable

    7. GOVERNING LAW
    This agreement is governed by the laws of the State of California, United States.

    8. CONTACT INFORMATION
    For questions about this agreement, contact us at legal@cloudflareflow.com
  `;

  const handleTermsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const isScrolledToBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
    
    if (isScrolledToBottom && !termsScrolled) {
      setTermsScrolled(true);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!legalName.trim()) {
      newErrors.legalName = 'Legal name is required';
    } else if (legalName.trim().split(' ').length < 2) {
      newErrors.legalName = 'Please enter your full legal name (first and last name)';
    }
    
    if (!termsScrolled) {
      newErrors.terms = 'Please scroll through and read the complete Terms of Service';
    }
    
    if (!agreedToTerms) {
      newErrors.agreement = 'You must agree to the Terms of Service to continue';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValid = legalName.trim().split(' ').length >= 2 && termsScrolled && agreedToTerms;

  const handleNext = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const signatureData: SignatureData = {
        legalName: legalName.trim(),
        timestamp: new Date().toISOString(),
        termsScrolled,
        agreedToTerms,
        ipAddress: '127.0.0.1' // Would be actual IP in production
      };
      
      // Update saved data
      const existingData = localStorage.getItem('onboarding-data');
      const savedData = existingData ? JSON.parse(existingData) : {};
      
      localStorage.setItem('onboarding-data', JSON.stringify({
        ...savedData,
        step: 4,
        signatureData,
        completedAt: new Date().toISOString()
      }));
      
      navigate('/feedback');
    } catch (error) {
      console.error('Error saving signature:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    navigate('/tour');
  };

  return (
    <StepForm
      stepId="signature"
      title="Service Agreement"
      description="Please review and sign our Terms of Service"
      onNext={handleNext}
      onPrevious={handlePrevious}
      isValid={Boolean(isValid)}
      isSubmitting={isSubmitting}
    >
      {/* Terms of Service */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms of Service</h3>
        <div 
          className="bg-gray-50 border border-gray-300 rounded-lg p-6 h-80 overflow-y-auto text-sm leading-relaxed"
          onScroll={handleTermsScroll}
        >
          <pre className="whitespace-pre-wrap font-sans text-gray-700">
            {termsContent}
          </pre>
        </div>
        
        {!termsScrolled && (
          <p className="mt-2 text-sm text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Please scroll to the bottom to continue
          </p>
        )}
        
        {termsScrolled && (
          <p className="mt-2 text-sm text-success-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Terms of Service reviewed
          </p>
        )}
        
        {errors.terms && (
          <p className="mt-2 text-sm text-error-600">{errors.terms}</p>
        )}
      </div>

      {/* Additional Documents */}
      <div className="mb-8">
        <h4 className="text-base font-medium text-gray-900 mb-3">Additional Documents</h4>
        <div className="flex space-x-4">
          <a 
            href="#" 
            className="inline-flex items-center text-primary-600 hover:text-primary-500 text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="inline-flex items-center text-primary-600 hover:text-primary-500 text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Service Level Agreement
          </a>
        </div>
      </div>

      {/* Signature Section */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Digital Signature</h3>
        
        <div className="mb-6">
          <label htmlFor="legal-name" className="block text-sm font-medium text-gray-700 mb-2">
            Legal Signature *
          </label>
          <input
            type="text"
            id="legal-name"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            placeholder="Type your full legal name"
            className={`
              block w-full px-3 py-3 text-base border rounded-component
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
              transition-colors duration-200
              ${errors.legalName 
                ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
                : 'border-gray-300 focus:border-primary-500'
              }
            `}
            autoComplete="name"
          />
          {errors.legalName && (
            <p className="mt-2 text-sm text-error-600">{errors.legalName}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Type your full legal name as it appears on official documents
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreement"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="agreement" className="text-sm text-gray-700">
                I have read and agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>. 
                I understand that this constitutes a legally binding electronic signature.
              </label>
              {errors.agreement && (
                <p className="mt-1 text-sm text-error-600">{errors.agreement}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="font-medium text-gray-700 mb-1">🔒 Legally Binding Signature</p>
              <p>
                By typing your name and checking the agreement box, you are creating a legally binding electronic signature. 
                This signature will be recorded with a timestamp and IP address for security purposes.
              </p>
              <p className="mt-2">
                <strong>Date:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </StepForm>
  );
};

export default Signature;