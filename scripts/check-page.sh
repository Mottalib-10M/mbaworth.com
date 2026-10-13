#!/bin/sh
# Usage: sh scripts/check-page.sh college:usc,college:nyu   → only the failing assertions, one per line
PAGE_FILES="$1" npx vitest run tests/pages.test.ts 2>&1 | grep -E "^ FAIL|AssertionError|Tests " | sed 's/^ FAIL  tests\/pages.test.ts > //'
