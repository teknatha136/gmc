# Cohort 3 Project Ideas — Realistic & Useful for GMC/GMCA

**Brutally honest filter applied:** No blockchain, no AI/ML, no IoT, no AR/VR, no "platform that integrates everything". Nothing that requires regulatory approval, real financial data, or specialized hardware. Nothing that competes with established commercial products (no ride-share apps, no booking apps, no Uber-clones).

**What we want instead:** Internal tools GMCA actually needs, where trainees own a small, real problem end-to-end. Boring is good. Boring ships.

---

## The Picking Criteria

A Cohort 3 project must be:
1. **Useful to GMCA, GMC residents, or the Pelsung program itself** — real users, not hypothetical ones
2. **Buildable in the training timeframe** — CRUD-level complexity, no exotic stack
3. **Unique to GMC's context** — not a generic clone of an existing app
4. **Demoable** — there's a working URL at the end, not a pitch deck
5. **Owned by all 4 verticals** — needs requirements, design, code, AND tests

---

## Project Ideas (Ranked by Realism + Usefulness)

### Tier A — Highly Recommended (real problems we have right now)

#### P-01: Pelsung Project Catalog
**Problem:** We just spent an hour extracting project ideas from two PDFs. They're unsearchable. Nobody can browse "all governance projects" or "all teams led by X" or "show me everything tagged AgriTech".

**What it is:** A searchable web catalog of Cohort 1, 2, 3 (and future) project ideas. Filter by category, search by team member, browse by maturity. Each project gets a detail page with team, resources, status, contact.

**Why it's good for trainees:**
- Real data already exists (the two PDFs we just analyzed)
- Pure CRUD — list, search, filter, detail view
- Real users: GMCA staff, mentors, future cohorts
- Could become the "alumni hall of fame" for Pelsung

**Stack:** Next.js + SQLite/Postgres + Tailwind. Static deploy on Vercel.

---

#### P-02: Pelsup Alumni Directory
**Problem:** GMCA has trained 100+ Pelsups across cohorts. Their skills, contacts, current organizations, and expertise are scattered. When GMCA needs "someone who knows healthcare in Bhutan", nobody can answer fast.

**What it is:** Searchable internal directory of Pelsung alumni. Each alum has: photo, contact, organization, skills, cohort, vertical, projects worked on, areas of expertise. Privacy controls — only logged-in GMCA staff see contact details.

**Why it's good for trainees:**
- Clear data model
- Search + filter + auth = full-stack learning
- Real users: GMCA leadership, mentors, recruiters
- Visible value within weeks

**Stack:** Next.js + Postgres + auth. Could host internally.

---

#### P-03: GMCA Visitor & Delegation Coordinator
**Problem:** GMC gets a constant flow of visitors — investors, government delegations, journalists, researchers. Coordination is currently email + spreadsheets. Schedules clash, briefing docs go missing, follow-ups drop.

**What it is:** Internal tool to log incoming visits, assign hosts, attach briefing docs, track schedule, capture meeting outcomes, set follow-up actions. Calendar view + visit detail page + action item tracker.

**Why it's good for trainees:**
- Solves a real bureaucratic pain
- Forms, calendars, file uploads — solid CRUD scope
- BA can interview actual GMCA staff to scope it
- QA has clear acceptance criteria (visit logged → host assigned → briefing attached → follow-ups closed)

**Stack:** Next.js + Postgres + S3-compatible storage for docs.

---

#### P-04: Field Observation Logger (for Pelsups & GMCA inspectors)
**Problem:** When Pelsups or GMCA staff visit GMC sites (construction, agriculture, infrastructure), they take phone photos and write notes that get lost in WhatsApp/email. No GPS context, no follow-up tracking.

**What it is:** Mobile-friendly web app where field staff log observations: photo + GPS + category (construction/environment/safety/etc.) + notes + follow-up needed (yes/no). Admin dashboard groups by location, category, status.

**Why it's good for trainees:**
- Real GMC use case (city is being built right now)
- Mobile-first design challenge for the design vertical
- Backend: file upload, geo data, simple queries
- QA: clear flows to test

**Stack:** Next.js PWA + Postgres + S3. Browser geolocation + camera APIs.

---

#### P-05: GMC Brand Asset Portal
**Problem:** Per CLAUDE.md, ALL materials must follow SELISE brand guidelines. Currently the brand assets live in `selise-brand/assets/`. Staff (especially Pelsups creating slides/posters) don't know where to find official logos, fonts, color codes, templates. They make do, then violate brand. CEO Julian flags it.

**What it is:** A simple internal portal: download official logos (multiple formats), copy hex codes with one click, download templates (PPT/Word/Canva), see do/don't examples. Search by asset type.

**Why it's good for trainees:**
- Solves a *currently active* compliance pain
- Design vertical owns the visual UX — they get to apply the very brand they're cataloging
- Small scope — maybe 5-8 pages
- Real measurable outcome: brand violations drop

**Stack:** Static Next.js site with downloadable assets. Could be `brand.selisegroup.com`.

---

#### P-06: Pelsung Class Attendance + Feedback
**Problem:** Pelsung classes happen multiple times per week. Attendance is paper or WhatsApp. Post-class feedback is forgotten. Instructor performance and class quality have no metrics.

**What it is:** QR code per class session that Pelsups scan to mark attendance. Post-class, they get a quick 3-question feedback form (rating + 1 free text). Instructor dashboard shows attendance trends + feedback themes per class/instructor/cohort.

**Why it's good for trainees:**
- Cohort 3 themselves are the users — they will actually use what they build
- Tight scope, visible weekly use
- Dashboards = data viz learning
- Tek's training program directly benefits

**Stack:** Next.js + Postgres + QR generator library.

---

### Tier B — Realistic but Less Critical

#### P-07: GMCA Internal Knowledge Wiki
**Problem:** GMCA SOPs, who-does-what, contact lists, policies live in scattered Google Docs. New staff can't find anything.

**What it is:** Self-hosted lightweight wiki. Markdown pages, simple search, page hierarchy, edit history. Think Notion-lite for GMCA-internal.

**Caveat:** Notion already exists and is better. Only worth building if there's a hard requirement to self-host.

---

#### P-08: Mentor-Pelsup Matching Tool
**Problem:** Pelsups need mentors. Mentors have specific expertise. Matching today is ad-hoc.

**What it is:** Mentors register skills + availability. Pelsups post needs (e.g., "need someone who knows agritech"). System suggests matches. Both parties confirm. Sessions logged.

**Stack:** Next.js + Postgres. Filter logic is the interesting part.

---

#### P-09: Cohort Performance Dashboard
**Problem:** GMCA leadership has no visibility into how cohorts are tracking — attendance, project progress, mentor engagement, dropout risk.

**What it is:** Read-only dashboard pulling from P-06 (attendance) + P-08 (mentor sessions) + manual project status updates. Charts and trend lines.

**Caveat:** Needs P-06 and P-08 to exist first. Could be a Cohort 4 follow-on.

---

#### P-10: Pelsung Resource Library
**Problem:** Class slides, recordings, reading lists, templates — all scattered across Google Drive, WhatsApp, instructor laptops.

**What it is:** Centralized library indexed by class number, topic, vertical (dev/design/QA/BA), date. Upload, tag, search, download.

**Stack:** Next.js + Postgres + S3. Mostly file management.

---

### Tier C — Avoid (good ideas but bad for trainees)

- **Anything mobile-native** (Flutter/React Native) — adds platform complexity
- **Anything multi-tenant SaaS** — auth/billing hell
- **Anything customer-facing payment** — compliance + risk
- **Anything that needs real GMC sensor data** — data doesn't exist yet
- **Anything that requires GMCA to change their workflow first** — adoption killer

---

## Team Structure (4 Verticals × Project)

### Recommended: 4-6 person teams, 1 project each

| Vertical | Headcount per team | Role                                        |
| -------- | ------------------ | ------------------------------------------- |
| BA       | 1                  | Owns scope, requirements, user research     |
| Design   | 1                  | Wireframes, UI mockups, design system       |
| Dev      | 2-3                | Frontend + backend implementation           |
| QA       | 1                  | Test planning, test execution, bug tracking |

With ~45 trainees in Cohort 3, that's roughly **8 teams × 1 project each**. Pick the top 8 from above.

---

## What BAs Should Produce — Single Unified Doc

**Don't ask trainees to write HLD + LLD + BRD + FRD separately.** They don't have the experience to maintain four documents. They'll be inconsistent and stale by week 2.

**Instead: One unified `PROJECT-SPEC.md` per project**, owned by the BA, reviewed by everyone. Template:

```markdown
# [Project Name] — Project Spec

## 1. Background & Problem
- Who has this problem?
- What do they do today (current workaround)?
- What does success look like?

## 2. Users & Personas
- Primary user (e.g., "GMCA visitor coordinator, 30-50yo, Excel-comfortable")
- Secondary users
- Non-users (people who must NOT have access)

## 3. Scope
### In Scope
- Specific feature 1
- Specific feature 2

### Out of Scope (explicitly)
- Feature X — deferred to v2
- Feature Y — never

## 4. User Stories (with acceptance criteria)
- As a [role], I want to [action] so that [benefit]
  - Given [context], when [action], then [outcome]
  - ...

## 5. Screens / User Flows
- [Designer's wireframes go here, linked from Figma]
- Key flow: [start] → [action] → [end state]

## 6. Data Model (light)
- Entities: User, Visit, Document
- Key relationships
- Required fields

## 7. Non-Functional Requirements
- Auth model (who logs in, how)
- Performance expectations (e.g., search returns in <2s)
- Privacy / data sensitivity
- Browsers/devices supported

## 8. Test Plan (owned by QA, lives here for visibility)
- Test scope
- Test cases (happy path + edge cases)
- Acceptance criteria for "done"

## 9. Tech Stack Decisions
- Frontend: ...
- Backend: ...
- Database: ...
- Hosting: ...

## 10. Milestones
- Week 1-2: scope finalized, wireframes done
- Week 3-4: data model + auth working
- Week 5-6: core CRUD complete
- Week 7-8: polish + QA + demo
```

**One doc. Lives in the project repo. Updated as decisions are made. Reviewed in each weekly sync.**

For more advanced trainees who can handle separation, you could split into:
- `01-requirements.md` (BA owns)
- `02-design.md` (Designer owns)
- `03-tech-spec.md` (Dev owns)
- `04-test-plan.md` (QA owns)

But for a first cohort, **one doc is better than four neglected ones.**

---

## What QA Should Produce

QA in this cohort should NOT be doing final-stage testing only. They pair from day one.

### Phase 1 — With BA (during scope)
- Review user stories
- Push back on vague acceptance criteria ("as a user I want it to work" → "what does 'work' mean?")
- Write the **test plan section** of PROJECT-SPEC.md
- Define edge cases the BA missed

### Phase 2 — With Dev (during build)
- Write test cases for each feature as it ships
- Manual test new features at end of each week
- Log bugs in shared tracker (GitHub Issues / Linear / etc.)
- Block "done" claims until acceptance criteria pass

### Phase 3 — Pre-demo
- Full regression pass
- Cross-browser check (at minimum: Chrome on desktop + mobile)
- Sign-off doc: what works, what's known broken, what's deferred

### Deliverables QA produces
- Test plan (in PROJECT-SPEC.md)
- Test case spreadsheet or markdown checklist
- Bug log
- Sign-off doc

**Will it work?** Yes — but only if:
- BAs and QAs sit in the same room as devs (not "throw it over the wall")
- Demo deadlines are real and unmovable
- Each week ends with a working build, not a "we'll integrate next week" promise

---

## Bottom Line

Stop optimizing for impressive pitch decks. Optimize for one of these statements being true at end of cohort:

> "GMCA staff actually use this every week."

If you can pick 8 projects where that's plausible, this is a good Cohort 3. If even 4 ship and 2 stick, that's better than 30 unbuilt blockchain proposals from C1+C2 combined.

---

*Generated: 2026-04-17*
