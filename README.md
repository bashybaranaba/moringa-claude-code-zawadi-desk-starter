# Zawadi Desk Starter

Starter repository for the Moringa Claude Code live workshop.

Zawadi Desk is a small Next.js operations tool designed to deploy cleanly on Vercel. It has a complete `projects` reference feature and a completed `actions` workshop feature. During the workshop, learners can study the contract, inspect the implementation, run the tests, and make small follow-up changes.

Current workshop state: the Actions feature is now implemented as the completed demo version. Learners can still use the contract, handover notes, and tests to review how the feature was built.

## Setup

```bash
npm install
npm test
npm run lint
npm run build
```

The normal test suite checks the Projects reference feature. The action contract tests check the completed Actions feature:

```bash
npm run test:actions
```

Those tests describe the contract the Actions implementation satisfies. Do not edit them to make the feature pass.

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

Import this repository in Vercel and keep the detected framework as Next.js. No environment variables are required for the starter. `.env.example` contains dummy values only.

## Shape

- `app/` contains the Next.js routes and pages.
- `app/api/projects/route.ts` is the complete reference API route.
- `app/api/projects/[projectId]/actions/route.ts` is the completed Actions API route.
- `lib/projects.ts` is the finished reference data layer.
- `lib/actions.ts` is the completed in-memory Actions data layer.
- `components/actions-screen.tsx` is the completed Actions screen.
- `docs/contract/actions.yaml` is the API contract that guided the implementation.
- `docs/handover/` is the UI handover that guided the interface.
- `TASKS.md` has small follow-up tasks learners can use for practice.

No real credentials belong in this repository. `.env.example` contains dummy values only.
