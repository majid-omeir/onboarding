import type { APIResponse, RateLimitData } from '../types';
import { KV_KEYS } from '../types';

const RATE_LIMITS = {
  '/api/onboard/start': { requests: 5, window: 300 }, // 5 requests per 5 minutes
  '/api/onboard/step': { requests: 30, window: 60 }, // 30 requests per minute
  '/api/sign': { requests: 3, window: 600 }, // 3 requests per 10 minutes
  '/api/feedback': { requests: 5, window: 300 }, // 5 requests per 5 minutes
  default: { requests: 100, window: 60 } // 100 requests per minute for other endpoints
} as const;

export async function checkRateLimit(
  request: Request, 
  kv: KVNamespace
): Promise<{ allowed: boolean; response?: Response }> {
  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
  const url = new URL(request.url);
  const endpoint = url.pathname;
  
  // Get rate limit config for this endpoint
  const config = (RATE_LIMITS as any)[endpoint] || RATE_LIMITS.default;
  const key = KV_KEYS.RATE_LIMIT(clientIP + ':' + endpoint);
  
  // Get current rate limit data
  const rateLimitJson = await kv.get(key);
  const now = Math.floor(Date.now() / 1000);
  
  let rateLimitData: RateLimitData;
  
  if (!rateLimitJson) {
    // First request from this IP for this endpoint
    rateLimitData = {
      count: 1,
      resetTime: now + config.window
    };
  } else {
    rateLimitData = JSON.parse(rateLimitJson);
    
    // Check if window has expired
    if (now >= rateLimitData.resetTime) {
      // Reset the window
      rateLimitData = {
        count: 1,
        resetTime: now + config.window
      };
    } else {
      // Increment count
      rateLimitData.count++;
    }
  }
  
  // Check if rate limit exceeded
  if (rateLimitData.count > config.requests) {
    const retryAfter = rateLimitData.resetTime - now;
    
    return {
      allowed: false,
      response: new Response(JSON.stringify({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
          details: {
            limit: config.requests,
            window: config.window,
            retryAfter
          }
        }
      } as APIResponse), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': config.requests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitData.resetTime.toString()
        }
      })
    };
  }
  
  // Update rate limit data in KV
  await kv.put(key, JSON.stringify(rateLimitData), {
    expirationTtl: config.window + 60 // Add buffer to TTL
  });
  
  return { allowed: true };
}