import * as fs from "fs";
import * as path from "path";

const packageRoot = path.resolve(__dirname, "..", "..");

export const readJSONFile = <T>(relativePath: string): T => {
  const fullPath = path.resolve(packageRoot, relativePath);
  const rawData = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(rawData) as T;
};
