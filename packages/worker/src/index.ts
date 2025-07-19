import { checkRateLimit } from './middleware/rateLimit';
import { handleOnboardStart, handleOnboardStep } from './handlers/onboard';
import { handleSign } from './handlers/signature';
import { handleFeedback, handleFeedbackReminder } from './handlers/feedback';
import { handleSignIn, handleGetCurrentUser } from './handlers/auth';
import type { APIResponse } from './types';

export interface Env {
  ONBOARDING_KV: KVNamespace;
  JWT_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // Only handle API routes
    if (!url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Endpoint not found'
        }
      } as APIResponse), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });
    }

    // Rate limiting
    const rateLimitResult = await checkRateLimit(request, env.ONBOARDING_KV);
    if (!rateLimitResult.allowed) {
      const response = rateLimitResult.response!;
      // Add CORS headers to rate limit response
      Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      return response;
    }

    try {
      let response: Response;

      // Route to appropriate handler
      switch (url.pathname) {
        case '/api/onboard/start':
          if (request.method !== 'POST') {
            response = new Response(JSON.stringify({
              success: false,
              error: {
                code: 'METHOD_NOT_ALLOWED',
                message: 'Only POST method allowed'
              }
            } as APIResponse), {
              status: 405,
              headers: { 'Content-Type': 'application/json' }
            });
            break;
          }
          response = await handleOnboardStart(request, env);
          break;

        case '/api/onboard/step':
          if (request.method !== 'PUT') {
            response = new Response(JSON.stringify({
              success: false,
              error: {
                code: 'METHOD_NOT_ALLOWED',
                message: 'Only PUT method allowed'
              }
            } as APIResponse), {
              status: 405,
              headers: { 'Content-Type': 'application/json' }
            });
            break;
          }
          response = await handleOnboardStep(request, env);
          break;

        case '/api/sign':
          if (request.method !== 'POST') {
            response = new Response(JSON.stringify({
              success: false,
              error: {
                code: 'METHOD_NOT_ALLOWED',
                message: 'Only POST method allowed'
              }
            } as APIResponse), {
              status: 405,
              headers: { 'Content-Type': 'application/json' }
            });
            break;
          }
          response = await handleSign(request, env);
          break;

        case '/api/feedback':
          if (request.method !== 'POST') {
            response = new Response(JSON.stringify({
              success: false,
              error: {
                code: 'METHOD_NOT_ALLOWED',
                message: 'Only POST method allowed'
              }
            } as APIResponse), {
              status: 405,
              headers: { 'Content-Type': 'application/json' }
            });
            break;
          }
          response = await handleFeedback(request, env);
          break;

        case '/api/feedback/reminder':
          if (request.method !== 'POST') {
            response = new Response(JSON.stringify({
              success: false,
              error: {
                code: 'METHOD_NOT_ALLOWED',
                message: 'Only POST method allowed'
              }
            } as APIResponse), {
              status: 405,
              headers: { 'Content-Type': 'application/json' }
            });
            break;
          }
          response = await handleFeedbackReminder(request, env);
          break;

        case '/api/auth/signin':
          if (request.method !== 'POST') {
            response = new Response(JSON.stringify({
              success: false,
              error: {
                code: 'METHOD_NOT_ALLOWED',
                message: 'Only POST method allowed'
              }
            } as APIResponse), {
              status: 405,
              headers: { 'Content-Type': 'application/json' }
            });
            break;
          }
          response = await handleSignIn(request, env);
          break;

        case '/api/auth/me':
          if (request.method !== 'GET') {
            response = new Response(JSON.stringify({
              success: false,
              error: {
                code: 'METHOD_NOT_ALLOWED',
                message: 'Only GET method allowed'
              }
            } as APIResponse), {
              status: 405,
              headers: { 'Content-Type': 'application/json' }
            });
            break;
          }
          response = await handleGetCurrentUser(request, env);
          break;

        case '/api/health':
          response = new Response(JSON.stringify({
            success: true,
            data: {
              status: 'healthy',
              timestamp: new Date().toISOString(),
              version: '1.0.0'
            }
          } as APIResponse), {
            headers: { 'Content-Type': 'application/json' }
          });
          break;

        default:
          response = new Response(JSON.stringify({
            success: false,
            error: {
              code: 'NOT_FOUND',
              message: 'API endpoint not found'
            }
          } as APIResponse), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
      }

      // Add CORS headers to all responses
      Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;

    } catch (error) {
      console.error('Unhandled error in worker:', error);
      
      const errorResponse = new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Internal server error'
        }
      } as APIResponse), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });

      return errorResponse;
    }
  },
};