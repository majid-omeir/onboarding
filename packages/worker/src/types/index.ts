export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  createdAt: string;
}

export interface UserProfile {
  role?: string;
  companySize?: string;
  industry?: string;
  phone?: string;
  timezone?: string;
  referralSource?: string;
  useCase?: string;
}

export interface OnboardingStep {
  stepId: string;
  data: Record<string, any>;
  completedAt: string;
}

export interface SignatureData {
  legalName: string;
  timestamp: string;
  termsScrolled: boolean;
  agreedToTerms: boolean;
  ipAddress: string;
  userAgent: string;
}

export interface FeedbackData {
  rating: number;
  comment?: string;
  preferences: string[];
  timestamp: string;
}

export interface JWTPayload {
  sub: string; // user ID
  iat: number; // issued at
  exp: number; // expires
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface RateLimitData {
  count: number;
  resetTime: number;
}

// KV Schema Keys
export const KV_KEYS = {
  USER: (id: string) => `user:${id}`,
  USER_STEP: (id: string) => `user:${id}:step`,
  USER_PROFILE: (id: string) => `user:${id}:profile`, 
  USER_SIGNATURE: (id: string) => `user:${id}:signature`,
  USER_FEEDBACK: (id: string) => `user:${id}:feedback`,
  RATE_LIMIT: (ip: string) => `rate_limit:${ip}`,
  EMAIL_INDEX: (email: string) => `email:${email}:user_id`
} as const;