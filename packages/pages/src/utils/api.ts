const API_BASE_URL = 'https://onboarding-worker.momeir.workers.dev';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
}

export interface OnboardingStep {
  stepId: string;
  data: any;
}

export interface Signature {
  name: string;
  timestamp: string;
}

export interface Feedback {
  score: number;
  comment?: string;
  preferences?: string[];
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth-token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth-token');
    }
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/api/health');
  }

  // Start onboarding and get JWT
  async startOnboarding(userData: Omit<User, 'id'> & { password: string; agreedToTerms: boolean }): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.request<{ token: string; user: User }>('/api/onboard/start', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  // Save step data
  async saveStep(stepData: OnboardingStep): Promise<ApiResponse> {
    return this.request('/api/onboard/step', {
      method: 'PUT',
      body: JSON.stringify(stepData),
    });
  }

  // Save signature
  async saveSignature(signature: Signature): Promise<ApiResponse> {
    return this.request('/api/sign', {
      method: 'POST',
      body: JSON.stringify(signature),
    });
  }

  // Save feedback
  async saveFeedback(feedback: Feedback): Promise<ApiResponse> {
    return this.request('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }

  // Sign in existing user
  async signIn(credentials: { email: string; password: string }): Promise<ApiResponse<{ token: string; user: User & { completedSteps?: string[] } }>> {
    const response = await this.request<{ token: string; user: User & { completedSteps?: string[] } }>('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  // Get current user data
  async getCurrentUser(): Promise<ApiResponse<User & { completedSteps?: string[] }>> {
    return this.request('/api/auth/me');
  }

  // Logout (clear token)
  logout() {
    this.token = null;
    localStorage.removeItem('auth-token');
  }
}

export const apiService = new ApiService(); 