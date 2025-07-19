import { createJWT } from '../utils/jwt';
import { verifyPassword } from '../utils/crypto';
import { isValidEmail, sanitizeString } from '../utils/validation';
import { requireAuth } from '../middleware/auth';
import type { User, APIResponse } from '../types';
import { KV_KEYS } from '../types';

export async function handleSignIn(
  request: Request,
  env: { ONBOARDING_KV: KVNamespace; JWT_SECRET: string }
): Promise<Response> {
  try {
    const body = await request.json() as {
      email: string;
      password: string;
    };

    console.log('Sign-in attempt for email:', body.email);

    // Validation
    if (!body.email || !isValidEmail(body.email)) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_EMAIL',
          message: 'Valid email address is required'
        }
      } as APIResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!body.password) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_PASSWORD',
          message: 'Password is required'
        }
      } as APIResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Find user by email
    const emailKey = KV_KEYS.EMAIL_INDEX(body.email.toLowerCase());
    console.log('Looking up email key:', emailKey);
    const userId = await env.ONBOARDING_KV.get(emailKey);
    
    if (!userId) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      } as APIResponse), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Found user ID:', userId);

    // Get stored password hash
    const storedPasswordHash = await env.ONBOARDING_KV.get(`user:${userId}:password`);
    if (!storedPasswordHash) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      } as APIResponse), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify password
    const passwordValid = await verifyPassword(body.password, storedPasswordHash);
    if (!passwordValid) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      } as APIResponse), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Password verified successfully');

    // Get user data
    const userDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER(userId));
    if (!userDataStr) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User data not found'
        }
      } as APIResponse), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user: User = JSON.parse(userDataStr);

    // Get user's completed steps
    const completedSteps: string[] = [];
    
    // Check for saved onboarding steps
    const stepDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER_STEP(userId));
    if (stepDataStr) {
      const stepData = JSON.parse(stepDataStr);
      completedSteps.push('account'); // Account creation is always completed for existing users
      if (stepData.stepId) {
        completedSteps.push(stepData.stepId);
      }
    } else {
      completedSteps.push('account'); // Account creation is always completed
    }

    // Check for profile completion
    const profileDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER_PROFILE(userId));
    if (profileDataStr) {
      completedSteps.push('profile');
    }

    // Check for signature completion
    const signatureDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER_SIGNATURE(userId));
    if (signatureDataStr) {
      completedSteps.push('signature');
    }

    // Check for feedback completion
    const feedbackDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER_FEEDBACK(userId));
    if (feedbackDataStr) {
      completedSteps.push('feedback');
    }

    // Generate JWT
    const token = await createJWT(userId, env.JWT_SECRET);
    console.log('JWT created successfully for sign-in');

    return new Response(JSON.stringify({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          company: user.company,
          completedSteps: [...new Set(completedSteps)] // Remove duplicates
        },
        token
      }
    } as APIResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in handleSignIn:', error);
    return new Response(JSON.stringify({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    } as APIResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleGetCurrentUser(
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

    // Get user data
    const userDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER(userId));
    if (!userDataStr) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User data not found'
        }
      } as APIResponse), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user: User = JSON.parse(userDataStr);

    // Get user's completed steps (same logic as sign-in)
    const completedSteps: string[] = ['account']; // Account creation is always completed

    const stepDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER_STEP(userId));
    if (stepDataStr) {
      const stepData = JSON.parse(stepDataStr);
      if (stepData.stepId && !completedSteps.includes(stepData.stepId)) {
        completedSteps.push(stepData.stepId);
      }
    }

    const profileDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER_PROFILE(userId));
    if (profileDataStr && !completedSteps.includes('profile')) {
      completedSteps.push('profile');
    }

    const signatureDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER_SIGNATURE(userId));
    if (signatureDataStr && !completedSteps.includes('signature')) {
      completedSteps.push('signature');
    }

    const feedbackDataStr = await env.ONBOARDING_KV.get(KV_KEYS.USER_FEEDBACK(userId));
    if (feedbackDataStr && !completedSteps.includes('feedback')) {
      completedSteps.push('feedback');
    }

    return new Response(JSON.stringify({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        completedSteps: [...new Set(completedSteps)]
      }
    } as APIResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in handleGetCurrentUser:', error);
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