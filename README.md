# Pi Conductor

Conductor is a Pi package that keeps the main chat as the cockpit and recommends execution profiles for coding work.

## Status

Phase 1 scaffold: recommendation-only routing and handoff generation. It does **not** launch subagents or execute an orchestration FSM yet.

## Install locally

```bash
pi -e /Users/keilaloia/kogstudio/pi-conductor
```

Or install persistently:

```bash
pi install /Users/keilaloia/kogstudio/pi-conductor
```

## Commands

```text
/conductor setup
/conductor status
/conductor route <task>
/conductor handoff [micro|small|medium|full-auto] <task>
/conductor strict on|off
```

`/conductor handoff` writes a timestamped markdown log under `.pi/conductor/runs/` in the active project.

## What is a handoff?

A handoff is a clean work order for a delegated subagent. It includes:

- goal
- selected route/profile and suggested agent
- allowed files
- execution profile metadata
- non-goals
- stop rules
- validation hints
- required return format

## Defaults

The public names are execution profiles/topology constraints, not model-size labels:

- `micro`: linear direct-worker profile; no scout pass; verification optional; no review; max worker visits 1
- `small`: linear direct-worker profile; scout optional; verification recommended; no review; max worker visits 1
- `medium`: orchestrated profile; scout recommended; verification required; no review; max worker visits 2
- `full-auto`: orchestrated profile; scout required; verification required; review enabled; max worker visits 3

Default agent names are generic and configurable:

- Micro agents: `delegate`
- Small agents: `delegate`
- Medium agent: `worker`
- Reviewer agent: `reviewer`
- Full-auto worker agent: `worker`

Model and agent selection is a configurable implementation detail. By default, model preferences are blank so each agent inherits its normal default, while full-auto uses the current parent chat model to recommend the flow. Run `/conductor setup` to customize agents and model preferences from Pi's active model registry, or enter model IDs manually if no registry choices are available.

## Execution profile policy

- Micro: linear bypass/direct worker profile; read/edit exact allowed files only; run requested or narrow validation; return compactly.
- Small: linear bypass/direct worker profile; optional scout only if target files are unclear.
- Medium: orchestrated profile; scout/context pass recommended before execution; verification required.
- Full-auto: orchestrated profile; scout + plan + execute + review recommended.

## Phase 2 direction

The next phase will add guarded launch support for small delegations after explicit approval. Until then, use the generated handoff with your existing subagent workflow.
