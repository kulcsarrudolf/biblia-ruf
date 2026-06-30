import { defineConfig } from 'tsup';

export default defineConfig({
  // Bundle each entry so the ESM output uses valid (extensioned) specifiers.
  // The CLI keeps its own entry (dist/cli/index.js), and validate stays importable
  // (dist/utils/validate.js) for the `validate` script.
  entry: ['src/index.ts', 'src/cli/index.ts', 'src/utils/validate.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'node18',
  // Inject __dirname/__filename shims so the package-root lookup works in ESM too.
  shims: true,
  // Keep the shim inlined per entry; splitting moves it into a shared chunk where
  // import.meta.url is unavailable, which breaks the ESM __dirname shim.
  splitting: false,
});
