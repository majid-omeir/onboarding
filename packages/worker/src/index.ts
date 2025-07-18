export interface Env {
  ONBOARDING_KV: KVNamespace;
  USER_SESSION: DurableObjectNamespace;
  JWT_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, env, ctx);
    }
    
    return new Response('Not Found', { status: 404 });
  },
};

async function handleAPI(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    switch (pathname) {
      case '/api/onboard/start':
        if (request.method === 'POST') {
          return await handleOnboardStart(request, env);
        }
        break;
      case '/api/onboard/step':
        if (request.method === 'PUT') {
          return await handleOnboardStep(request, env);
        }
        break;
      case '/api/sign':
        if (request.method === 'POST') {
          return await handleSign(request, env);
        }
        break;
      case '/api/feedback':
        if (request.method === 'POST') {
          return await handleFeedback(request, env);
        }
        break;
    }
    
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  } catch (error) {
    console.error('API Error:', error);
    return new Response('Internal Server Error', { status: 500, headers: corsHeaders });
  }
}

async function handleOnboardStart(request: Request, env: Env): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Onboard start endpoint - TODO' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleOnboardStep(request: Request, env: Env): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Onboard step endpoint - TODO' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleSign(request: Request, env: Env): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Sign endpoint - TODO' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleFeedback(request: Request, env: Env): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Feedback endpoint - TODO' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}