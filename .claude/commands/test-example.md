---
description: Run the test suite and summarize results
allowed-tools: Bash(npm test:*), Bash(npm run test:actions:*)
---

Run `npm test` and `npm run test:actions`.

Report:

- pass/fail counts for each run
- the file and test name for every failure, with the relevant error message
- whether the failures look related to $ARGUMENTS (if given)

Say clearly if everything passes.
