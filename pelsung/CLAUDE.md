# Pelsung — SELISE Digital Training Program

## What is Pelsung
Pelsung ("Guardians of Prosperity") is His Majesty King Jigme Khesar Namgyel Wangchuck's flagship youth initiative for Gelephu Mindfulness City (GMC). Cohorts of 300+ Bhutanese youth (ages 20–35) go through Desuung (military/discipline) training first, then enter innovation and specialization tracks. SELISE runs the digital/software track.

This directory will grow over multiple cohorts and years (minimum 2-year engagement).

## Current: Cohort 3 (2026)

### Training Overview
- **Start:** April 9, 2026 (Welcome & Orientation)
- **Duration:** ~8 weeks + capstone + exhibition
- **Trainees:** 45 (45 original SELISE sub-cohort + 1 transfer in from Innovate for GMC − 1 transfer out: Rigzang Dorji to Innovate for GMC, 2026-04-08)
- **Verticals:** Software Development (FE-focused), Software Design (UX/UI), Software Testing (QA), Business Analysis
- **Exhibition/Demo Day:** TBD (may coincide with Pelsung graduation; His Majesty may attend)

### Training Structure (3 phases)
1. **Foundation (11 classes):** All 45 together — professional skills, AI basics, internet/APIs, dev tools, SDLC (hourglass/spec-driven model), product thinking, team roles, personal site build, aptitude assessment, vertical assignment
2. **Core Specialization (20–22 classes per vertical):** Verticals train independently — Dev (22), Design (20), Testing (20), BA (20)
3. **Capstone (10 classes):** Cross-vertical teams build a real GMC-relevant product together

### Training Approach
- **AI-first:** Claude Code is the primary AI tool across all verticals, with pre-configured opinionated CLAUDE.md files per project to guide trainees and enforce conventions
- **Spec-driven development:** Emphasis on the "hourglass model" where specs/requirements and review/testing expand while AI handles implementation
- **Cross-vertical collaboration:** Designed so verticals interact (Design hands off to Dev, QA tests Dev's work, BA writes requirements for all)
- **Matched to backgrounds:** Detailed trainer edition (course-plan-detailed.html) has per-trainee notes based on CV reviews

### SELISE Training Team
| Name | Role |
|------|------|
| Tek Nath Acharya | Program Lead, DevOps Team Lead at SELISE Bhutan |
| Bhuwan Sharma | Trainer, Software Engineer at SELISE Bhutan |
| Rajiv Hassan (tentative) | Advisor, CPO of SELISE Group AG |

## Directory Structure

```
pelsung/
├── CLAUDE.md
├── presentations/                      # Shared decks (not cohort-specific)
│   └── SELISE X PELSUNG.pptx           #   Program intro deck (given 2026-03-08)
├── curriculum/                         # Shared across cohorts — evolves over time
│   ├── course-plan.html                #   Visual overview (SELISE×Pelsung branded)
│   ├── course-plan-detailed.html       #   Trainer edition — per-trainee notes
│   ├── software-development.docx       #   Original dev curriculum (reference)
│   ├── shared/                         #   Shared CSS/JS across lesson HTML (e.g. slides.css)
│   ├── foundation/                     #   Phase 1 materials (all verticals together)
│   ├── dev/                            #   Software Development — slides, exercises, handouts
│   ├── design/                         #   Software Design materials
│   ├── testing/                        #   Software Testing materials
│   └── ba/                             #   Business Analysis materials
├── cohort-3/                           # Everything specific to Cohort 3
│   ├── roster.xlsx                     #   Full cohort roster (310 people, Sheet 2 = 45 SELISE)
│   ├── training-plan.md                #   Cohort 3 training plan
│   ├── trainee-analysis.md             #   Demographics & background analysis
│   ├── cv-review.md                    #   Individual CV reviews & vertical recommendations
│   ├── documents/                      #   Per-trainee folders (45 folders, cv + certificate)
│   ├── people-notes.yaml               #   Per-trainee observations, notes, action items (via /note skill)
│   ├── progress/                       #   Attendance, grades, weekly evaluations
│   └── projects/                       #   Capstone project outputs
├── cohort-4/                           # (future) Same structure as cohort-3
└── templates/                          # Reusable templates for new cohorts
```

## Key Decisions Made
- **AI tooling:** Claude Code (not Cursor/Bolt.new/Lovable) — with opinionated CLAUDE.md files per vertical
- **Foundation phase includes AI literacy early** (class 03) so all trainees can use AI tools throughout
- **Vertical assignment happens at class 11** after trainees build a personal site (class 10) as aptitude assessment
- **CV reviews drive vertical placement** — see `cohort-3/cv-review.md` for detailed recommendations
- **course-plan.html is the discussion document** — branded SELISE×Pelsung, designed for internal sharing
- **course-plan-detailed.html is trainer-only** — contains per-trainee notes, skill gaps, peer mentoring pairs, teaching strategies

## Conventions

- **Cohort-specific** materials (rosters, plans, trainee docs, presentations) go in `cohort-N/`
- **Shared** curriculum and reusable materials go in `curriculum/` or `templates/`
- When creating a new cohort, copy structure from the previous one and adapt
- Materials from earlier cohorts are preserved, never overwritten
- Trainee data (names, CIDs, contact info) is sensitive — don't expose in logs or public docs
- The parent `timeline.yaml` is the source of truth for all events (structured, filterable)
- Visual documents (HTML) must follow official SELISE Brand Guidelines (see root `CLAUDE.md` and `selise-brand/SELISE-Brand-Guidelines.md`)
- The Pelrithang presentation (`presentations/SELISE X PELSUNG.pptx`) is the gold-standard brand reference
- **RACI for training, RCI for SELISE:** Teach the industry-standard RACI matrix in Pelsung, then introduce SELISE's RCI adaptation (A dropped — Julian's insight that "Accountable" has no clean German equivalent; R is always exactly one person). Trainees should understand both.
