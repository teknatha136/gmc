---
name: timeline
description: Add a journal entry to timeline.yaml. Use when Tek mentions an event, milestone, or update that should be logged.
---

Add a new entry to `/Users/tek/work/gmc/timeline.yaml`.

## Input
The user provides an event description and optionally a date. Examples:
- `/timeline Pelsung graduation ceremony happened today`
- `/timeline On March 8th I presented to Cohort 3 in Gelephu`
- `/timeline Training venue confirmed as Pelrithang`

## Steps

1. **Parse the date.** If a date is given, use it. If "today"/"yesterday"/no date, resolve to an absolute date.

2. **Search for context.** If the event is public or notable (e.g., involves GMC, Pelsung, His Majesty, SELISE announcements), do a quick web search to add a short summary. If internal, skip.

3. **Read timeline.yaml** to understand existing entries and avoid duplicates.

4. **Append the entry** at the correct chronological position in the YAML file.

5. **Entry format:**
```yaml
- date: YYYY-MM-DD
  title: Short title (5-10 words)
  category: gmc-setup | training | planning | travel | milestone | event
  program: pelsung-c3 | pelsung-c4 | gmc-office | (other as needed)
  tags: [relevant, filterable, tags]
  people: [Full Name, Full Name]
  location: Place name
  body: >
    One paragraph. Concise but informative. 1-3 sentences.
```

## Field Guide

### category (pick one)
- `milestone` — Major achievement, program start/end, graduation
- `training` — Day-to-day training activity, class, workshop
- `planning` — Strategy calls, curriculum decisions, logistics planning
- `travel` — Team movement between locations
- `gmc-setup` — Office setup, infrastructure, admin
- `event` — Exhibition, ceremony, visit, public event

### program (pick one)
- `pelsung-c3` — Pelsung Cohort 3 related
- `pelsung-c4` — Future Cohort 4
- `gmc-office` — General GMC office setup
- Add new values as needed

### tags (free-form list, for filtering)
Use consistent tags. Common ones: `presentation`, `logistics`, `AI`, `curriculum`, `gelephu`, `thimphu`, `SELISE Blocks`, `exhibition`, `His Majesty`, `hiring`, `desuung`

### people
Full names. Common: `Tek Nath Acharya`, `Bhuwan Sharma`, `Rajiv Hassan`, `Khushant Chhetri`

## Rules
- Keep body concise — 1-3 sentences
- Always include category, program, and at least one tag
- Never remove or modify existing entries
- If unsure about a date, ask
- Check for duplicate entries before adding
- Maintain chronological order in the file
