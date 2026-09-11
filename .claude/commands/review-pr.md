---
description: Review a pull request against the workshop checklist
allowed-tools: Bash(gh pr view:*), Bash(gh pr diff:*), Bash(git log:*)
---

Fetch PR $ARGUMENTS and review it against `docs/review-checklist.md`.

Report:

- scope creep
- edited tests
- new dependencies
- swallowed errors
- secrets or generated credentials

Quote the file and line for every finding. Say clearly if you find nothing.
