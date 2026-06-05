import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const replacements = [
  // Dark palette → Quantum Indigo
  [/#1E1E30/g, "#E0E5F0"],
  [/#07070F/g, "#FAFBFD"],
  [/#E8E8F0/g, "#1A1B4B"],
  [/#6B6B80/g, "#6C757D"],
  [/#0F0F1A/g, "#F1F4FB"],
  [/#12121F/g, "#FFFFFF"],
  [/#0C0C16/g, "#FFFFFF"],
  [/#B8FF35/g, "#00B4D8"],
  [/#8F8FA3/g, "#4A5068"],
  [/#33334A/g, "#9CA3B8"],
  [/rgba\(184,\s*255,\s*53,/g, "rgba(0, 180, 216,"],
  [/rgba\(74,\s*74,\s*255,/g, "rgba(67, 97, 238,"],
  [/rgba\(7,\s*7,\s*15,\s*0\.95\)/g, "rgba(250, 251, 253, 0.92)"],
  [/rgba\(7,\s*7,\s*15,\s*0\.9\)/g, "rgba(250, 251, 253, 0.90)"],
  [/rgba\(7,\s*7,\s*15,\s*0\.8\)/g, "rgba(26, 27, 75, 0.40)"],
  // Brand copy
  [/searchenginebasics\.io/g, "physicsfundamental.org"],
  [/Search Engine Basics(?!:)/g, "Physics Fundamentals"],
  [/searchEngineBasics/g, "physicsFundamentals"],
];

const targetDirs = ["app", "components"];
const skipNames = new Set(["node_modules", ".next", "test-results", "debug-screenshots"]);

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skipNames.has(name)) continue;
    const path = join(dir, name);
    const stats = statSync(path);
    if (stats.isDirectory()) walk(path);
    else if (/\.(tsx|ts|css|json|md|txt)$/i.test(name)) process(path);
  }
}

function process(path) {
  const original = readFileSync(path, "utf8");
  let next = original;
  for (const [pattern, replace] of replacements) next = next.replace(pattern, replace);
  if (next !== original) {
    writeFileSync(path, next);
    console.log("updated", path);
  }
}

for (const dir of targetDirs) walk(dir);
