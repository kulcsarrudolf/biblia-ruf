import { defineConfig } from 'tsup';

export default defineConfig({
  // Single entry: the library + CLI runner. Bible data is bundled in via
  // src/data/biblia-data.ts (generated), so there are no fs/path reads and the
  // package works in the browser. The bin calls the exported runCli().
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'node18',
});
