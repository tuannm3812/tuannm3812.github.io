#!/bin/bash
# External review by Google Antigravity (agy CLI) with Gemini 4 Hydrogen. Replaces Codex as
# the reviewer recorded in docs/08-agent-collaboration-log.md (Mike, 2026-11-25).
# Usage: scripts/agents/antigravity_review.sh <git range> [model]
#   e.g. scripts/agents/antigravity_review.sh 38533ec..origin/main
# Runs in plan mode inside the sandbox, so the agent cannot edit the repo. Its review is
# appended unchanged to the agent log as a dated "Antigravity" entry; the raw transcript
# goes to a temporary file outside the repo. AGY_BIN may point at a stub for testing.
set -euo pipefail
RANGE="${1:?usage: antigravity_review.sh <git range> [model]}"
MODEL="${2:-${AGY_MODEL:-gemini-4-hydrogen-high}}"
R="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$R"
AGY="${AGY_BIN:-$(command -v agy || echo "$HOME/.local/bin/agy")}"
[ -x "$AGY" ] || { echo "antigravity_review: agy CLI not found" >&2; exit 2; }
for end in "${RANGE%%..*}" "${RANGE##*..}"; do
  git rev-parse --verify --quiet "$end^{commit}" >/dev/null \
    || { echo "antigravity_review: bad range: $RANGE" >&2; exit 2; }
done
TEMPLATE="$(cat scripts/agents/antigravity_review_prompt.md)"
PROMPT="${TEMPLATE//\{RANGE\}/$RANGE}"
[[ "$PROMPT" != *"{RANGE}"* ]] || { echo "antigravity_review: bad prompt" >&2; exit 2; }
LOG="docs/08-agent-collaboration-log.md"
RAW="${TMPDIR:-/tmp}/antigravity-review-$(date +%Y%m%dT%H%M%S).log"
status=0
"$AGY" --print "$PROMPT" --model "$MODEL" --mode plan --sandbox \
  --print-timeout 0s > "$RAW" 2>&1 || status=$?
if [ "$status" -eq 0 ] && [ -s "$RAW" ]; then
  # Newest entries sit first, right after the template block; insert before the first
  # dated entry. agy links files by absolute path; make them repo-relative.
  ENTRY="$(mktemp)"
  {
    echo "## $(date +%Y-%m-%d) - Antigravity ($MODEL, external review)"
    echo
    sed "s#file://$R/##g; s#$R/##g" "$RAW"
    echo
  } > "$ENTRY"
  awk -v f="$ENTRY" 'BEGIN{done=0} /^## 20[0-9][0-9]-/ && !done {while((getline l < f)>0) print l; done=1} {print}' \
    "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
  rm -f "$ENTRY"
fi
echo "agy model=$MODEL exit=$status log=$LOG raw=$RAW"
exit "$status"
