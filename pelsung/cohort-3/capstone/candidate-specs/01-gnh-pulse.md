# GNH Pulse

> Daily wellbeing check-in app mapped to Bhutan's 9 GNH (Gross National Happiness) domains, with personal and team-level dashboards.

## Elevator pitch

GNH Pulse lets anyone in GMC — residents, workers, students — do a 60-second daily check-in across the 9 GNH domains (psychological wellbeing, health, education, culture, community, good governance, ecology, time use, living standards). It turns Bhutan's national philosophy into a personal habit, and gives employers and GMC admin an aggregate view of how the city is actually feeling.

## Royal-pitch angle

GNH is His Majesty's legacy. Every Bhutanese school talks about it — but no one *measures* it in their own life day-to-day. GNH Pulse makes GNH tangible, personal, and continuous. It's the only one of the four products that could only exist in Bhutan.

## Target users

- **Primary:** GMC workers and residents aged 18–45 who want a simple daily habit
- **Secondary:** Employers running wellbeing programs for their teams
- **Tertiary:** GMC admin tracking city-wide wellbeing trends (aggregate, anonymized)

## User stories

1. As a resident, I can sign up with my name and email, and land on a clean "how was today?" screen.
2. As a user, I can do a 60-second check-in: rate each of the 9 domains on a 1–5 scale, with one optional free-text reflection.
3. As a user, I can see my last 7 / 30 days as charts (trend per domain, overall score).
4. As a user, I can see my streak (consecutive days checked in).
5. As a user, I can set which domains I want to focus on (filter out domains I don't care about today).
6. As a team lead, I can create a team, invite members by email, and see aggregate team scores (no individual data).
7. As a user, I can export my own data as CSV.

## Screens

### Public
- **Landing / Sign-in** — hero, 3-line pitch, sign-in button (Supabase Auth)
- **Sign-up** — email + name + "I am a [resident / employee / student]" segmentation

### Authenticated
- **Today** — today's check-in (9 domain cards, sliders or emoji scales), optional reflection textarea, submit button
- **Me** — personal dashboard: streak, last-7-days chart, last-30-days chart, per-domain breakdown
- **History** — calendar heatmap of check-in days, click a day to see that day's entry
- **Team (if team lead)** — aggregate scores, trend chart, member count; explicit "no individual data shown" notice
- **Settings** — profile, focus domains, export CSV, sign out

## Data model (Supabase tables)

> All tables have RLS enabled. Default policy: users can only read/write their own rows. Team aggregates use a Postgres view with `security_invoker = false` to show aggregate numbers without exposing individual rows.

### `pulse_checkins`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key, default `gen_random_uuid()` |
| user_id | uuid → `auth.users(id)` | Supabase auth user |
| date | date | One check-in per user per day (unique constraint) |
| psychological | int (1–5) | |
| health | int (1–5) | |
| education | int (1–5) | |
| culture | int (1–5) | |
| community | int (1–5) | |
| governance | int (1–5) | |
| ecology | int (1–5) | |
| time_use | int (1–5) | |
| living_standards | int (1–5) | |
| reflection | text | Optional |
| created_at | timestamp | |

### `pulse_teams`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | text | |
| owner_id | uuid → `auth.users(id)` | |
| created_at | timestamptz | default `now()` |

### `pulse_team_members`
| Field | Type | Notes |
|-------|------|-------|
| team_id | uuid → `pulse_teams(id)` | |
| user_id | uuid → `auth.users(id)` | |
| joined_at | timestamptz | default `now()` |

### `pulse_user_profile`
| Field | Type | Notes |
|-------|------|-------|
| user_id | uuid → `auth.users(id)` | Primary key |
| segment | text check (resident/employee/student) | |
| focus_domains | text[] | Which domains to show in Today (default = all 9) |

## Key flows

### First-time user
1. Land on sign-in → click "Create account" → enter email, name, segment
2. Redirect to Today screen with a brief 3-step inline tutorial (no modal walls)
3. Complete first check-in → land on Me dashboard with streak = 1

### Daily check-in
1. Open app → already signed in → Today screen
2. Slide 9 domain scores → optional reflection → submit
3. Confetti / small celebration → redirect to Me with updated streak

### Team lead flow
1. Go to Team tab → "Create team" → name it
2. Invite by email (comma-separated) → members receive link, sign up, auto-join
3. Team lead sees aggregate chart (never individuals)

## Design direction

- **Accent color:** warm saffron (maps to Buddhist/Bhutanese visual heritage) — confirm with brand team
- **Tone:** calm, affirming, not clinical. Domain cards should feel like tiles you want to touch.
- **Key visual:** circular "pulse ring" on Me dashboard showing today's overall score
- **Charts:** Recharts — line chart for 30-day trend, radar chart for 9-domain snapshot
- **Mobile-first:** most check-ins happen on phones
- **No gamification beyond streak** — no points or badges; this isn't a game

## MVP scope (must ship by Day 10)

- [ ] Supabase Auth working (sign up, sign in, sign out) with RLS policies on all tables
- [ ] Daily check-in screen with 9 domain scales + reflection
- [ ] One check-in per day enforced (edit today's, don't duplicate)
- [ ] Me dashboard: streak + last-7-day line chart + 9-domain radar
- [ ] History: simple list view of past check-ins (calendar heatmap is stretch)
- [ ] Settings: sign out
- [ ] Mobile-responsive on all screens

## Stretch goals

- Teams (create, invite, aggregate view)
- CSV export
- Calendar heatmap on History
- Focus domains (filter visible domains on Today screen)
- Reflection-of-the-week highlight on Me
- Weekly email digest (Supabase Edge Function on a pg_cron schedule)

## Out of scope

- Native mobile app
- Social feed / sharing between users
- AI-generated insights (could be stretch via Supabase Edge Function calling the Claude API)
- Individual-level data shared with team leads (privacy red-line)
- Medical/clinical framing — this is wellbeing, not diagnosis

## Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Radar chart is visually complex for beginners | Use Recharts default radar; accept 80% polish |
| 9 domains feel like too much friction per day | Default all to center (3); user just nudges the ones they feel strongly about |
| Team aggregates leak individual data if team is small | Require minimum 3 members before team chart renders; show "waiting for more members" otherwise |
| Streak logic edge cases (timezone, missed days) | Use user's local date (not UTC); reset streak if >1 day gap |

## Demo script (5 min at graduation)

1. **[30s] Hook** — "Every Bhutanese child learns about GNH. But who among us measures it in our own life, every day?"
2. **[60s] Live demo** — sign in on phone, do a check-in in 45 seconds, show the radar chart
3. **[90s] Story** — show a "staff member's" 30-day trend, point out how culture score dropped on days they worked late
4. **[60s] Scale** — show team aggregate view (with mocked data if needed); frame as "imagine this for all of GMC"
5. **[30s] Close** — "GNH Pulse turns a national philosophy into a personal habit. Built in 10 days, by Bhutanese youth, for Bhutan."

End with the app visible on screen.
