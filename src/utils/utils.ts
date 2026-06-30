import * as fs from 'fs';
import * as path from 'path';

// Resolve the installed package root by walking up from this file until we find
// the package.json. This stays correct regardless of how deep the compiled file
// lives in dist/ (e.g. dist/index.js vs dist/cli/index.js), so JSON data shipped
// at the package root is always found.
const findPackageRoot = (start: string): string => {
  let dir = start;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    dir = path.dirname(dir);
  }
  return start;
};

const packageRoot = findPackageRoot(__dirname);

export const readJSONFile = <T>(relativePath: string): T => {
  const fullPath = path.resolve(packageRoot, relativePath);
  const rawData = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(rawData) as T;
};
