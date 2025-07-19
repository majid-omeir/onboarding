import { verifyJWT, extractBearerToken } from '../utils/jwt';
import type { APIResponse } from '../types';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export async function requireAuth(request: Request, env: { JWT_SECRET: string }): Promise<{ authenticated: boolean; userId?: string; response?: Response }> {
  const authHeader = request.headers.get('Authorization');
  const token = extractBearerToken(authHeader);

  if (!token) {
    return {
      authenticated: false,
      response: new Response(JSON.stringify({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authorization token required'
        }
      } as APIResponse), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    };
  }

  const payload = await verifyJWT(token, env.JWT_SECRET);
  if (!payload) {
    return {
      authenticated: false,
      response: new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token'
        }
      } as APIResponse), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    };
  }

  return {
    authenticated: true,
    userId: payload.sub
  };
}