# Pelsung Cohort 3 (2026)

> Cohort-specific context. For program-wide context (what Pelsung is, phase structure, directory layout, conventions), see `../CLAUDE.md`.

## Training Overview
- **Start:** April 9, 2026 (Welcome & Orientation)
- **Duration:** ~8 weeks + capstone + exhibition
- **Trainees:** 42 (down from 45 as of 2026-05-08; reasons for the additional drop-offs not yet recorded — verify against current roster before assignments lock)
- **Verticals:** Software Development (FE-focused), Software Design (UX/UI), Software Testing (QA), Business Analysis
- **Exhibition/Demo Day:** TBD (may coincide with Pelsung graduation; His Majesty may attend)

## Vertical Assignments (as of 2026-05-08)
After 1-on-1 interviews and post-interview adjustments, trainees were placed into verticals by Bhuwan and Tek.

| Vertical | Trainees |
|----------|----------|
| Dev      | 16 |
| BA       | 18 |
| QA       | 8  |
| **Total** | **42** |

Source of truth: `pelsung-c3-vertical-selection.xlsx` — sheets `Dev Track`, `BA Track`, `QA Track`. The `1-to1-interview` sheet has interview notes; `dev-ba-spec-assignment` is a placeholder.

> Pending sheet edit: Chedup Tamang and Tashi Nima reassigned from BA → QA on 2026-05-08 (both attended both class tracks fully; Tashi Nima's interview record already had him as QA). Move them between sheets when next editing the xlsx.

## Class Structure (Cohort 3)
- **Foundation:** 11 classes (all 45 together)
- **BA + QA shared blocks** (taught to BA and QA together before they split):
  - Combined Opener — 5 classes (`curriculum/ba-qa-combined/`)
  - Spec Stack — 6 classes (`curriculum/ba-qa-specs/`)
  - Diagrams — 7 classes (`curriculum/ba-qa-diagrams/`)
  - Quality & Compliance — 5 classes (`curriculum/ba-qa-quality/`)
- **Vertical-only specialization** (after the shared blocks):
  - Dev: **16 classes** (`curriculum/dev/`)
  - BA: **14 classes** (`curriculum/ba/`)
  - QA: **8 classes** (`curriculum/testing/`)
  - Software Design: not running this cohort
- **Capstone:** 10 classes, **tiered** (see below). One combined Capstone Prep class (BA + Dev + QA together) sits between specialization and capstone — to be planned later.

### Cohort 3 audience reality
BA and QA trainees are deeply non-technical (Tek, 2026-05-03: "they think login is magic"). Vertical content for BA and QA must avoid:
- code, schemas, API contracts, system internals
- security testing, automation, performance, CI, DB testing, API testing (for QA)
- data modeling (for BA)

Use everyday-life examples (banking, shopping, leave requests, ATMs) instead of system examples. This is a Cohort 3 reality — re-evaluate per cohort.

Full class list lives in `../curriculum/index.html`.

## Capstone Structure (Cohort 3 — real projects only)
All capstone trainees build a real product. **4 project ideas × 2 groups per idea = 8 groups.**

**Group composition rule:**
- 2 Devs per group — fixed (one acts as Lead).
- BA and QA distributed flexibly across the 8 groups so all 42 trainees are placed (group sizes will vary).

Tek and Bhuwan evaluate, with a third opinion if an exhibition picks a single group's product.

Detailed plan, group assignments, and open questions live in `capstone/planning.md`.

(The earlier *tiered* plan — strong cohort builds, leftovers do docs-only — has been dropped for this cohort.)

## Post-Training Hiring Outlook (Internal)
After 1-on-1 interviews with every trainee (April 17, 2026), Bhuwan and Tek concluded that **~90% of BA and QA vertical trainees will not meet the SELISE hiring baseline**. Several are being flagged through other channels for alternative roles (admin, finance, HR).

- **Dev vertical (12) is the primary SELISE hiring pipeline.** Train as a standard dev track — do not reshape dev curriculum around any specific future-role hypothesis.
- **BA (14) and QA (11) tracks are taught as standard software BA and software QA curricula** — trainees connect the dots to their own day jobs themselves; we do not bias content toward their current-employer contexts.
- **Internal only** — do not telegraph hiring expectations to trainees, and do not include this framing in `curriculum/index.html`, decks, or anything trainee-visible.

## Training Team (Cohort 3)
| Name | Role |
|------|------|
| Tek Nath Acharya | Program Lead, DevOps Team Lead at SELISE Bhutan — owns BA + QA class prep |
| Bhuwan Sharma | Trainer, Software Engineer at SELISE Bhutan — owns Dev class prep |
| Rajiv Hassan (tentative) | Advisor, CPO of SELISE Group AG |

## Cohort 3 Notes & Artifacts
- `roster.xlsx` — full 310-person roster; Sheet 2 = 45 SELISE sub-cohort
- `pelsung-c3-vertical-selection.xlsx` — vertical assignments + 1-on-1 notes
- `training-plan.md` — detailed plan for this cohort
- `trainee-analysis.md` — demographics & background analysis
- `cv-review.md` — individual CV reviews & vertical recommendations
- `people-notes.yaml` — per-trainee observations (via `/note` skill)
- `documents/` — per-trainee folders (cv + certificate)
- `progress/` — attendance, grades, weekly evaluations
- `capstone/` — all capstone-related docs:
  - `capstone/planning.md` — current plan, group assignments, open questions
  - `capstone/candidate-specs/` — earlier candidate ideas (GNH Pulse, GMC Companion, Mindful Workplace, Eco Footprint) — **historical**, replaced by PPC / ZorigHub / GMC-ESR / TBD
  - `capstone/projects/` — capstone project outputs (built per-group during Phase 3)
