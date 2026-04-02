# SELISE GMC

This is **not a code repository**. This directory tracks everything related to **SELISE GMC** — the setup of a new SELISE office in Gelephu Mindfulness City, Bhutan, under SELISE Group AG (HQ: Zurich, Switzerland).

This is a long-term project (2+ years minimum). Subdirectories will grow over time — each major area has its own CLAUDE.md with detailed context.

## Subdirectories
- `pelsung/` — Pelsung digital training program (multi-year, multi-cohort). See `pelsung/CLAUDE.md`.

## Project-wide files
- `timeline.yaml` — **Source of truth** for all events. Structured YAML with date, title, category, program, tags, people, location, body. Use `/timeline` skill to add entries. Filterable by category/program/tags for generating reports/docs.

## Conventions
- Subdirectories own their own CLAUDE.md as they grow
- Keep documents practical and actionable
- Sensitive data (trainee PII, CIDs) must not be exposed in logs or public docs
- Prefer preserving historical materials over overwriting them

# Updating CLAUDE.md files
- Update each CLAUDE.md with relevant context for that area (e.g. Pelsung training program details in `pelsung/CLAUDE.md`)
- Update with required information after each task if required
