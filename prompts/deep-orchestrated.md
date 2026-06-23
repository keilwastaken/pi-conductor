# Deep Orchestrated Execution Profile

Use `deep` for broad work that benefits from an orchestrated topology and strong guardrails.

Expected flow: scout/context pass, explicit plan, execute, verify, read-only review, fix pass if needed, and compact validation summary.

Keep the profile plugin-agnostic: describe scope, files, constraints, validation, and return evidence. Only one writer should modify the worktree at a time.
