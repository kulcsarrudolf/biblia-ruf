import { BIBLIA_DATA } from '../data/biblia-data';

// Data is bundled at build time (see scripts/generate-data.mjs) rather than read
// from disk, so the package works in the browser as well as in Node. The keys in
// BIBLIA_DATA are the JSON file names without their extension (e.g. "1Móz",
// "biblia"), matching the relative paths the rest of the code requests.
export const readJSONFile = <T>(relativePath: string): T => {
  const key = relativePath.replace(/^json\//, '').replace(/\.json$/, '');
  const data = BIBLIA_DATA[key];
  if (data === undefined) {
    throw new Error(`biblia-ruf: no bundled data found for "${relativePath}"`);
  }
  return data as T;
};
