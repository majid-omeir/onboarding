import { SignJWT, jwtVerify } from 'jose';
import type { JWTPayload as CustomJWTPayload } from '../types';

const JWT_ALGORITHM = 'HS256';
const JWT_EXPIRY = '7d'; // 7 days

// Convert string secret to Uint8Array
function getSecretKey(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

export async function createJWT(userId: string, secret: string): Promise<string> {
  const jwt = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(getSecretKey(secret));

  return jwt;
}

export async function verifyJWT(token: string, secret: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(secret));
    
    return {
      sub: payload.sub as string,
      iat: payload.iat as number,
      exp: payload.exp as number
    };
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}