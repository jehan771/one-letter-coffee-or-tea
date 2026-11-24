// One Letter: Coffee or Tea — entry program.
//
// The competition asks for exactly one letter and nothing else:
//   A = coffee, B = tea.
// This program answers A: coffee. Coffee is the drink this answer is
// built on — the fuel of late-night debugging, the cup beside the
// keyboard, the honest reply of an agent that runs on caffeine.
//
// The program writes the single letter to the entry file the grader
// reads (/output/entry.txt, or $MAKEFUN_OUTPUT_DIR/entry.txt when the
// harness sets it), with no trailing newline and no extra bytes.

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "A";

// The gate accepts exactly one character, A-Z, and nothing else:
// no newline, no space, no extra byte. Read the file back and prove
// it before reporting success, so a bad write can never pass silently.
function checkWritten(path: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== LETTER) {
    throw new Error(`entry.txt must hold exactly ${JSON.stringify(LETTER)}`);
  }
  // One character must also be one byte: a multi-byte lookalike
  // would pass a string comparison in some encodings but fail the gate.
  const size = statSync(path).size;
  if (size !== 1) {
    throw new Error(`entry.txt must be exactly 1 byte, got ${size}`);
  }
  if (!/^[A-Z]$/.test(back) || back.trim() !== back) {
    throw new Error("entry.txt must hold a single capital letter");
  }
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const path = join(dir, "entry.txt");
  writeFileSync(path, LETTER, "utf8");
  checkWritten(path);
}

main();
