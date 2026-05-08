# Eco-Footprint

> A personal sustainability tracker for GMC residents — log daily energy, water, waste, and transport; track streaks; join community challenges tied to GMC's carbon-negative commitment.

## Elevator pitch

Eco-Footprint lets any GMC resident log how they used energy, water, waste, and transport today in under 30 seconds. It turns those inputs into a personal "footprint" score, shows trends, runs community challenges (e.g. "Walking Week"), and displays a shared leaderboard. It's the first concrete, personal-scale way a resident can participate in Bhutan's carbon-negative commitment.

## Royal-pitch angle

Bhutan is the only carbon-negative country on earth. GMC is designed to keep it that way. But carbon negativity is usually a national statistic, not something a 22-year-old in Gelephu touches on a Tuesday. Eco-Footprint hands the national promise to every resident as a daily habit. "Every person in GMC can see their contribution" is a powerful story — and only works if the tool exists.

## Target users

- **Primary:** GMC residents aged 16–40 who want to live the carbon-negative story
- **Secondary:** Schools running environmental programs for students
- **Tertiary:** GMC-based companies running sustainability challenges for staff

## User stories

1. As a resident, I sign up and log today's footprint — 4 quick inputs (energy use, water use, waste produced, main transport mode).
2. As a user, I see my footprint score for today and how it compares to my 7-day average.
3. As a user, I see per-category progress rings (like Apple Activity) that fill inversely — lower footprint = more ring filled.
4. As a user, I maintain a daily logging streak.
5. As a user, I can join a community challenge (e.g. "Walk-to-Work Week") and see progress on the challenge leaderboard.
6. As a user, I see a leaderboard of top contributors on any active challenge.
7. As any user, I can see GMC-wide aggregate impact ("residents together saved X kg CO₂ this week").

## Screens

### Public
- **Landing** — hero with live GMC-wide CO₂ counter, sign-up CTA

### Authenticated
- **Today** — 4 input cards (energy, water, waste, transport); submit button; daily footprint score reveal
- **Me** — progress rings for each category, streak counter, 30-day trend chart
- **Challenges** — list of active + past challenges; "Join" button
- **Challenge detail** — challenge description, progress bar, leaderboard (top 20 + your rank)
- **Community** — GMC-wide stats (total participants, CO₂ avoided this week, most-joined challenge)
- **Settings** — profile, notifications, sign out

## Data model (Supabase tables)

> RLS policies: `eco_entries` restricted to `auth.uid() = user_id`. `eco_challenges` publicly readable. `eco_challenge_participants` readable for leaderboard (user_id + score only via a Postgres view); writable only by the owning user. Community aggregates served via a materialized view `eco_community_stats` refreshed hourly with `pg_cron`.

### `eco_entries`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| user_id | uuid → `auth.users(id)` | |
| date | date | Unique `(user_id, date)` — one entry per user per day |
| energy_kwh | float8 | Self-reported |
| water_liters | float8 | Self-reported |
| waste_kg | float8 | Self-reported |
| transport_mode | text check (walk/bike/bus/car/motorbike/other) | Primary transport today |
| transport_km | float8 | Distance |
| footprint_score | float8 | Computed in a Postgres trigger on insert/update |
| created_at | timestamptz | default `now()` |

### `eco_challenges`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| title | text | |
| description | text | |
| category | text check (energy/water/waste/transport/all) | |
| starts_on | date | |
| ends_on | date | |
| rule_type | text check (streak/threshold/reduction) | How scoring works |
| created_at | timestamptz | default `now()` |

### `eco_challenge_participants`
| Field | Type | Notes |
|-------|------|-------|
| challenge_id | uuid → `eco_challenges(id)` | |
| user_id | uuid → `auth.users(id)` | |
| joined_at | timestamptz | default `now()` |
| score | float8 | Updated via trigger when owning user's `eco_entries` change |

## Scoring logic (simplified for MVP)

Footprint score is rough, self-reported, and educational — not scientific. Use a simple weighted formula:

```
footprint_score = (energy_kwh * 0.4) + (water_liters * 0.001) + (waste_kg * 2) + transport_emissions
transport_emissions = transport_km * emission_factor_by_mode
  (walk: 0, bike: 0, bus: 0.08, car: 0.2, motorbike: 0.1)
```

Lower = better. Frame as a score, not "g CO₂" — being precise about units invites rightful skepticism about self-reported data. MVP framing is *relative* to your own history.

## Key flows

### Daily log
1. Open app → Today screen → 4 input cards with sensible defaults
2. Slide energy/water/waste numbers, tap transport mode, enter km
3. Submit → score revealed with comparison to 7-day avg
4. Streak updated; ring visualization animates

### Joining a challenge
1. Challenges tab → see "Walk-to-Work Week (Dec 1–7)"
2. Tap Join → redirected to Challenge Detail with "You're in!" banner
3. Each daily entry automatically contributes to challenge score
4. Leaderboard updates; see your rank

### Community view
1. Community tab → animated counter of "CO₂ avoided this week"
2. Bar chart: top 5 most-joined challenges
3. "X new residents joined today"

## Design direction

- **Accent color:** leaf green — confirm with brand team
- **Ring visual:** borrowed from fitness apps; warm green when you're below your baseline, amber above
- **Data reveal moment:** when score shows after submission, brief animation (1–2s)
- **Numbers vs. feelings:** lean into encouragement over stats. "Lighter day than most" beats "12% below baseline."
- **Illustration style:** subtle nature motifs (leaves, rain, bike) as decorative accents
- **No shaming:** high-footprint days get empathy ("Some days are bigger than others"), not red warnings

## MVP scope (must ship by Day 10)

- [ ] Supabase Auth + RLS policies on all tables
- [ ] Today screen with 4 input cards + submit
- [ ] Footprint score computed and stored per entry
- [ ] One-entry-per-day enforced
- [ ] Me screen: rings + streak + 30-day line chart
- [ ] One active challenge seeded (demoable)
- [ ] Join challenge + leaderboard view
- [ ] Community page: aggregate CO₂ counter (computed from all entries)
- [ ] Mobile-responsive

## Stretch goals

- Multiple concurrent challenges
- Weekly digest email
- Badges for sustained behavior (e.g. "7-day walker")
- "Compare to household average" benchmark
- Team mode (family or colleagues log together)
- Simple tips section ("Save energy by..." rotating cards)

## Out of scope

- Real device integration (smart meters, IoT) — everything is self-reported
- Scientifically accurate CO₂ calculation
- Carbon offset purchase
- Blockchain/NFT anything (we are not doing this)
- Push notifications (stretch at best)

## Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Leaderboard updates seem slow without realtime | Refetch leaderboard on screen focus; that's fine for 10-day MVP |
| Users don't trust footprint scores | Label clearly as "relative to your own history" — don't claim absolute CO₂ |
| Inputs feel tedious after day 3 | Provide "same as yesterday" shortcut; keep it to 4 fields |
| Community aggregate is 0 for days because cohort is small | Seed with mock data for demo, clearly labeled in UI as "demo community" |

## Demo script (5 min at graduation)

1. **[30s] Hook** — "Bhutan is the only carbon-negative country on earth. But when was the last time a resident felt that, personally, today?"
2. **[60s] Live log** — open app, log today's footprint in 20 seconds, show score reveal
3. **[60s] Personal trend** — switch to Me screen, show 30-day line chart with rings
4. **[60s] Challenge** — show active "Walk-to-Work Week," your rank on leaderboard
5. **[60s] Community** — Community tab with growing CO₂ counter, "imagine this for all of GMC"
6. **[30s] Close** — "Carbon-negative is national. Eco-Footprint makes it personal. Built in 10 days, by 4 Bhutanese youth."

End with the live counter animating.
