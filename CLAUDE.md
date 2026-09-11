# Zawadi Desk

This is a workshop repository. Keep changes small, scoped, and reviewable.

## Commands

- Install: `npm install`
- Main tests: `npm test`
- Action contract tests: `npm run test:actions`
- Type check: `npm run lint`

## Architecture

- `src/api/` owns HTTP routing only.
- `src/repositories/` would own persistence in a larger app; in this starter the feature repositories sit under their feature folders.
- `src/projects/` is complete and should be used as the house pattern.
- `src/actions/` is the workshop feature.
- Do not change `tests/actions/contract.spec.ts` to make the feature pass.

## Safety

- Never read, print, or create `.env` files.
- Use `.env.example` for dummy variable names.
- Do not run force-push commands.
- Do not add real credentials to docs, tests, screenshots, logs, or PR descriptions.
