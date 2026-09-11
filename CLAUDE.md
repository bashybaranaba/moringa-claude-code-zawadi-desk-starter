# Zawadi Desk

This is a workshop repository. Keep changes small, scoped, and reviewable.

## Commands

- Install: `npm install`
- Main tests: `npm test`
- Action contract tests: `npm run test:actions`
- Type check: `npm run lint`
- Local app: `npm run dev`
- Production build: `npm run build`

## Architecture

- `app/` owns Next.js pages and route handlers.
- `app/api/projects/route.ts` is complete and should be used as the API house pattern.
- `app/api/projects/[projectId]/actions/route.ts` is the workshop API feature.
- `lib/projects.ts` is the complete reference data layer.
- `lib/actions.ts` is the starter data layer for the workshop feature.
- `components/` owns small UI pieces used by the pages.
- Do not change `tests/actions/contract.spec.ts` to make the feature pass.
- This project should deploy on Vercel without custom server code.

## Safety

- Never read, print, or create `.env` files.
- Use `.env.example` for dummy variable names.
- Do not run force-push commands.
- Do not add real credentials to docs, tests, screenshots, logs, or PR descriptions.
