# Notes App — Dev 09 · 10 · 11

A working demo for the SELISE × Pelsung Dev classes on **Routing**, **APIs**, and **Forms**.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## What's inside

```
src/
├── main.tsx              # BrowserRouter + Routes — the routing block
├── layout.tsx            # Outlet + NavLink shared header
├── hooks/
│   └── use-fetch.ts      # The 3-state pattern wrapped in a custom hook
├── lib/
│   └── api.ts            # All fetch calls: GET, POST, DELETE
├── schemas/
│   └── note.ts           # zod schema → also the TS type
└── pages/
    ├── home.tsx          # Landing page
    ├── notes-list.tsx    # GET /posts → list view (loading / error / data)
    ├── note-detail.tsx   # GET /posts/:id → single note (uses useParams)
    ├── note-new.tsx      # react-hook-form + zod → POST → useNavigate
    └── about.tsx         # A second static route, for the at-home exercise
```

## What to demo (slide 40 in the deck)

1. Visit `/notes` — watch the loading skeleton flash, then the list appear.
2. Click into `/notes/1` — URL changes, no page reload, detail page fetches.
3. Hit `/notes/new` — submit empty form — see zod errors per field.
4. Fill in valid title + body — click Save — watch POST in DevTools — redirect happens.

## A note about JSONPlaceholder

JSONPlaceholder pretends to support POST and DELETE: it returns a successful response with a fake `id` (101 for new posts), but it doesn't actually persist anything. To keep the demo clean:

- After POST, we navigate to `/notes/${id}` AND pass the created note via React Router's `location.state`. The detail page uses that state to render — so trainees see "their" note appear.
- Refreshing on `/notes/101` falls back to fetching from JSONPlaceholder, which 404s → the error state of the 3-state pattern shows up. Use this as a teaching moment: "in a real backend, this would still load."

## Homework prompts

See `pelsung/curriculum/dev/09-routing-apis-forms-tour-notes.html` — there's an exercises section near the end. The starter codebase (this app) is the place to do them.
