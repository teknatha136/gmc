# GMC Companion

> A resident and visitor companion app for Gelephu Mindfulness City — what to do, where to go, how to show respect.

## Elevator pitch

GMC Companion is the app you open when you're new to GMC or just want to find a quiet dzong to visit this weekend. It has events, sacred sites with visit etiquette, meditation spots, transport notes, and a searchable directory — all on a map and all in one place. Think "city app" but grown from GMC's mindful identity rather than bolted on.

## Royal-pitch angle

GMC is being built from scratch. Every visitor, every investor, every resettler will need a way to find their feet. GMC Companion is the soft-power front door: the first impression of the city's daily texture. Showing HM a map pinned with dzongs, meditation spots, and a working event calendar is tangible proof that the city already has a heartbeat.

## Target users

- **Primary:** Newcomers to GMC (relocating workers, investors, long-stay visitors)
- **Secondary:** Short-stay visitors (tourists, dignitaries, conference attendees)
- **Tertiary:** Residents looking for things happening this week

## User stories

1. As a visitor, I can open the app without signing up and see a map of GMC with categorized pins.
2. As a visitor, I can filter the map by category: *Dzongs & monasteries, Events, Meditation spots, Markets, Services*.
3. As a visitor, I can tap a pin to see details: photo, description, hours, etiquette notes (if sacred site).
4. As a visitor, I can see a list of upcoming events sorted by date.
5. As a user (signed in), I can favorite places and events.
6. As a user, I can see my favorites as a personal list.
7. As an admin (special role), I can add/edit places and events through a simple form.
8. As a visitor, I can switch between English and Dzongkha (script display; translations stub-ok for MVP).

## Screens

### Public
- **Home / Map** — full-screen map with pins; filter chips at top; "list view" toggle
- **Place detail** — photo, name, description, category, hours, etiquette block (if applicable), map snippet
- **Events list** — scrollable list grouped by day; tap to see event detail
- **Event detail** — photo, date/time, location (linked to place), description
- **Search** — search across places + events

### Authenticated
- **Favorites** — tabbed: Places / Events
- **Settings** — profile, language toggle, sign out

### Admin (role-gated)
- **Admin dashboard** — list of places + events
- **Add/edit place** — form with photo upload
- **Add/edit event** — form with date, location (dropdown of places)

## Data model (Supabase tables)

> RLS policies: `places` and `events` are publicly readable (policy: `select` for all). Inserts/updates restricted to users in `companion_admin_roles`. `favorites` restricted to `auth.uid() = user_id`. Photo upload bucket: `companion-photos` (public read, authenticated write).

### `companion_places`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | text | |
| category | text check (dzong/monastery/meditation/market/service/other) | |
| description | text | |
| lat | float8 | |
| lng | float8 | |
| hours | text | Free-text for MVP |
| etiquette | text | Optional, for sacred sites |
| photo_url | text | Supabase Storage public URL |
| is_sacred | bool | Triggers etiquette display |
| created_at | timestamptz | default `now()` |

### `companion_events`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | text | |
| description | text | |
| starts_at | timestamptz | |
| ends_at | timestamptz | |
| place_id | uuid → `companion_places(id)` | Nullable (some events don't map to a place) |
| photo_url | text | Supabase Storage public URL |
| created_at | timestamptz | default `now()` |

### `companion_favorites`
| Field | Type | Notes |
|-------|------|-------|
| user_id | uuid → `auth.users(id)` | |
| target_type | text check (place/event) | |
| target_id | UUID | |
| created_at | timestamptz | default `now()` |

### `companion_admin_roles`
| Field | Type | Notes |
|-------|------|-------|
| user_id | uuid → `auth.users(id)` | Primary key |
| role | text check (admin) | |

## Key flows

### First-time visitor (no sign-in)
1. Open app → map loads with all pins visible
2. Tap filter chip "Dzongs & monasteries" → only those pins show
3. Tap a pin → bottom sheet with details + etiquette
4. Optional: "Save to favorites" prompts sign-up

### Signed-in resident
1. Open app → auto-sign-in → Home map
2. Tap Events tab → see this week's events → tap one → detail → "Add to favorites"
3. Favorites tab → Events → see saved event

### Admin adding a place
1. Sign in as admin → Admin tab visible
2. Add Place → fill form → upload photo → save location by clicking map
3. New pin appears on Home within seconds

## Design direction

- **Accent color:** forest green (reflecting Bhutan's natural heritage) — confirm with brand team
- **Map tiles:** OpenStreetMap standard or Carto Positron for a calmer aesthetic
- **Pin icons:** distinct per category (use Lucide icons)
- **Sacred site treatment:** subtle gold accent + dedicated "how to visit respectfully" card
- **Photography-forward:** high-quality hero images per place
- **Mobile-first** — visitors walking around GMC use phones

## MVP scope (must ship by Day 10)

- [ ] Map view with categorized pins
- [ ] At least 15 seeded places across 4 categories (seed data hand-curated)
- [ ] Category filter chips
- [ ] Place detail view with photo + description + etiquette (where applicable)
- [ ] Events list + event detail
- [ ] At least 5 seeded upcoming events
- [ ] Sign-in (Supabase Auth) with RLS policies on all tables
- [ ] Favorites (places + events)
- [ ] Admin form to add new place + event (simple, not styled for public)
- [ ] Mobile-responsive

## Stretch goals

- Search across places + events
- Language toggle (English ⇄ Dzongkha)
- "Near me" geolocation
- Route/directions to a place (deeplink to Google/Apple maps)
- Photo gallery per place (multiple images)
- Event RSVP count

## Out of scope

- Ticket purchases / payments
- User reviews or ratings (too much moderation overhead for 10 days)
- Push notifications
- Real-time event streaming
- Full Dzongkha translation of descriptions (seed-data-only English for MVP)

## Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Seeding 15+ places requires research time | Start seeding on Day 1 in parallel with build; assign UX lead as content curator |
| Leaflet + React setup trips up beginners | Use react-leaflet tutorial; pre-build a working map component on Day 2 |
| Sacred-site etiquette text is culturally sensitive | Have Bhutanese trainees review; include a "contributed by [name]" footer |
| Admin role gating complexity | Use `companion_admin_roles` table + RLS policy checking membership; seed one admin user on Day 2. Stays simple, stays correct. |

## Demo script (5 min at graduation)

1. **[30s] Hook** — "If you arrived in GMC tomorrow, how would you find a meditation spot? A dzong to visit? An event tonight?"
2. **[90s] Live demo** — map view → filter for monasteries → tap one → show photo + etiquette card
3. **[60s] Events** — swipe to Events tab → show this weekend's festival → save to favorites
4. **[60s] Admin story** — "We pre-loaded 20 places and 10 events. Adding the next 200 is a form, not a codebase." Demo admin add.
5. **[60s] Close** — "GMC Companion is the city's first app. Built by 4 Bhutanese youth. Ready to grow with the city."

End with map on screen, pins across GMC.
