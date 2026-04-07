---
name: note
description: Record a note about a trainee — observations, role suggestions, skills, action items, flags. Use when Tek mentions something about a specific person that should be remembered.
---

Add or update a note about a trainee in `/Users/tek/work/gmc/pelsung/cohort-3/people-notes.yaml`.

## Input
The user provides a natural-language observation about a person. Examples:
- `/note Mark Dawa Zangmo 11702001098 for admin position — fluent in multiple languages. Check if she can drive.`
- `/note Sonam Dorji picks up frontend concepts fast, pair him with slower learners`
- `/note Tshering Pelden was absent 3 days this week, seems disengaged — follow up`
- `/note Karma Wangchuk has prior Python experience, could help with testing automation`

## Steps

1. **Parse the input.** Extract:
   - **Name** — the person being discussed
   - **CID** — if provided (11-digit number)
   - **Observations** — what to record
   - **Action items** — anything that starts with "check", "follow up", "ask", "verify", etc.

2. **Read people-notes.yaml** to see if this person already has entries.

3. **If the person exists**, append a new note to their notes list.

4. **If the person is new**, look them up:
   - Read `/Users/tek/work/gmc/pelsung/cohort-3/cv-review.md` to find their CID, recommended vertical, and any existing notes.
   - If a CID was provided in the input, use that. Otherwise use the one from cv-review.md.

5. **Add the entry** to people-notes.yaml.

## Entry format

For a new person:
```yaml
- name: Full Name
  cid: "11702001098"
  vertical: dev | design | testing | ba | unassigned
  notes:
    - date: YYYY-MM-DD
      text: The observation in clear, concise language
      tags: [relevant-tags]
```

For an existing person (append to their notes list):
```yaml
    - date: YYYY-MM-DD
      text: The observation
      tags: [relevant-tags]
```

## Tags (pick all that apply)
- `role-suggestion` — potential role or position (admin, team lead, presenter, etc.)
- `skill` — notable skill or ability (languages, driving, coding, design, etc.)
- `action-item` — something to check, verify, or follow up on
- `observation` — general behavioral or performance note
- `flag` — concern, risk, or issue to watch
- `strength` — something they're notably good at
- `pairing` — suggestion for peer pairing or mentoring
- `attendance` — absence or attendance pattern

## Rules
- Always use today's date unless the user specifies otherwise
- Keep text concise but preserve the user's intent — don't over-formalize
- If an action item is embedded in the note (e.g., "check if she can drive"), create a separate note entry tagged `action-item` for it
- Never remove or modify existing notes — only append
- CIDs are sensitive — don't expose in logs or summaries shown outside this file
- If you can't identify the person, ask for clarification
- Maintain alphabetical order by name when adding new people
