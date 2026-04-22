# Mindful Workplace

> A meeting companion that opens with breath practice, enforces a focus timer, and closes with a gratitude reflection — designed to be the default way GMC-based teams run meetings.

## Elevator pitch

Mindful Workplace is a web app you open at the start of every team meeting. It runs a 60-second guided breath, starts a visible focus timer, and ends with each person writing a one-line gratitude that the team sees together. Teams using it say meetings end lighter and more focused. It's the operational expression of "mindful city" applied to how people actually work.

## Royal-pitch angle

GMC promises a different way of working. But "mindful" in workplace contexts often stays aspirational — vague values on a poster. Mindful Workplace is a 3-minute ritual any team can adopt today. If every meeting in GMC opens with a breath and closes with gratitude, the city's work culture is literally different from anywhere else. This is the only product that *is* a cultural practice, not just a tool.

## Target users

- **Primary:** Small work teams (3–12 people) inside GMC-based companies
- **Secondary:** Remote-hybrid teams that need ritual to feel like a team
- **Tertiary:** Educational settings (classrooms, workshops) wanting a meeting opener

## User stories

1. As a team lead, I can create a team, name it, and invite members via link.
2. As a facilitator, I can start a meeting — app shows a breath animation for 60 seconds with audio cue.
3. As a facilitator, during a meeting I can start a focus timer (15/30/45/60 min options) with a calm visual.
4. As a participant in a meeting, I can see the live timer on my own device.
5. As a facilitator, I can end the meeting and trigger a gratitude round — everyone submits one line.
6. As a participant, I see everyone's gratitude reflections after all submit.
7. As a team member, I can browse past meeting reflections as a team memory.
8. As any user, I can run "solo mode" — the breath practice + timer without a team.

## Screens

### Public
- **Landing** — quick pitch, "Create team" + "Try solo" CTAs
- **Solo mode** — breath practice + timer without auth (for demos and trial)

### Authenticated
- **Home / Teams** — list of teams you belong to; create team button
- **Team detail** — team members, "Start meeting" button, past reflections stream
- **Meeting — Breath phase** — full-screen breath animation (60s), skip button
- **Meeting — Focus phase** — large timer, minimal UI, "Extend / End" controls
- **Meeting — Gratitude phase** — each member writes one line; wait for all to submit; then everyone's lines appear
- **Reflections archive** — chronological list of past meetings (date, duration, gratitudes)
- **Settings** — profile, notifications, sign out

## Data model (Supabase tables)

> RLS policies: users can read teams/meetings/gratitudes only for teams they're a member of. `meetings` and `gratitudes` tables are published to Supabase Realtime so all members' devices sync live without polling.

### `workplace_teams`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | text | |
| owner_id | uuid → `auth.users(id)` | |
| invite_code | text | 6-char join code, unique |
| created_at | timestamptz | default `now()` |

### `workplace_team_members`
| Field | Type | Notes |
|-------|------|-------|
| team_id | uuid → `workplace_teams(id)` | |
| user_id | uuid → `auth.users(id)` | |
| joined_at | timestamptz | default `now()` |

### `workplace_meetings`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| team_id | uuid → `workplace_teams(id)` | |
| phase | text check (breath/focus/gratitude/ended) | Drives UI across all members in realtime |
| started_at | timestamptz | default `now()` |
| ended_at | timestamptz | Nullable until ended |
| duration_minutes | int | |
| facilitator_id | uuid → `auth.users(id)` | |

### `workplace_gratitudes`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| meeting_id | uuid → `workplace_meetings(id)` | |
| user_id | uuid → `auth.users(id)` | |
| text | text (<=200 chars) | |
| submitted_at | timestamptz | default `now()` |

## Key flows

### First meeting
1. Team lead creates team → gets invite code/link → shares with members
2. Members click link → sign up → auto-join team
3. Team lead clicks "Start meeting" on team detail page
4. All members' devices (if they're in the team page) navigate to Breath phase simultaneously
5. 60-second breath → auto-advance to Focus phase → timer starts
6. At end of timer, facilitator clicks "End meeting" → Gratitude phase
7. Each member writes one line → submits
8. Once all members submit (or timeout), everyone sees all reflections
9. Reflections saved to team archive

### Solo mode
1. Landing → "Try solo" → Breath phase (no team, no auth)
2. Breath → pick timer length → Focus → "End" → short reflection prompt (saved to localStorage only)

## Design direction

- **Accent color:** deep teal / calm blue — confirm with brand team
- **Animations:** Framer Motion — the breath visual is the signature. A slowly pulsing circle (grow for inhale, shrink for exhale) with subtle glow.
- **Audio:** gentle bell at phase transitions (no voice-over for MVP — purely visual)
- **Typography:** extra generous whitespace; this product should feel like the *opposite* of a corporate tool
- **Motion principles:** slow, deliberate, no bouncy animations — every transition is 400ms+ ease-in-out
- **Dark mode:** shipping in MVP is a bonus; focus ambiance benefits from dark

## MVP scope (must ship by Day 10)

- [ ] Solo mode (breath + timer + single-line reflection saved locally) — works without auth
- [ ] Supabase Auth + RLS policies on all tables
- [ ] Create team + invite code flow
- [ ] Team detail page with member list + "Start meeting"
- [ ] Full meeting flow: Breath → Focus → Gratitude → Archive
- [ ] Gratitudes visible to all team members after everyone submits
- [ ] Reflections archive for team
- [ ] Mobile-responsive (ritual often happens in-person on a phone)

## Stretch goals

- Real-time sync across members' devices via Supabase Realtime (subscribe to `workplace_meetings.phase` changes + `workplace_gratitudes` inserts) — this should be in MVP, not stretch, since Supabase makes it cheap
- Multiple breath patterns (box breathing, 4-7-8, etc.)
- Custom meeting length presets per team
- Calendar integration (one-click start from a meeting invite)
- Anonymous gratitudes option
- Weekly "gratitude cloud" email to team
- Audio guidance option (recorded voice)

## Out of scope

- Video conferencing (this is the ritual layer, not Zoom)
- Task/agenda management
- Integration with Slack/Teams (stretch territory)
- Native mobile app
- Custom breath-practice design tool

## Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Real-time sync gets tricky for beginners | Supabase Realtime is SDK-level: `supabase.channel(...).on('postgres_changes', ...)`. Build a tiny `useRealtimeTable` hook on Day 3 and reuse it for `meetings` + `gratitudes`. Fall back to 3s polling only if Realtime misbehaves in the demo environment. |
| Breath animation performance on low-end devices | Use CSS transforms + will-change; keep animation simple (no particle effects) |
| Gratitude round blocks if one person doesn't submit | Facilitator has "end gratitude round" override button after 60s |
| Solo mode feeling like afterthought | Build solo mode FIRST (Days 3–4) — it's the demo safety net if team sync breaks |

## Demo script (5 min at graduation)

1. **[30s] Hook** — "How does every team meeting start in your company? Announcements? Status updates? What if it started with a breath?"
2. **[60s] Live breath demo** — open solo mode on screen, run the 60-second breath, narrate softly. Let the room experience it.
3. **[60s] Team flow walkthrough** — switch to team mode; facilitator starts meeting; two trainees on stage "join"; timer runs.
4. **[60s] Gratitude moment** — each trainee submits a one-line gratitude live; show the combined view on the projector.
5. **[60s] Close** — "This is 3 minutes. But multiplied across every meeting in GMC, it's a new work culture. Built by 4 Bhutanese youth."

End with the breath circle still pulsing.
