# Follow-up Practice Tasks

The core Actions feature is complete. Pick one small follow-up task. Keep the diff focused and reviewable.

## API and data

1. Add a `description` field to project list responses in `lib/projects.ts`.
2. Sort projects by `updatedAt` descending.
3. Add validation so `dueDate` must be a valid date string when provided.
4. Add a small test for owner defaulting to `Unassigned`.

## UI

1. Add a compact mode to `ProjectCard`.
2. Add a `variant` prop to `PageHeader`.
3. Add a filter to show open, blocked, or done actions.
4. Add a visual count for open actions.

## Stretch

Ask the agent to explain the Actions feature, then compare the answer against the code and tests. Save one example where the agent was precise and one where it guessed.
