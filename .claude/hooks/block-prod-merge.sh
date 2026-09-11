#!/usr/bin/env bash
set -euo pipefail

payload="$(cat)"
if printf '%s' "$payload" | grep -E 'git +(merge|push).*main|gh +pr +merge' >/dev/null; then
  echo "Blocked: merges and pushes to main need human review in this workshop." >&2
  exit 2
fi

exit 0
