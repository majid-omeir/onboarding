export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

export function isValidLegalName(legalName: string): boolean {
  const trimmed = legalName.trim();
  const parts = trimmed.split(/\s+/);
  return parts.length >= 2 && parts.every(part => part.length >= 1);
}

export function sanitizeString(str: string): string {
  return str.trim().replace(/[<>\"'&]/g, '');
}

export function validateOnboardingStepData(stepId: string, data: Record<string, any>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  switch (stepId) {
    case 'account':
      if (!data.email || !isValidEmail(data.email)) {
        errors.push('Valid email is required');
      }
      if (!data.password || !isValidPassword(data.password)) {
        errors.push('Password must be at least 8 characters');
      }
      if (!data.agreedToTerms) {
        errors.push('Must agree to terms of service');
      }
      break;

    case 'profile':
      if (!data.role) {
        errors.push('Role is required');
      }
      if (!data.companySize) {
        errors.push('Company size is required');
      }
      if (!data.industry) {
        errors.push('Industry is required');
      }
      break;

    case 'signature':
      if (!data.legalName || !isValidLegalName(data.legalName)) {
        errors.push('Valid legal name (first and last) is required');
      }
      if (!data.agreedToTerms) {
        errors.push('Must agree to terms of service');
      }
      if (!data.termsScrolled) {
        errors.push('Must read complete terms of service');
      }
      break;

    case 'feedback':
      if (!data.rating || data.rating < 1 || data.rating > 5) {
        errors.push('Rating must be between 1 and 5');
      }
      break;
  }

  return {
    valid: errors.length === 0,
    errors
  };
}