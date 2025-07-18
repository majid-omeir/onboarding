# Claude Code Guide – Cloudflare Onboarding & Feedback System
Always read PLANNING.md at the start of every new conversation, check TASKS.md before starting your work, mark completed tasks to TASKS.md immediately, and add newly discovered tasks to TASKS.md when found.
> **Purpose**
> This document distills the PRD into a concise, engineer‑oriented checklist that Claude Code (or any pair‑programming assistant) can follow during coding sessions. Keep it open as your single source of truth.

---

## 1. Core Objective

Build an edge‑native onboarding flow on **Cloudflare Pages** with the back‑end logic in **Cloudflare Workers**.
Flow: **Account Creation → Profile Setup → (Optional) Feature Tour → E‑Signature → Immediate Feedback Request**.

### Success Metrics

| Metric                     | Target   |
| -------------------------- | -------- |
| Onboarding completion rate | ≥ 85 %   |
| Avg. duration              | ≤ 5 min  |
| Feedback response rate     | ≥ 40 %   |
| Service availability       | ≥ 99.9 % |

---

## 2. Tech Stack Snapshot

* **Front‑End**: Cloudflare Pages (React + Vite)
* **API Layer**: Cloudflare Worker (TypeScript)
* **State**: Cloudflare KV (step autosave), Durable Objects (per‑user session)
* **Auth**: JWT issued by Worker after sign‑up
* **Admin Area**: Secured with Cloudflare Access
* **Logs/Analytics**: Logpush + Cloudflare Analytics

### Directory Layout (suggested)

```
/  # repo root
├─ packages/
│   ├─ pages/      # React front‑end
│   └─ worker/     # TypeScript Worker
└─ docs/CLAUDE.md  # this file
```

---

## 3. API Contract (Worker)

| Endpoint             | Method | Purpose                                       |
| -------------------- | ------ | --------------------------------------------- |
| `/api/onboard/start` | POST   | Create user record, issue JWT                 |
| `/api/onboard/step`  | PUT    | Persist current step payload `{stepId, data}` |
| `/api/sign`          | POST   | Store signature `{name, ts}`                  |
| `/api/feedback`      | POST   | Save rating `{score, comment}`                |
| `/api/admin/metrics` | GET    | (Phase 2) aggregated stats                    |

> **Note**: All endpoints require `Authorization: Bearer <JWT>` except `/start`.

### KV Schema

```
user:{id}:step -> JSON (latest step + data)
user:{id}:signature -> JSON (name, timestamp)
user:{id}:feedback -> JSON (score, comment, ts)
```

---

## 4. Onboarding UI Components

* **ProgressBar** – Shows 5 steps, 20 % each.
* **StepForm** – Generic wrapper that autosaves on field change.
* **SignaturePage** – Displays ToS + checkbox + name field.
* **FeedbackModal** – Pops immediately after successful `/sign`.

> Claude Task Checklist:
>
> 1. Create React components with Tailwind.
> 2. Wire autosave hook calling `/api/onboard/step`.
> 3. Ensure forms are accessible (WCAG 2.1‑AA).

---

## 5. Non‑Functional Guardrails

* FCP ≤ 1.5 sec on 3G.
* p95 API latency ≤ 500 ms.
* Input sanitization & CSRF token for all POST/PUT.
* GDPR‑ready: provide `/api/data/export` & `/api/data/delete` (low priority).

---

## 6. Milestones & Suggested Branches

| Week | Branch                    | Goals                           |
| ---- | ------------------------- | ------------------------------- |
| 1‑2  | `feat/wireframes`         | Low‑fi Figma + routing skeleton |
| 3‑4  | `feat/pages-scaffold`     | Deploy base Pages site          |
| 5‑6  | `feat/worker-api`         | Build endpoints & KV wiring     |
| 7    | `feat/signature-feedback` | Signature + feedback UX         |
| 8    | `hardening`               | Load test, audit, bug‑fix       |
| 9    | `beta`                    | Internal release                |
| 10   | `main` → prod             |                                 |

Merge via PRs; require at least 1 code‑owner review.

---

## 7. Local Dev & Deploy

1. **Prereqs**: `npm i -g wrangler`
2. `wrangler pages dev ./packages/pages` – hot‑reload front‑end.
3. `wrangler dev --persist` – run Worker locally.
4. `.env` → store secrets (JWT secret, rate‑limit caps).
5. `wrangler deploy` (CI/CD on push to `main`).

---

## 8. Testing Matrix

| Layer       | Tool       | Scope                                |
| ----------- | ---------- | ------------------------------------ |
| Unit        | Vitest     | React components & utils             |
| Integration | Miniflare  | Worker endpoints                     |
| E2E         | Playwright | Full flow incl. signature & feedback |

Add GitHub Actions step to fail build if any test red.

---

## 9. Open Questions

1. Confirm third‑party e‑signature provider (or custom typed‑name OK?).
2. Incentive for feedback (e.g., discount?) – copy pending.
3. Multi‑language at launch?

---

## 10. Session Prompts for Claude Code

Use the following patterns when asking Claude for specific coding help:

* *"Rewrite `/api/onboard/step` handler to handle batch updates and return 207 StatusMulti*"
* *"Generate Vitest cases for SignaturePage covering empty, valid, and XSS inputs*"
* *"Optimize KV reads using bulk operations for N ≥ 100 users"*

> Keep prompts narrow (≤2 tasks) and reference exact file paths.

---

Happy coding! 🚀
