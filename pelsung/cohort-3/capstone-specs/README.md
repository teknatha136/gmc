# Cohort 3 Capstone — Product Specs

> Specs for the 4-product capstone portfolio built by Cohort 3 Dev trainees during the 2-week build window. Trainees implement frontends only; Supabase provides backend services (Postgres, Auth, Storage, Realtime).

## Portfolio framing

The four products are designed as **one coherent story**, not four unrelated apps. At graduation they are pitched together as:

> **"A toolkit for Mindful City — four products by Pelsung, for the people who live, work, and build in GMC."**

Each product covers one pillar of GMC's story:

| # | Product | Pillar | Team focus |
|---|---------|--------|------------|
| 1 | [GNH Pulse](01-gnh-pulse.md) | Wellbeing | Forms + data viz |
| 2 | [GMC Companion](02-gmc-companion.md) | Daily life | Maps + directory UX |
| 3 | [Mindful Workplace](03-mindful-workplace.md) | Work culture | Animations + timers |
| 4 | [Eco-Footprint](04-eco-footprint.md) | Sustainability | Inputs + gamification |

Together: **wellbeing × living × working × earth** — the GNH story in product form.

## Cohort context

- **16 dev-track trainees** (beginners — completed 4 weeks of JS + React)
- **10 working days** to build
- **Frontend-only** — all backend concerns go to Supabase
- **AI-assisted** — Claude Code is the pair-programmer; spec-first discipline is what keeps it honest
- **Demo target:** graduation exhibition with His Majesty potentially present

## Team structure

**4 teams × 4 trainees**, one product per team.

Roles within each team (roles flex based on people, not titles):

| Role | Responsibility |
|------|----------------|
| Spec owner / PM | Keeps the spec updated, resolves scope questions, runs standups |
| Builder (×2) | Implements core features, data flows, Supabase integration |
| UX lead | Owns screens, layout, component library usage, visual polish |
| QA + demo lead | Tests happy paths + edge cases, owns the pitch demo script |

BA and QA trainees from other verticals *may* be assigned as supporting members per team (stakeholder interviews, test plans, demo narration) — confirm with cohort lead.

## Shared technical conventions

All four products MUST use the same stack and visual identity so the portfolio feels coherent on demo day.

### Stack
- **Framework:** React (Vite)
- **Language:** TypeScript (beginner-friendly mode — no strict generics)
- **Component library:** shadcn/ui (primary) + Tailwind for layout
- **Routing:** React Router
- **State:** React Query for server state, Zustand for UI state if needed
- **Charts (where used):** Recharts
- **Maps (where used):** Leaflet with OpenStreetMap tiles
- **Forms:** React Hook Form + Zod for validation
- **Backend:** Supabase (Postgres, Auth, Storage, Realtime) — accessed via `@supabase/supabase-js`; no custom backend code

### Visual identity
- **Brand:** SELISE Brand Guidelines (see `/selise-brand/SELISE-Brand-Guidelines.md`) — non-negotiable
- **Logo:** SELISE logo appears in header of every product
- **Color system:** Primary SELISE palette + one accent color per product (see individual specs)
- **Typography:** Brand default
- **Shared header component:** Built once, reused across all four products (common "Mindful City Toolkit" ribbon + per-product branding)

### Supabase conventions (shared)
- Every product uses Supabase Auth (shared `auth.users`; single login works across all four products)
- Table names are prefixed by product (e.g. `pulse_checkins`, `companion_places`) to keep the shared Supabase project tidy
- File uploads go to Supabase Storage buckets (one bucket per product, prefixed names), not embedded as base64
- **Row Level Security (RLS) is enabled on every table** — every team writes per-table policies so users only see their own data (or public data where intended). No exceptions.
- Environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` — never commit service-role keys client-side
- Each team documents their Supabase schema (tables + RLS policies) in their spec under "Data model"

## Shared 10-day rhythm

Same cadence for every team. Deviations require approval from cohort lead.

| Day | Focus | Deliverable |
|-----|-------|-------------|
| 1 | Spec kickoff | Team reads spec, fills in any TBDs, writes README, sketches screens |
| 2 | Spec review + setup | Spec signed off; repo initialized; Supabase tables + RLS policies created; auth working |
| 3 | Skeleton | All routes/screens exist as empty shells; shared header integrated |
| 4 | Core data flow | Create + list for the main entity works end-to-end with Supabase |
| 5 | Feature build | Second-most-important flow complete |
| 6 | Feature build | Remaining MVP features wired up |
| 7 | Mid-build demo | Each team shows to cohort lead; scope-cut decisions made here |
| 8 | Polish | Empty states, loading states, error handling, mobile check |
| 9 | Pitch rehearsal | Demo script locked; full run-through of 5-min pitch |
| 10 | Full dry-run | All four teams pitch back-to-back; final fixes |

**Scope-cut day is Day 7.** If MVP isn't working end-to-end by Day 7, the team cuts stretch goals immediately. This is non-negotiable.

## Spec structure (per product)

Every product spec in this folder follows the same sections so teams know where to look:

1. **Elevator pitch** — one paragraph
2. **Royal-pitch angle** — why this matters for the graduation story
3. **Target users** — who uses this
4. **User stories** — what they need to do
5. **Screens** — screen-by-screen breakdown
6. **Data model** — Supabase tables + RLS policies
7. **Key flows** — happy-path user journeys
8. **Design direction** — visual/UX guidance
9. **MVP scope (must ship)** — lock-box for Day 10
10. **Stretch goals** — if time permits
11. **Out of scope** — explicit non-goals
12. **Risks & mitigations** — what could go wrong
13. **Demo script** — 5-minute pitch outline

## Demo day structure (target)

Total: ~30 minutes.

- **2 min** — Portfolio intro (cohort lead): "A toolkit for Mindful City"
- **5 min × 4** — each team's product pitch + live demo
- **3 min** — Joint close (a trainee speaks): what Pelsung learned, what's next
- **5 min** — Q&A with guests

Every team rehearses their 5-min slot independently, then the full flow on Day 10.

## Open items before Day 1

- [ ] Confirm final trainee count (CLAUDE.md says 12, current plan says 16)
- [ ] Confirm whether BA/QA trainees join dev teams or stay separate
- [ ] Provision shared Supabase project; decide whether one project with 4 schemas, or 4 separate projects (recommend: **one project, prefixed tables** — single login across all four products is a demo-day win)
- [ ] Distribute `VITE_SUPABASE_URL` + anon key to each team
- [ ] Pre-create storage buckets per product and apply default RLS templates
- [ ] Build shared header component + design tokens package before Day 1
- [ ] Decide whether teams self-select products or are assigned
