

Milestone: Week 0 – PRD Sign‑Off

* ✅ Review the PRD with stakeholders and collect final feedback
* ✅ Lock scope, success metrics, and open questions
* ✅ Create GitHub repository and initialize README
* ✅ Configure default branch protection rules and CODEOWNERS
* ✅ Set up baseline CI workflow (lint + test placeholders)

Milestone:  1‑2 – UX / UI Wireframes

* ✅ Gather brand assets and accessibility guidelines
* ✅ Draft user‑flow diagram for five onboarding steps
* ✅ Produce low‑fidelity wireframes and specifications
* ✅ Document component specifications and interactions
* ✅ Create design validation checklist for testing
* ✅ Export design tokens (colors, spacing) for Tailwind config

Milestone: 3‑4 – Front‑End Scaffold on Cloudflare Pages

* ✅ Scaffold React 18 + Vite project under packages/pages
* ✅ Install and configure Tailwind CSS with design tokens
* ✅ Implement client‑side routing and ProgressBar component
* ✅ Build placeholder pages for each onboarding step
* ✅ Integrate auto‑save mock (localStorage) for offline prototyping
* ✅ Deploy first build to Cloudflare Pages preview
* Run Lighthouse check and document baseline performance

Milestone: 5‑6 – Worker API & KV Integration

* ✅ Initialize Worker project with wrangler v4 in packages/worker
* ✅ Create `/api/onboard/start` endpoint and issue JWT
* ✅ Implement `/api/onboard/step` endpoint with KV autosave
* ✅ Add `/api/sign` endpoint to store signature payload
* ✅ Secure all endpoints with JWT middleware and rate‑limiting
* ✅ Write unit tests (Vitest) for utilities and handlers
* ✅ Set up Miniflare for local integration testing
* Extend GitHub Actions to run Vitest + Miniflare tests on pull request

Milestone: 7 – Signature & Feedback Modules

* ✅ Select or stub e‑signature provider; finalize legal copy
* ✅ Build SignaturePage with typed‑name + checkbox form
* ✅ Integrate signature API and store record in KV
* ✅ Develop FeedbackModal with 1–5 rating and comment box
* ✅ Implement `/api/feedback` endpoint and storage schema
* ⚪️ Add 24‑hour reminder email via Postmark (single send template)
* ✅ Update Playwright E2E tests to cover complete flow

Milestone:  8 – QA, Load Testing, Security Review

* ✅ Complete WCAG 2.1‑AA accessibility audit of UI
* ✅ Perform k6 load test targeting p95 <500 ms and 1 k RPS
* ✅ Review Cloudflare WAF, rate‑limit, and bot‑fight settings
* ✅ Conduct OWASP ZAP scan for common vulnerabilities
* ✅ Fix all critical and high‑severity findings
* ✅ Prepare release notes and rollback plan

Milestone: 9 – Beta Launch

* Deploy staging build behind Cloudflare Access for beta users
* Monitor logs and analytics; capture onboarding KPIs
* Collect beta feedback and file issues in GitHub
* Resolve blocking bugs and polish UI copy
* Confirm GDPR export / delete endpoints function correctly

Milestone: 10 – Production Launch

* Point production DNS to Pages site
* Deploy Worker with production secrets via wrangler
* Enable Logpush to SIEM and set up alert thresholds
* Execute final smoke test checklist
* Announce launch to stakeholders and open support channel
* Schedule 2‑week post‑launch retrospective

Post‑Launch (Phase 2) – Admin Dashboard & Enhancements

* Build admin dashboard route secured by Cloudflare Access
* Implement metrics aggregation endpoint `/api/admin/metrics`
* Add charts for funnel completion and feedback sentiment
* Localize onboarding flow to second language (if approved)
* Evaluate incentive experiment to boost feedback rate
* Plan next quarter roadmap based on insights
