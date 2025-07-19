export interface User {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  companySize?: string;
  industry?: string;
  phone?: string;
  timezone?: string;
  referralSource?: string;
  useCase?: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  data?: Record<string, any>;
}

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  clickable?: boolean;
  className?: string;
}

export interface StepFormProps {
  stepId: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious?: () => void;
  isValid: boolean;
  isSubmitting?: boolean;
  autoSave?: boolean;
}

export interface FormFieldProps {
  type: 'text' | 'email' | 'password' | 'tel' | 'select' | 'textarea';
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  help?: string;
  disabled?: boolean;
  autoComplete?: string;
  options?: SelectOption[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FeedbackData {
  rating: number;
  comment?: string;
  preferences: string[];
  timestamp: string;
}

export interface SignatureData {
  legalName: string;
  timestamp: string;
  termsScrolled: boolean;
  agreedToTerms: boolean;
  ipAddress: string;
}