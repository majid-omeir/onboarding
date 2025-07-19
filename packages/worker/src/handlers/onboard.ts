import { nanoid } from 'nanoid';
import { createJWT } from '../utils/jwt';
import { hashPassword } from '../utils/crypto';
import { isValidEmail, isValidPassword, sanitizeString, validateOnboardingStepData } from '../utils/validation';
import { requireAuth } from '../middleware/auth';
import type { User, UserProfile, OnboardingStep, APIResponse } from '../types';
import { KV_KEYS } from '../types';

export async function handleOnboardStart(
  request: Request,
  env: { ONBOARDING_KV: KVNamespace; JWT_SECRET: string }
): Promise<Response> {
  try {
    const body = await request.json() as {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
      company?: string;
      agreedToTerms: boolean;
    };

    console.log('Received request body:', JSON.stringify(body, null, 2));

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

    if (!body.password || !isValidPassword(body.password)) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_PASSWORD',
          message: 'Password must be at least 8 characters'
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

    // Check if email already exists
    const emailKey = KV_KEYS.EMAIL_INDEX(body.email.toLowerCase());
    console.log('Checking email key:', emailKey);
    const existingUserId = await env.ONBOARDING_KV.get(emailKey);
    
    if (existingUserId) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'EMAIL_EXISTS',
          message: 'An account with this email already exists'
        }
      } as APIResponse), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create user
    const userId = nanoid();
    console.log('Generated user ID:', userId);
    
    const passwordHash = await hashPassword(body.password);
    console.log('Password hashed successfully');
    
    const user: User = {
      id: userId,
      email: body.email.toLowerCase(),
      firstName: sanitizeString(body.firstName || ''),
      lastName: sanitizeString(body.lastName || ''),
      company: sanitizeString(body.company || ''),
      createdAt: new Date().toISOString()
    };

    console.log('User object created:', JSON.stringify(user, null, 2));

    // Store user data (without password)
    await env.ONBOARDING_KV.put(KV_KEYS.USER(userId), JSON.stringify(user));
    console.log('User data stored in KV');
    
    // Store password hash separately
    await env.ONBOARDING_KV.put(`user:${userId}:password`, passwordHash);
    console.log('Password hash stored in KV');
    
    // Create email index
    await env.ONBOARDING_KV.put(emailKey, userId);
    console.log('Email index stored in KV');

    // Generate JWT
    const token = await createJWT(userId, env.JWT_SECRET);
    console.log('JWT created successfully');

    return new Response(JSON.stringify({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          company: user.company
        },
        token
      }
    } as APIResponse), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in handleOnboardStart:', error);
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

export async function handleOnboardStep(
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
      stepId: string;
      data: Record<string, any>;
    };

    // Validate step data
    const validation = validateOnboardingStepData(body.stepId, body.data);
    if (!validation.valid) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid step data',
          details: validation.errors
        }
      } as APIResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Store step data
    const stepData: OnboardingStep = {
      stepId: body.stepId,
      data: body.data,
      completedAt: new Date().toISOString()
    };

    if (body.stepId === 'profile') {
      // Store profile data separately for easier querying
      const profileData: UserProfile = {
        role: body.data.role,
        companySize: body.data.companySize,
        industry: body.data.industry,
        phone: body.data.phone,
        timezone: body.data.timezone,
        referralSource: body.data.referralSource,
        useCase: body.data.useCase
      };
      await env.ONBOARDING_KV.put(KV_KEYS.USER_PROFILE(userId), JSON.stringify(profileData));
    }

    // Store step data
    await env.ONBOARDING_KV.put(KV_KEYS.USER_STEP(userId), JSON.stringify(stepData));

    return new Response(JSON.stringify({
      success: true,
      data: {
        stepId: body.stepId,
        saved: true,
        timestamp: stepData.completedAt
      }
    } as APIResponse), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in handleOnboardStep:', error);
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