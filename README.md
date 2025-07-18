# Cloudflare Onboarding & Feedback System

A seamless, edge-native onboarding flow built on Cloudflare's infrastructure.

## Architecture

- **Frontend**: React 18 + Vite + Tailwind CSS (Cloudflare Pages)
- **Backend**: TypeScript Workers with KV storage
- **Auth**: JWT-based authentication
- **Analytics**: Cloudflare Analytics + Logpush

## Development

### Prerequisites

- Node.js 20 LTS
- npm v10+
- wrangler CLI (`npm i -g wrangler`)

### Local Development

```bash
# Install dependencies
npm install

# Frontend development
cd packages/pages
npm run dev

# Worker development  
cd packages/worker
wrangler dev --persist
```

### Project Structure

```
/
├─ packages/
│   ├─ pages/      # React frontend
│   └─ worker/     # TypeScript Worker
├─ CLAUDE.md       # Development guide
├─ PLANNING.md     # Project planning
└─ TASKS.md        # Task breakdown
```

## Deployment

```bash
# Deploy frontend
cd packages/pages
npm run build
wrangler pages deploy dist

# Deploy worker
cd packages/worker  
wrangler deploy
```

## Success Metrics

- ≥85% onboarding completion rate
- ≤5 minute average duration
- ≥40% feedback response rate
- ≥99.9% service availability