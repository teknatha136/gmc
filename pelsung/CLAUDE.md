# Pelsung — SELISE Digital Training Program

> This file is **program-wide** and stays stable across cohorts. Cohort-specific details (trainee counts, class counts, hiring outlook, training team, etc.) live in `cohort-N/CLAUDE.md`.

## What is Pelsung
Pelsung ("Guardians of Prosperity") is His Majesty King Jigme Khesar Namgyel Wangchuck's flagship youth initiative for Gelephu Mindfulness City (GMC). Cohorts of 300+ Bhutanese youth (ages 20–35) go through Desuung (military/discipline) training first, then enter innovation and specialization tracks. SELISE runs the digital/software track.

This directory will grow over multiple cohorts and years (minimum 2-year engagement).

## Program Structure (all cohorts)

### Phases
1. **Foundation (~11 classes):** All trainees together — professional skills, AI basics, internet/APIs, dev tools, SDLC (hourglass/spec-driven model), product thinking, team roles, personal site build, aptitude assessment, vertical assignment.
2. **Core Specialization:** Verticals train independently. Exact class counts evolve per cohort — see the active cohort's CLAUDE.md and `curriculum/index.html`. **BA and QA share three consecutive blocks before splitting:** (1) a short *Combined Opener* (~5 classes covering role reality, spec-reading, FR/NFR, acceptance criteria, estimation); (2) a *Spec Stack* block (~6 classes — Anatomy, BRD, SRS, HLD/LLD, Writing Mechanics, Spec Teardown); (3) a *Diagrams* block (~6 classes — Use Case, BPMN, Flowchart, Swimlane, Activity, DFD). After all three shared blocks, BA (~15 classes) and QA (~19 classes) split into vertical-specific work.
3. **Capstone (~10 classes):** Cross-vertical work culminating in an exhibition. Structure (single project vs. tiered real-build + docs-only) depends on cohort assessment and is defined in the cohort's CLAUDE.md.
4. **Extra / Supplementary (self-paced):** Optional deep-dives that every role benefits from but don't fit neatly into foundation or vertical tracks (e.g. `E1 — UX & HCI Basics`). Stored under `curriculum/extra/`. Accessible from the curriculum landing page as Phase 04.

### Verticals
Software Development (Dev), Software Testing (QA), Business Analysis (BA), Software Design (UX/UI). Not every vertical runs every cohort — check the active cohort's plan.

## Training Approach (all cohorts)
- **AI-first:** Claude Code is the primary AI tool across all verticals, with pre-configured opinionated CLAUDE.md files per project to guide trainees and enforce conventions.
- **Spec-driven development:** Emphasis on the "hourglass model" where specs/requirements and review/testing expand while AI handles implementation.
- **Cross-vertical collaboration:** Designed so verticals interact (Design hands off to Dev, QA tests Dev's work, BA writes requirements for all).
- **Matched to backgrounds:** CV reviews and per-trainee notes live in the cohort directory (`cohort-N/cv-review.md`, `cohort-N/people-notes.yaml`) — used to adapt pacing and pairings.

## Directory Structure

```
pelsung/
├── CLAUDE.md                             # (this file — program-wide)
├── presentations/                        # Shared decks (not cohort-specific)
│   └── SELISE X PELSUNG.pptx             #   Program intro deck (given 2026-03-08)
├── curriculum/                           # Shared across cohorts — evolves over time
│   ├── index.html                        #   Structured landing page · source of truth for classes
│   ├── shared/                           #   Shared CSS/JS across lesson HTML (e.g. slides.css)
│   ├── foundation/                       #   Phase 1 materials (all verticals together)
│   ├── ba-qa-combined/                   #   BA+QA shared block 1 — opener (role/spec-reading/FR-NFR/AC/estimation)
│   ├── ba-qa-specs/                      #   BA+QA shared block 2 — spec stack (Anatomy/BRD/SRS/HLD-LLD/...), with templates/
│   ├── ba-qa-diagrams/                   #   BA+QA shared block 3 — diagrams (Use Case/BPMN/Flowchart/Swimlane/Activity/DFD)
│   ├── dev/                              #   Software Development — slides, exercises, handouts
│   ├── design/                           #   Software Design materials
│   ├── testing/                          #   Software Testing materials
│   ├── ba/                               #   Business Analysis materials
│   └── extra/                            #   Supplementary / self-paced classes
├── cohort-3/                             # Everything specific to Cohort 3
│   ├── CLAUDE.md                         #   Cohort-3 specific context
│   ├── roster.xlsx                       #   Full cohort roster
│   ├── pelsung-c3-vertical-selection.xlsx#   Vertical assignment records & notes
│   ├── training-plan.md
│   ├── trainee-analysis.md
│   ├── cv-review.md
│   ├── documents/                        #   Per-trainee folders (cv + certificate)
│   ├── people-notes.yaml                 #   Per-trainee observations (via /note skill)
│   ├── progress/                         #   Attendance, grades, weekly evaluations
│   └── projects/                         #   Capstone project outputs
├── cohort-4/                             # (future) Same structure as cohort-3
└── templates/                            # Reusable templates for new cohorts
```

## Key Decisions (program-wide)
- **AI tooling:** Claude Code (not Cursor/Bolt.new/Lovable) — with opinionated CLAUDE.md files per vertical.
- **Foundation phase includes AI literacy early** (typically class 03) so all trainees can use AI tools throughout.
- **Vertical assignment happens at the end of foundation** (typically class 11) after trainees build a personal site as an aptitude signal.
- **CV reviews drive vertical placement** — cohort-specific recommendations live in the cohort's `cv-review.md`.
- **`curriculum/index.html` is the single source of truth for classes** — structured, SELISE×Pelsung-branded landing page listing every phase and vertical class with links to slides and notes. Replaces the earlier `course-plan.html` / `course-plan-detailed.html`.
- **RACI for training, RCI for SELISE:** Teach the industry-standard RACI matrix in Pelsung, then introduce SELISE's RCI adaptation (A dropped — Julian's insight that "Accountable" has no clean German equivalent; R is always exactly one person). Trainees should understand both.

## Conventions

- **Cohort-specific** materials (rosters, plans, trainee docs, presentations, hiring outlook, training team, class counts) go in `cohort-N/` and `cohort-N/CLAUDE.md`.
- **Shared** curriculum and reusable materials go in `curriculum/` or `templates/`.
- **This CLAUDE.md stays generic.** Anything that changes per cohort belongs in the cohort directory's CLAUDE.md.
- When creating a new cohort, copy structure from the previous one and adapt.
- Materials from earlier cohorts are preserved, never overwritten.
- Trainee data (names, CIDs, contact info) is sensitive — don't expose in logs or public docs.
- The parent `timeline.yaml` is the source of truth for all events (structured, filterable).
- Visual documents (HTML) must follow official SELISE Brand Guidelines (see root `CLAUDE.md` and `selise-brand/SELISE-Brand-Guidelines.md`).
- The Pelrithang presentation (`presentations/SELISE X PELSUNG.pptx`) is the gold-standard brand reference.
