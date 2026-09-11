# Zawadi Desk Starter

Starter repository for the Moringa Claude Code live workshop.

Zawadi Desk is a small operations tool. It already has a complete `projects` feature and the start of an `actions` feature. During the workshop, pairs agree the `actions` contract, build one side each, review each other, and merge.

## Setup

```bash
npm install
npm test
npm run lint
```

The normal test suite is green before the workshop starts. The action contract tests are intentionally separate:

```bash
npm run test:actions
```

Those tests describe the feature you will build. Do not edit them to make the feature pass.

## Shape

- `src/projects/` is the finished reference feature. Copy its patterns.
- `src/actions/` is intentionally incomplete.
- `docs/contract/actions.yaml` is the seam between Dev A and Dev B.
- `docs/handover/` is the UI handover for Dev B.
- `TASKS.md` has the small first-run tasks.

No real credentials belong in this repository. `.env.example` contains dummy values only.
