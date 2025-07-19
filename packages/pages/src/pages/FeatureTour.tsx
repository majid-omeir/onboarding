import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: React.ReactNode;
}

const FeatureTour: React.FC = () => {
  const navigate = useNavigate();
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: 'dashboard',
      title: 'Dashboard Overview',
      description: 'Your central hub for monitoring and managing services',
      icon: '📊',
      content: (
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Monitor your website performance, security threats, and traffic patterns in real-time
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl text-primary-500 font-bold">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl text-success-500 font-bold">2.3s</div>
              <div className="text-sm text-gray-600">Load Time</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl text-warning-500 font-bold">12</div>
              <div className="text-sm text-gray-600">Threats Blocked</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security Monitoring',
      description: 'Advanced protection against threats and attacks',
      icon: '🛡️',
      content: (
        <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Security</h3>
          <p className="text-gray-600 mb-4">
            Advanced DDoS protection, WAF rules, and threat intelligence
          </p>
          <div className="space-y-3 mt-6">
            <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
              <div className="w-3 h-3 bg-success-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium">DDoS Protection Active</span>
            </div>
            <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
              <div className="w-3 h-3 bg-success-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium">WAF Rules Configured</span>
            </div>
            <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
              <div className="w-3 h-3 bg-success-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium">Bot Management Enabled</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'performance',
      title: 'Performance Optimization',
      description: 'Global CDN and caching for lightning-fast delivery',
      icon: '⚡',
      content: (
        <div className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Performance</h3>
          <p className="text-gray-600 mb-4">
            Deliver content from 250+ data centers worldwide for optimal speed
          </p>
          <div className="relative bg-white rounded-lg p-6 shadow-sm mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">Global Coverage</span>
              <span className="text-sm font-bold text-primary-600">250+ Cities</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-primary-500 to-warning-500 h-2 rounded-full w-full"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Americas</span>
              <span>Europe</span>
              <span>Asia-Pacific</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'integrations',
      title: 'Easy Integrations',
      description: 'Connect with your existing tools and workflows',
      icon: '🔗',
      content: (
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless Integration</h3>
          <p className="text-gray-600 mb-4">
            Connect with popular tools and platforms in just a few clicks
          </p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {['GitHub', 'Slack', 'Jira', 'Discord', 'Webhook', 'API'].map((tool) => (
              <div key={tool} className="bg-white rounded-lg p-3 shadow-sm flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
                <span className="text-sm font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'support',
      title: 'Support & Resources',
      description: '24/7 support and comprehensive documentation',
      icon: '🎯',
      content: (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
          <p className="text-gray-600 mb-4">
            Get help when you need it with our comprehensive support options
          </p>
          <div className="space-y-3 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="font-medium text-gray-900">📚 Documentation</div>
              <div className="text-sm text-gray-600">Comprehensive guides and tutorials</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="font-medium text-gray-900">💬 24/7 Chat Support</div>
              <div className="text-sm text-gray-600">Real-time assistance from our experts</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="font-medium text-gray-900">🎓 Learning Center</div>
              <div className="text-sm text-gray-600">Video tutorials and best practices</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentTourStep < tourSteps.length - 1) {
      setCurrentTourStep(currentTourStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentTourStep > 0) {
      setCurrentTourStep(currentTourStep - 1);
    } else {
      navigate('/profile');
    }
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update saved data
      const existingData = localStorage.getItem('onboarding-data');
      const savedData = existingData ? JSON.parse(existingData) : {};
      
      localStorage.setItem('onboarding-data', JSON.stringify({
        ...savedData,
        step: 3,
        tourSkipped: true,
        completedAt: new Date().toISOString()
      }));
      
      navigate('/signature');
    } catch (error) {
      console.error('Error skipping tour:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update saved data
      const existingData = localStorage.getItem('onboarding-data');
      const savedData = existingData ? JSON.parse(existingData) : {};
      
      localStorage.setItem('onboarding-data', JSON.stringify({
        ...savedData,
        step: 3,
        tourCompleted: true,
        completedAt: new Date().toISOString()
      }));
      
      navigate('/signature');
    } catch (error) {
      console.error('Error completing tour:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStep = tourSteps[currentTourStep];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-h1 text-gray-900 mb-4">
          🚀 Welcome! Let's show you around
        </h1>
        <p className="text-body-lg text-gray-600">
          Discover the key features that will help you succeed
        </p>
      </div>

      {/* Tour Content */}
      <div className="bg-white rounded-card shadow-card p-8 mb-8">
        {currentStep.content}
        
        {/* Tour Progress */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTourStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTourStep ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Step {currentTourStep + 1} of {tourSteps.length}
          </p>
        </div>

        {/* Feature List */}
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Key features you'll discover:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Real-time analytics
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Security monitoring
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Performance optimization
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Easy integrations
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-component text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {currentTourStep === 0 ? 'Previous' : 'Previous Feature'}
        </button>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-gray-700 underline text-sm font-medium"
          >
            Skip Tour
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-component text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-button hover:shadow-lg transform hover:scale-105 transition-all"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : currentTourStep === tourSteps.length - 1 ? (
              <>
                Complete Tour
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            ) : (
              <>
                Next Feature
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureTour;