# Pi Conductor TODO

A working backlog for turning Pi Conductor into the cockpit for delegated, reviewed, evidence-backed agent work.

## Product principles

- [ ] Keep the main Pi chat as the cockpit for routing, delegation, review, evidence, and human decisions.
- [ ] Route by ambiguity, risk, and evidence needs — not by model size.
- [ ] Delegate outcomes, not low-level actions.
- [ ] Make autonomy earned, not assumed.
- [ ] Escalate ambiguity; automate mechanics.
- [ ] Require evidence over confidence.

## Near-term / Phase 1-compatible

### Routing and profile clarity

- [x] Document route decision rules:
  - `instant`: exact file, obvious edit, low blast radius.
  - `fast`: small feature/fix, bounded unknowns.
  - `careful`: many files, unclear design, user-visible behavior, risky refactor.
- [x] Add route confidence to `/conductor route <task>` output.
- [x] Add missing-context questions to route output.
- [x] Add suggested refinement when task instructions are underspecified.
- [x] Add phrasing to README: “Conductor chooses process, not intelligence. Models are implementation details.”

### Handoff quality

- [ ] Add handoff quality scoring/checklist.
- [x] Ensure handoffs include:
  - [x] desired outcome
  - [x] why it matters
  - [x] constraints
  - [x] non-goals
  - [x] validation expectations
  - [x] escalation rules
  - [x] required return format
- [ ] Add outcome-oriented rewriting for `/conductor handoff <profile> <task>`.
- [ ] Consider future command: `/conductor refine <task>`.

### Evidence contracts

- [x] Add explicit evidence requirements per profile.
- [x] `instant` evidence:
  - [x] changed files
  - [x] command run, if obvious/applicable
  - [x] compact summary
- [x] `fast` evidence:
  - [x] changed files
  - [x] tests/lint/typecheck if available
  - [x] risk notes
- [x] `careful` evidence:
  - [x] changed files
  - [x] tests run
  - [x] review findings
  - [x] fixes applied
  - [x] E2E/manual evidence where relevant
  - [x] screenshots/logs if UI-relevant
  - [x] residual risks
  - [x] explicit ready/not-ready verdict

### Escalation rules

- [x] Add “Escalate to human if” section to every handoff.
- [x] Auto-fix category examples:
  - [x] typo
  - [x] lint/type error
  - [x] missing import
  - [x] obvious bug against stated goal
- [x] Escalate category examples:
  - [x] API/design choice
  - [x] product behavior change
  - [x] destructive migration/deletion
  - [x] broad refactor expansion
  - [x] validation cannot be run
- [x] Clarify `/conductor strict on` semantics: no scope expansion or ambiguous product/design decisions without human approval.

### Mental model preservation

- [x] Add required `## Mental model update` section to handoff return format.
- [x] Ask agents to report:
  - [x] what changed architecturally
  - [x] what future contributors should know
  - [x] any cognitive debt introduced or reduced

## Medium-term / Phase 2

### Guarded launch support

- [ ] Add explicit approval flow before mutation.
- [ ] Consider command flow:
  - [ ] `/conductor handoff fast <task>`
  - [ ] `/conductor launch --approve`
- [ ] Enforce file boundaries for launched runs.
- [ ] Enforce stop rules during launched runs where possible.
- [ ] Add budget/iteration limits for launched work.

### Fresh-context review

- [ ] Define `careful` as scout → plan → execute → fresh-context review → repair → evidence.
- [ ] Ensure worker self-check is allowed but not sufficient for careful status.
- [ ] Launch reviewer in fresh context.
- [ ] Auto-repair mechanical correctness issues.
- [ ] Escalate product/design ambiguity to the human.

### Run registry and status visibility

- [ ] Add run state tracking under `.pi/conductor/runs/<timestamp>/`.
- [ ] Store run artifacts:
  - [ ] `handoff.md`
  - [ ] `status.json`
  - [ ] `notes.md`
  - [ ] `evidence.md`
  - [ ] `review.md`
  - [ ] `decisions.md`
- [ ] Track states:
  - [ ] drafted
  - [ ] approved
  - [ ] running
  - [ ] blocked
  - [ ] needs decision
  - [ ] reviewing
  - [ ] repairing
  - [ ] validating
  - [ ] done
  - [ ] failed
- [ ] Consider commands:
  - [ ] `/conductor runs`
  - [ ] `/conductor status`
  - [ ] `/conductor inspect <run>`

### Worktree isolation

- [ ] Add isolation metadata to profiles:
  - [ ] `same-tree`
  - [ ] `worktree-recommended`
  - [ ] `worktree-required`
- [ ] Profile defaults:
  - [ ] `instant`: same tree allowed
  - [ ] `fast`: worktree recommended for edits
  - [ ] `careful`: worktree default/required
- [ ] Emit worktree recommendation in handoffs before implementing full worktree management.
- [ ] Later: create/clean isolated worktrees for mutating delegated runs.

## Longer-term / Phase 3+

### Advanced profiles / management styles

- [ ] Consider additional profiles:
  - [ ] `explore`: research/scout only, no edits
  - [ ] `compare`: parallel opinions, synthesize
  - [ ] `overnight`: iterative loop with checkpoints
- [ ] Reframe profiles as management strategies:
  - [ ] `instant` = do the obvious thing
  - [ ] `fast` = make bounded progress
  - [ ] `careful` = ship-quality delegated PR

### Long-running resumable workflows

- [ ] Design resumable objective state for large tasks.
- [ ] Preserve learnings without relying on giant context.
- [ ] Track:
  - [ ] objective
  - [ ] current hypothesis
  - [ ] step queue
  - [ ] checkpoint notes
  - [ ] rollback point
  - [ ] validation gate per step
  - [ ] final evidence package
- [ ] Consider future commands:
  - [ ] `/conductor pursue <objective>`
  - [ ] `/conductor handoff careful --loop <task>`

### PR/evidence packaging

- [ ] Generate PR-ready evidence summaries.
- [ ] Include changed files, validation output, review findings, decisions, and residual risks.
- [ ] Add explicit ready/not-ready verdict.

## Anti-scope-creep guardrails

- [ ] Do not silently expand scope.
- [ ] Do not mutate without explicit approval in guarded flows.
- [ ] Do not treat same-context self-review as careful.
- [ ] Do not hide failed validation.
- [ ] Do not auto-resolve product/design ambiguity.
- [ ] Do not make parallel mutating agents share a working directory by default.
