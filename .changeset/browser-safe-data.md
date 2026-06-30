---
"biblia-ruf": minor
---

Bundle the Bible data into the build instead of reading it from disk at runtime.
The package no longer depends on Node's `fs`/`path`, so it now works in browsers and
bundlers (Vite, webpack, etc.) in addition to Node. The public API is unchanged and
stays synchronous. Note: this inlines the full text (~6 MB, ~1.5 MB gzipped) into the
bundle — for size-sensitive browser apps, prefer calling biblia-ruf server-side.
