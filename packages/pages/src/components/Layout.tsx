import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Map routes to step numbers
  const getStepFromPath = (pathname: string): number => {
    const stepMap: Record<string, number> = {
      '/': 1,
      '/account': 1,
      '/profile': 2,
      '/tour': 3,
      '/signature': 4,
      '/feedback': 5
    };
    return stepMap[pathname] || 1;
  };

  const currentStep = getStepFromPath(location.pathname);
  const completedSteps = Array.from({ length: currentStep - 1 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">
                  🌐 CloudflareFlow
                </h1>
              </div>
            </div>

            {/* Help Button */}
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={5}
            completedSteps={completedSteps}
            clickable={true}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              © 2025 CloudflareFlow. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms of Service</a>
              <a href="#" className="hover:text-gray-900">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;