---
name: lesson-materials
description: Create Pelsung training materials — slides, trainer guide, and trainee notes — in SELISE×Pelsung brand style. Use this skill whenever Bhuwan or Tek wants to prepare for a class, create lesson content, build slides, or make teaching materials for any Pelsung session (foundation, dev, design, testing, or BA phase). Trigger on phrases like "prepare class", "create materials for class", "build slides for", "lesson for [topic]", "notes for class", "trainer guide", or any mention of a specific class number or topic that needs teaching materials. Always use this skill even if the user just says "make the slides for class 5" or "prepare for tomorrow's session".
---

Create three branded HTML teaching-material files for a Pelsung class session by first interviewing the user, then generating all three files together.

## What gets created

For each class session, generate three files saved to `pelsung/curriculum/{phase}/`:

| File | Purpose | Audience |
|------|---------|----------|
| `{mmm-dd}-slides.html` | Interactive keyboard-navigable presentation | Projected in class |
| `{mmm-dd}-{topic-slug}.html` | Trainer guide — timing, content, exercises, tips | Trainer only |
| `{mmm-dd}-notes.html` | Take-home reference sheet | Trainees |

`{phase}` is `foundation`, `dev`, `design`, `testing`, or `ba`. Default to `foundation` for classes 01–11.

---

## Step 1 — Understand the request

Parse the user's message for:
- **Class number(s)** — e.g., "Class 04" or "Classes 02 & 03"
- **Topic title** — e.g., "How the Internet Works"
- **Date** — e.g., "Apr 14". If missing, ask.
- **Phase** — infer from class number (01–11 = foundation) or ask.

If the user didn't provide the class title, read `pelsung/curriculum/course-plan.html` to look up the class number's title and subtopics.

---

## Step 2 — Interview the user

Once you know the basics, conduct a focused interview to gather the actual content. Keep it conversational — one round of questions at a time, not a wall of questions all at once.

**Ask in this order (across 2–3 conversational turns):**

**Turn A — timing and structure:**
- What time does the session start and end? Any breaks?
- If multiple classes in one day, how is time split? (e.g., 1.5h Professional Skills, then 1h AI Basics)

**Turn B — content per topic:**
For each topic/section:
- What are the 3–5 key points trainees should leave knowing?
- Any specific examples, analogies, or Bhutan/GMC references you want to use?
- Any hands-on activity or exercise planned? (describe it briefly)
- Anything trainers should watch out for or extra notes?

**Turn C — confirm outline:**
Show a brief outline of the session structure (topics, timing, key points per section, exercises) and ask: *"Does this look right? Anything to add or change before I generate the files?"*

Only start generating after the user confirms.

---

## Step 3 — Generate all three files

Generate all three files in a single response. Write complete, working HTML — no placeholders. Save each to the correct path.

### Design system (use exactly — all three files share this)

```css
/* Fonts — per SELISE Brand Guidelines */
/* Load Open Sans from Google Fonts; Bahnschrift is a system font (Windows) */
Open Sans (body, UI), Bahnschrift (headings, display text)
https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap

/* Font stacks */
--font-heading: 'Bahnschrift', 'Segoe UI', sans-serif;
--font-body:    'Open Sans', 'Aptos', sans-serif;
--font-code:    'Courier New', monospace;

/* SELISE Brand Colors (from official SELISE Brand Book) */
--blue:   #0066B2   /* SELISE Blue — primary brand color */
--indigo: #001F35   /* Oxford Blue — deep accent */
--amber:  #247EC1   /* SELISE Blue 80% — secondary accent */
--green:  #7BC950   /* Lime Green — positive/success (use sparingly) */
--purple: #4796D1   /* SELISE Blue 60% — tertiary accent */
--red:    #D80032   /* Crimson — warnings/errors */
--text:   #1B2021   /* Eerie Black — primary text */
--muted:  #7B7C7F   /* Globe Grey — secondary text */
--faint:  #9CA3AF
--surf:   #FFFFFF
--bg:     #F9F9F9
--border: #EDEDED

/* SELISE Blue Shade Ramp (for tints/shades) */
/* 100%: #0066B2 | 80%: #247EC1 | 60%: #4796D1 | 40%: #6BAEE0 | 20%: #7DBAE8 | 10%: #8EC6F0 */

/* Official SELISE Gradients */
--gradient-dark:  linear-gradient(135deg, #0067A3, #002D72)  /* Hero sections, accent bars, footers */
--gradient-mid:   linear-gradient(135deg, #5BAEFF, #0073C6)  /* Banners, CTAs */
--gradient-light: linear-gradient(135deg, #F9F9F9, #EDEDED)  /* Subtle backgrounds */

/* Signature accent bar (top of pages + progress bars) — use Dark Gradient */
linear-gradient(135deg, #0067A3, #002D72)
```

### SELISE Logo placement (MANDATORY on all materials)

Logo files are in `selise-brand/assets/`:
- `SELISE_Logo_Primary_Small.png` — color logo for light backgrounds
- `SELISE_Logo_Reversed.png` — white logo for dark backgrounds

**Rules (from SELISE Brand Book):**
- Logo on every page/slide — top-left, top-right, or bottom-centered
- Slides: small watermark (opacity 0.4) on content slides; prominent on title slide
- Documents: logo in hero section + footer
- Use reversed (white) version on dark backgrounds
- Relative paths from curriculum files: `../../../selise-brand/assets/` (foundation) or `../../selise-brand/assets/` (curriculum root)

### Color usage rules (from SELISE Brand Book)

**Do:** Use blues, greys, blacks, whites, and occasionally greens.
**Don't:** Use bright colors (red, purple, orange) beyond the brand palette.
**Ratio:** 60% primary / 30% secondary / 10% accent (6:3:1 rule).

Reference existing files for design fidelity — read them if you need to check a specific component:
- Slides: `pelsung/curriculum/foundation/apr10-slides.html`
- Trainer guide: `pelsung/curriculum/foundation/apr10-professional-skills-ai-basics.html`
- Notes: `pelsung/curriculum/foundation/apr-10-notes.html`

---

### File A: Slides (`{mmm-dd}-slides.html`)

A full-screen keyboard-navigable HTML presentation. See `apr10-slides.html` for the full shell (CSS, navigation JS, progress bar). Replicate the shell exactly — just change the slide content.

**Slide structure and types to use:**

```
Slide 1  — Title slide (bg-dark or bg-blue)
           Date badge, class number badge, topic title (DM Serif Display, large)
           Two topic-tag chips if covering multiple subjects

Slide 2  — Agenda (light bg)
           Agenda rows with time, icon, topic name, duration
           Clickable rows that jump to that section

Slide 3+ — Section intro slide (bg-blue/indigo/amber/green — one per major section)
           Eyebrow text + big heading

Slides   — Content slides (white or bg-subtle)
per       One concept per slide. Use: bullet reveals, 2-col grids, card grids,
topic     comparison tables, code blocks, analogy diagrams as appropriate.
           Every slide has a .slide-label top-left with number + name.

Last     — Wrap-up slide (bg-indigo or bg-dark)
slide      "Key takeaways" or "What we covered today" + next class preview
```

**Slide shell requirements:**
- `#deck` container, `.slide` elements with `data-slide="N"` attributes
- Arrow key navigation + clickable nav buttons at bottom
- Progress bar at bottom: width = (current/total)*100%
- Fullscreen toggle button top-right
- Transition: opacity + translateX slide-out/in (0.35s ease)
- Top accent bar per slide (`.slide::before`, 5px height, solid color or gradient)

**Content guidelines for slides:**
- One idea per slide — don't crowd
- Use real, concrete examples. For Bhutanese context: internet access in Gelephu/Thimphu, WhatsApp/Facebook as familiar apps, SELISE products, GMC construction
- Reveal lists (`.reveal-list`) for bullet points that appear on click — keeps audience engaged
- Interactive elements where they add value (clickable matrices, hover effects)

---

### File B: Trainer Guide (`{mmm-dd}-{slug}.html`)

A scrollable HTML document the trainer uses during class. See `apr10-professional-skills-ai-basics.html` for reference.

**Structure:**

```
Hero section
  - Badge: "TRAINER GUIDE · CLASS {N}"
  - Title: the class topic(s) with brand colors
  - Subtitle: date, phase, duration
  - Stats row: total time | number of sections | number of exercises

Timeline bar
  - Visual strip showing all session segments with times
  - Color-coded by topic (blue = topic 1, indigo = topic 2, amber = exercise, green = break)

Content sections (one per topic)
  Section header: pill badge, section title, time allocation
  Objectives: chips showing learning outcomes
  Content blocks (.block with colored left border):
    - Teaching points with explanations
    - "Trainer tip" callouts (subtle background, italicized, ⚡ icon)
    - Discussion prompts ("Ask the class: …")
    - Common misconceptions to address
  Exercise blocks (amber border, ✍ icon):
    - Exercise title + duration
    - Step-by-step instructions
    - What to watch for / how to debrief

Closing section
  - Key messages to reinforce
  - How to assess understanding (exit ticket, show of hands, etc.)
  - What to tell trainees about next class
```

---

### File C: Trainee Notes (`{mmm-dd}-notes.html`)

A clean take-home reference the trainee reads after class. See `apr-10-notes.html` for reference.

**Structure:**

```
Hero
  - Badge: "CLASS {N} · {DATE}"
  - Title: topic(s) in brand colors
  - Subtitle: 1-sentence description of what the class covered
  - Topic tags (colored chips for each subtopic)
  - Quick-nav links to each section

Content sections (one per topic)
  - Section intro: what it is, why it matters
  - Key concepts: clean definitions, visual diagrams where helpful
  - Examples: 2–3 concrete examples, Bhutan-relevant where possible
  - Summary box: 3–5 bullet takeaways at end of each section

Exercises / practice prompts (if any were done in class — for trainees to redo at home)

"Further reading" section (optional — only if there are genuinely useful links)

Footer: SELISE × Pelsung branding, class date
```

**Tone for notes:** Clear, conversational, accessible. These trainees may be reading in a second language — avoid jargon, use short sentences, explain terms when first used.

---

## Step 4 — After generating

Tell the user:
- Where the three files are saved
- How to open them (just open in browser)
- Offer to adjust anything specific ("want me to add more slides on X, or change the timing?")

Log the class creation to `timeline.yaml` using the `/timeline` skill format if it feels right (ask first — don't auto-log).
