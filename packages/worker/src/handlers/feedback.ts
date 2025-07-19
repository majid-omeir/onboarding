import { requireAuth } from '../middleware/auth';
import { sanitizeString } from '../utils/validation';
import type { FeedbackData, APIResponse } from '../types';
import { KV_KEYS } from '../types';

export async function handleFeedback(
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
      rating: number;
      comment?: string;
      preferences: string[];
    };

    // Validation
    if (!body.rating || body.rating < 1 || body.rating > 5 || !Number.isInteger(body.rating)) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_RATING',
          message: 'Rating must be an integer between 1 and 5'
        }
      } as APIResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate preferences array
    if (!Array.isArray(body.preferences)) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_PREFERENCES',
          message: 'Preferences must be an array'
        }
      } as APIResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const validPreferences = ['easy-setup', 'performance', 'security', 'support', 'integration', 'pricing'];
    const invalidPreferences = body.preferences.filter(pref => !validPreferences.includes(pref));
    
    if (invalidPreferences.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'INVALID_PREFERENCES',
          message: `Invalid preferences: ${invalidPreferences.join(', ')}`,
          details: { validPreferences }
        }
      } as APIResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if feedback already submitted
    const existingFeedback = await env.ONBOARDING_KV.get(KV_KEYS.USER_FEEDBACK(userId));
    if (existingFeedback) {
      return new Response(JSON.stringify({
        success: false,
        error: {
          code: 'FEEDBACK_EXISTS',
          message: 'Feedback already submitted for this user'
        }
      } as APIResponse), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create feedback record
    const feedbackData: FeedbackData = {
      rating: body.rating,
      comment: body.comment ? sanitizeString(body.comment).substring(0, 250) : undefined,
      preferences: body.preferences,
      timestamp: new Date().toISOString()
    };

    // Store feedback
    await env.ONBOARDING_KV.put(KV_KEYS.USER_FEEDBACK(userId), JSON.stringify(feedbackData));

    // Mark onboarding as complete
    await env.ONBOARDING_KV.put(`user:${userId}:onboarding_complete`, new Date().toISOString());

    return new Response(JSON.stringify({
      success: true,
      data: {
        submitted: true,
        timestamp: feedbackData.timestamp,
        rating: feedbackData.rating,
        onboardingComplete: true
      }
    } as APIResponse), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in handleFeedback:', error);
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

export async function handleFeedbackReminder(
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

    // Set reminder flag
    await env.ONBOARDING_KV.put(`user:${userId}:feedback_reminder`, new Date().toISOString());
    
    // Mark onboarding as complete (even without feedback)
    await env.ONBOARDING_KV.put(`user:${userId}:onboarding_complete`, new Date().toISOString());

    return new Response(JSON.stringify({
      success: true,
      data: {
        reminderSet: true,
        onboardingComplete: true
      }
    } as APIResponse), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in handleFeedbackReminder:', error);
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