import { requireAuth } from '../middleware/auth';
import { isValidLegalName, sanitizeString } from '../utils/validation';
import type { SignatureData, APIResponse } from '../types';
import { KV_KEYS } from '../types';

export async function handleSign(
  request: Request,
  env: { ONBOARDING_KV: KVNamespace; JWT_SECRET: string }
): Promise<Response> {
  try {
    // Authenticate user
    const authResult = await requireAuth(request, env);
    if (!authResult.authenticated) {
      return authResult.response!;
    }

    const userId = authResult.userId!;
    const body = await request.json() as {
      legalName: string;
      agreedToTerms: boolean;
      termsScrolled: boolean;
    };

    // Validation
    if (!body.legalName || !isValidLegalName(body.legalName)) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_LEGAL_NAME',
          message: 'Valid legal name (first and last) is required'
        }
      } as APIResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!body.agreedToTerms) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'TERMS_NOT_AGREED',
          message: 'Must agree to terms of service'
        }
      } as APIResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!body.termsScrolled) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'TERMS_NOT_READ',
          message: 'Must read complete terms of service'
        }
      } as APIResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if already signed
    const existingSignature = await env.ONBOARDING_KV.get(KV_KEYS.USER_SIGNATURE(userId));
    if (existingSignature) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'ALREADY_SIGNED',
          message: 'Terms of service already signed for this user'
        }
      } as APIResponse), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get client information
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const userAgent = request.headers.get('User-Agent') || 'unknown';

    // Create signature record
    const signatureData: SignatureData = {
      legalName: sanitizeString(body.legalName),
      timestamp: new Date().toISOString(),
      termsScrolled: body.termsScrolled,
      agreedToTerms: body.agreedToTerms,
      ipAddress: clientIP,
      userAgent: userAgent
    };

    // Store signature with audit trail
    await env.ONBOARDING_KV.put(KV_KEYS.USER_SIGNATURE(userId), JSON.stringify(signatureData));

    return new Response(JSON.stringify({
      success: true,
      data: {
        signed: true,
        timestamp: signatureData.timestamp,
        legalName: signatureData.legalName
      }
    } as APIResponse), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in handleSign:', error);
    return new Response(JSON.stringify({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error'
      }
    } as APIResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}