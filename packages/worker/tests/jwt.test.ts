import { describe, it, expect } from 'vitest';
import { createJWT, verifyJWT, extractBearerToken } from '../src/utils/jwt';

describe('JWT Utils', () => {
  const secret = 'test-secret-key';
  const userId = 'test-user-123';

  describe('createJWT', () => {
    it('should create a valid JWT token', async () => {
      const token = await createJWT(userId, secret);
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });
  });

  describe('verifyJWT', () => {
    it('should verify a valid JWT token', async () => {
      const token = await createJWT(userId, secret);
      const payload = await verifyJWT(token, secret);
      
      expect(payload).toBeTruthy();
      expect(payload?.sub).toBe(userId);
      expect(payload?.iat).toBeTypeOf('number');
      expect(payload?.exp).toBeTypeOf('number');
    });

    it('should reject invalid JWT token', async () => {
      const invalidToken = 'invalid.token.here';
      const payload = await verifyJWT(invalidToken, secret);
      expect(payload).toBeNull();
    });

    it('should reject JWT with wrong secret', async () => {
      const token = await createJWT(userId, secret);
      const payload = await verifyJWT(token, 'wrong-secret');
      expect(payload).toBeNull();
    });
  });

  describe('extractBearerToken', () => {
    it('should extract token from Bearer header', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.token';
      const authHeader = `Bearer ${token}`;
      
      expect(extractBearerToken(authHeader)).toBe(token);
    });

    it('should return null for invalid headers', () => {
      expect(extractBearerToken(null)).toBeNull();
      expect(extractBearerToken('')).toBeNull();
      expect(extractBearerToken('InvalidHeader')).toBeNull();
      expect(extractBearerToken('Basic dGVzdA==')).toBeNull();
    });
  });
});