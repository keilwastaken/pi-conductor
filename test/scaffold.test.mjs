import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("package exposes pi resources", async () => {
  const pkg = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
  assert.deepEqual(pkg.pi.extensions, ["./extensions"]);
  assert.deepEqual(pkg.pi.skills, ["./skills"]);
  assert.deepEqual(pkg.pi.prompts, ["./prompts"]);
});

test("user-facing command uses handoff terminology and canonical flow names", async () => {
  const index = await readFile(new URL("extensions/conductor/index.ts", root), "utf8");
  assert.match(index, /\/conductor handoff \[instant\|fast\|careful\]/);
  assert.doesNotMatch(index, /Type\.Literal\("deep"\)/);
  for (const flow of ["instant", "fast", "careful"]) {
    assert.match(index, new RegExp(`Type\\.Literal\\("${flow}"\\)`));
  }
  assert.doesNotMatch(index, /normalizeTier/);
  assert.doesNotMatch(index, /\/conductor packet/);
});

test("behavior-aligned prompt files are exposed", async () => {
  for (const file of ["instant-linear.md", "fast-linear.md", "careful-orchestrated.md"]) {
    const content = await readFile(new URL(`prompts/${file}`, root), "utf8");
    assert.match(content, /Execution Profile/);
  }
});

test("phase 1 route and handoff evidence language is present", async () => {
  const routing = await readFile(new URL("extensions/conductor/routing.ts", root), "utf8");
  assert.match(routing, /Route confidence/);
  assert.match(routing, /Missing context questions/);
  assert.match(routing, /Suggested refinement/);

  const handoff = await readFile(new URL("extensions/conductor/handoff.ts", root), "utf8");
  assert.match(handoff, /Desired outcome/);
  assert.match(handoff, /Escalate to human if/);
  assert.match(handoff, /Required evidence/);
  assert.match(handoff, /## Mental model update/);
});

test("cleanup guardrails: no deprecated aliases or stub text in source files", async () => {
  const tsFiles = [
    "extensions/conductor/index.ts",
    "extensions/conductor/config.ts",
    "extensions/conductor/handoff.ts",
    "extensions/conductor/routing.ts",
    "extensions/conductor/setup.ts",
  ];

  for (const file of tsFiles) {
    const content = await readFile(new URL(file, root), "utf8");
    // No deprecated aliases
    assert.doesNotMatch(content, /\/conductor delegate/, `No /conductor delegate stub in ${file}`);
    assert.doesNotMatch(content, /\/conductor brief/, `No /conductor brief alias in ${file}`);
    assert.doesNotMatch(content, /\/conductor login/, `No /conductor login alias in ${file}`);
  }
});

test("cleanup guardrails: no removed config symbols in source files", async () => {
  const tsFiles = [
    "extensions/conductor/index.ts",
    "extensions/conductor/config.ts",
    "extensions/conductor/handoff.ts",
    "extensions/conductor/routing.ts",
    "extensions/conductor/setup.ts",
    "extensions/conductor/types.ts",
  ];

  for (const file of tsFiles) {
    const content = await readFile(new URL(file, root), "utf8");
    assert.doesNotMatch(content, /ConductorMode/, `No ConductorMode in ${file}`);
    assert.doesNotMatch(content, /defaultDryRun/, `No defaultDryRun in ${file}`);
    assert.doesNotMatch(content, /oneWriterAtATime/, `No oneWriterAtATime in ${file}`);
    assert.doesNotMatch(content, /requireCleanOrAcknowledgedWorktree/, `No requireCleanOrAcknowledgedWorktree in ${file}`);
  }
});

test("cleanup guardrails: no legacy profile literals rapid or verified in source files", async () => {
  const tsFiles = [
    "extensions/conductor/index.ts",
    "extensions/conductor/config.ts",
    "extensions/conductor/handoff.ts",
    "extensions/conductor/routing.ts",
    "extensions/conductor/setup.ts",
    "extensions/conductor/types.ts",
  ];

  for (const file of tsFiles) {
    const content = await readFile(new URL(file, root), "utf8");
    // Check for profile literals as Type.Literal or explicit profile references
    assert.doesNotMatch(content, /Type\.Literal\(.*rapid.*/, `No 'rapid' profile literal in ${file}`);
    assert.doesNotMatch(content, /Type\.Literal\(.*verified.*/, `No 'verified' profile literal in ${file}`);
    assert.doesNotMatch(content, /profiles\["rapid"\]/, `No profiles["rapid"] in ${file}`);
    assert.doesNotMatch(content, /profiles\["verified"\]/, `No profiles["verified"] in ${file}`);
  }
});
