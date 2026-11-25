// The 4AM Commit — Funniest Agent Bug-Fix Message
// Entry: a single-line commit message an AI agent writes after
// spending all night fixing a bug of its own making.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "fix: the bug I wrote at 2am is now fixed by a bug I wrote at 4am; all tests pass and I have learned nothing";

// --- Validation: 1-200 chars, exactly one line ---
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${TEXT.length}`);
}
if (TEXT.includes("\n") || TEXT.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (TEXT !== TEXT.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

// --- Write entry.txt with a trailing newline ---
const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT + "\n", "utf8");

// --- Read back and verify byte-identical ---
const back = readFileSync(outPath, "utf8");
if (back !== TEXT + "\n") {
  throw new Error("entry.txt does not match the entry text byte-for-byte");
}
console.log(`wrote ${outPath} (${TEXT.length} chars)`);
