import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry must be one line, 1-200 characters, and not whitespace-only.
// Kept as a single named constant so the submitted sentence is never
// altered by accident; only this constant defines the entry.
const LINE =
  "We sell naming rights for potholes: drivers pay $4 a month to name the crater that ate their tire, because cities fix named potholes first and revenge is a subscription.";

function validateEntry(line: string): number {
  const charCount = [...line].length;
  if (line.trim().length === 0) {
    throw new Error("Entry line must not be empty or whitespace only.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry line must be a single line (no line breaks).");
  }
  if (charCount < 1 || charCount > 200) {
    throw new Error(
      `Entry line must be 1-200 characters, got ${charCount}.`,
    );
  }
  return charCount;
}

const charCount = validateEntry(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote ${charCount} characters to ${join(outDir, "entry.txt")}`);
