import React, { useEffect, useState } from 'react';

const Welcome: React.FC = () => {
  const [onboardingData, setOnboardingData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('onboarding-data');
    if (savedData) {
      setOnboardingData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-success-500 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Welcome to CloudflareFlow!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your onboarding is complete. You're all set to get started!
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-1">Performance</h3>
            <p className="text-sm text-gray-600">
              Your site is now protected by our global CDN
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Security</h3>
            <p className="text-sm text-gray-600">
              Advanced DDoS protection and WAF rules active
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-1">Analytics</h3>
            <p className="text-sm text-gray-600">
              Real-time insights and monitoring enabled
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What's Next?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Explore Your Dashboard</h3>
                <p className="text-sm text-gray-600">
                  Get familiar with your new control panel and monitoring tools
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Configure DNS</h3>
                <p className="text-sm text-gray-600">
                  Point your domain to CloudflareFlow nameservers
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Set Up Integrations</h3>
                <p className="text-sm text-gray-600">
                  Connect with your favorite tools and workflows
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary-600 font-semibold">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Optimize Settings</h3>
                <p className="text-sm text-gray-600">
                  Fine-tune performance and security configurations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            Go to Dashboard
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            View Documentation
          </button>
        </div>

        {/* Onboarding Summary (Debug Info) */}
        {onboardingData && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Onboarding Summary</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>✅ Account Created: {onboardingData.userData?.email}</p>
              <p>✅ Profile Completed: {onboardingData.profileData?.role} at {onboardingData.profileData?.company}</p>
              <p>✅ Tour: {onboardingData.tourCompleted ? 'Completed' : onboardingData.tourSkipped ? 'Skipped' : 'N/A'}</p>
              <p>✅ Agreement Signed: {onboardingData.signatureData?.legalName}</p>
              <p>✅ Feedback: {onboardingData.feedbackData ? `${onboardingData.feedbackData.rating}/5 stars` : onboardingData.feedbackSkipped ? 'Skipped' : 'Reminder set'}</p>
              <p>Completed: {new Date(onboardingData.completedAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;