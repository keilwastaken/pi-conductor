# pi-conductor

Small Pi delegation router.

## Code map

This project is a small Pi delegation router:

- `package.json` — package metadata and scripts.
- `tsconfig.json` — TypeScript compiler settings.
- `extensions/conductor/index.ts` — Pi extension entry point and command/tool registration.
- `extensions/conductor/config.ts` — conductor configuration helpers.
- `extensions/conductor/delegates/` — delegate protocol, registry, child Pi runner, and flow implementations.
- `extensions/conductor/routing.ts` — routing decisions for delegate eligibility.
- `extensions/conductor/safety.ts` — safety checks for low-risk edits.

Commands:

- `/conductor status`
- `/conductor setup`
- `/conductor route <task>`
- `/conductor instant <simple plan mentioning one file>`
- `/conductor fast <small semantic task>`
- `/conductor strict on|off`

Tiny, exact, low-risk one-file edits are routed to the `instant` delegate flow. Small semantic tasks can use the `fast` delegate flow.

`instant` is the first delegate flow: the cockpit sends one simple plan plus the exact file, optionally a target line, and the worker runs with only `read` + `edit` by default so it can do the one change without scouting or expanding scope.

`fast` uses the same model chosen for instant, turns thinking to `low`, and gets `ls`, `find`, `grep`, `read`, `write`, and `edit` so it can do small local discovery tasks like writing `CODEMAP.md` without bloating the cockpit.

Run `/conductor setup` to choose the Pi model used by delegates. Fast defaults to the instant model, so users only choose once. Thinking is always forced off for instant and low for fast.
