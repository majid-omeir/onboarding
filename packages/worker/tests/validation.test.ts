import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidLegalName,
  sanitizeString,
  validateOnboardingStepData
} from '../src/utils/validation';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(isValidEmail('user@sub.domain.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should validate passwords with 8+ characters', () => {
      expect(isValidPassword('password123')).toBe(true);
      expect(isValidPassword('12345678')).toBe(true);
    });

    it('should reject passwords with less than 8 characters', () => {
      expect(isValidPassword('1234567')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });
  });

  describe('isValidLegalName', () => {
    it('should validate legal names with first and last name', () => {
      expect(isValidLegalName('John Doe')).toBe(true);
      expect(isValidLegalName('Mary Jane Smith')).toBe(true);
      expect(isValidLegalName('  John   Doe  ')).toBe(true);
    });

    it('should reject invalid legal names', () => {
      expect(isValidLegalName('John')).toBe(false);
      expect(isValidLegalName('')).toBe(false);
      expect(isValidLegalName('   ')).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('should remove dangerous characters', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('scriptalert(xss)/script');
      expect(sanitizeString('Hello & World')).toBe('Hello  World');
      expect(sanitizeString('  trimmed  ')).toBe('trimmed');
    });
  });

  describe('validateOnboardingStepData', () => {
    it('should validate account step data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        agreedToTerms: true
      };
      
      const result = validateOnboardingStepData('account', validData);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid account step data', () => {
      const invalidData = {
        email: 'invalid-email',
        password: '123',
        agreedToTerms: false
      };
      
      const result = validateOnboardingStepData('account', invalidData);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(3);
    });

    it('should validate profile step data', () => {
      const validData = {
        role: 'developer',
        companySize: '1-10',
        industry: 'technology'
      };
      
      const result = validateOnboardingStepData('profile', validData);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});