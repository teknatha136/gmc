# Feature Spec · `<Feature Name>` · v<0.1>

> **Template** · Feature-level, sprint-sized. Target length: 2–5 pages. A mid-level engineer should be able to read this end-to-end in under 20 minutes and start coding.
> **How to use:** fill in every section. If a section genuinely doesn't apply, write "N/A — <reason>" rather than deleting it.

---

## § 01 · Metadata

| Field | Value |
|---|---|
| **Title** | `<Feature name · product · vN>` |
| **Status** | Draft / Review / Approved / Implemented / Archived |
| **Version** | `0.1` |
| **Author(s)** | `<name>` |
| **Reviewers** | Dev lead · QA lead · Design lead · Stakeholder |
| **Last updated** | `YYYY-MM-DD` |
| **Ticket / epic** | `<JIRA-123 / LIN-456>` |

## § 02 · TL;DR

Two or three sentences. What are we building, for whom, why, by when? Dense, specific, numbers where possible.

> Example: *"We let mBoB users save up to 10 repeat billers as favourites on the Bill Payments home. Solves 36-per-year re-entry problem for 62% of users. Ships v1 end of May."*

## § 03 · Problem Statement

One tight paragraph. Whose pain · how big · evidence · why now.

- **User segment:** `<who>`
- **Pain:** `<what hurts, concretely>`
- **Scale:** `<frequency, volume, cost>`
- **Evidence:** `<analytics / support tickets / research>`
- **Why now:** `<trigger>`

> ⚠️ **Don't describe the solution here.** "Users need favourites" is wrong. "Users re-type account numbers 36×/year" is right.

## § 04 · Goals & Non-goals

### Goals (measurable)
- `<outcome 1 · metric · target>`
- `<outcome 2 · metric · target>`
- `<outcome 3 · metric · target>`

### Non-goals (explicit)
- Not: `<adjacent idea a stakeholder may assume>`
- Not: `<scope boundary>`
- Not: `<out-of-bounds capability>`

## § 05 · Users & Personas

Name **2–4 concrete personas**. Real details — location, age, context, constraints.

### Primary — `<Name>`
- `<context · age · location · role>`
- `<what they want · what they'll tolerate · what frustrates them>`

### Secondary — `<Name>`
- `<context>`
- `<different needs / constraints>`

### Edge — `<Name>`
- `<context>`
- `<extreme constraint — device, network, language, accessibility>`

## § 06 · Functional Requirements

Numbered list. Each is one user-visible behaviour. Format: "As a X, I want Y, so that Z".

- **FR-01** · `<verb-noun summary>` — As a `<persona>`, I want to `<action>`, so that `<outcome>`.
- **FR-02** · ...
- **FR-03** · ...

> If a single FR needs more than a sentence, split it into two.

## § 07 · Acceptance Criteria

Every FR gets 1–3 AC in **Given / When / Then** form. At least one edge case per FR.

### AC-01 · `<short label>`
- **Given** `<precondition>`
- **When** `<action>`
- **Then** `<observable outcome with a number>`

### AC-02 · `<edge case label>`
- **Given** `<edge precondition>`
- **When** `<action>`
- **Then** `<outcome>`

### AC-03 · ...

> Each Then must be **specific, observable, testable**. No adjectives ("fast", "easy", "clear") that a QA can't pass or fail.

## § 08 · Non-Functional Requirements

Only NFRs that apply to **this feature**. Use numbers, not adjectives.

| Category | Requirement |
|---|---|
| **Performance** | `<e.g. p95 render < 1s on 4G>` |
| **Security** | `<e.g. scoped to logged-in user · no cross-account leakage>` |
| **Reliability** | `<e.g. offline save queues locally · syncs when online · never drops>` |
| **Accessibility** | `<e.g. WCAG AA · screen-reader labels · colour-independent cues>` |
| **Scalability** | `<e.g. 10k concurrent users without degradation>` |
| **Compatibility** | `<e.g. iOS 14+ · Android 9+>` |

> ⚠️ **The sin here is silence.** If you don't name an NFR, it doesn't exist as a requirement.

## § 09 · UX & UI

- **Entry point:** `<where user first sees this>`
- **Primary screen:** `<main UI surface>`
- **Secondary flows:** `<list>`
- **States to cover:** empty · populated · loading · error · offline · disabled
- **Design file:** `<Figma link · frame name>`

> Every state you forget becomes a bug in QA.

## § 10 · Data Model

Sketch new or changed entities. Field name · type · constraints · relationships.

```
EntityName {
  id:          uuid (pk)
  userId:      fk → users.id
  someField:   string (optional, max 30)
  createdAt:   timestamp
  updatedAt:   timestamp
}
```

- **Volume:** `<expected rows / user · total>`
- **Limits:** `<max per user · enforced at app/db layer>`
- **Migration:** `<new table / altered table / backfill needed?>`

## § 11 · Dependencies, Risks, Open Questions

### Dependencies
- `<upstream API / service / team>`
- `<design handoff>`
- `<library / SDK>`

### Risks
- `<what could go wrong · likelihood · mitigation>`

### Open Questions
- `<unresolved decision>` — Owner: `<name>` — Deadline: `<date>`

## § 12 · Out of Scope (v1)

Explicit "we are NOT doing this" list. Each line potentially prevents a week of rework.

- `<adjacent feature a stakeholder may expect>`
- `<advanced capability for v2>`
- `<legacy platform support>`
- `<bulk / admin / power-user affordances>`

---

## Changelog

- `v0.1` · initial draft · `<author>` · `YYYY-MM-DD`
- `v0.5` · added NFRs, refined AC · `<author>` · `YYYY-MM-DD`
- `v1.0` · approved · `YYYY-MM-DD`

---

## Spec Author's Pre-Review Checklist

Tick before marking **Ready for Review**:

- [ ] Metadata block complete (title, status, version, author, reviewers, date, ticket)
- [ ] TL;DR is 2–3 sentences and stands alone
- [ ] Problem names whose pain · how big · with evidence (not the solution)
- [ ] Goals are measurable; non-goals are explicit
- [ ] 2–4 named personas with concrete details
- [ ] Functional requirements numbered (FR-01, FR-02…)
- [ ] Acceptance criteria in Given/When/Then; ≥1 edge per FR
- [ ] NFRs named in numbers, not adjectives
- [ ] UX/UI names every state (incl. error, loading, offline)
- [ ] Data model sketched — entities, fields, volumes, constraints
- [ ] Dependencies, risks, open questions each listed separately
- [ ] Out of scope is explicit and specific
- [ ] A mid-level engineer could start coding after reading this
- [ ] Reads end-to-end in < 20 minutes
- [ ] No adjectives a QA can't test ("fast", "intuitive", "user-friendly")
- [ ] Changelog present
