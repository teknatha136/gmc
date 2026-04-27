# PRD · `<Product Area / Release Name>` · v<0.1>

> **Template** · Product Requirements Document. Larger than a feature spec: multiple features, a release, a product area. Target length: 10–30 pages. Written for cross-functional alignment (Product, Eng, Design, QA, Support, GTM).

---

## § 01 · Metadata

| Field | Value |
|---|---|
| **Title** | `<Product area · release · quarter>` |
| **Status** | Draft / Review / Approved / Shipped / Archived |
| **Version** | `0.1` |
| **Author(s)** | `<PM · BA>` |
| **Reviewers** | Eng Lead · Design Lead · QA Lead · Support · GTM · Exec Sponsor |
| **Last updated** | `YYYY-MM-DD` |
| **Target release** | `<quarter / date>` |
| **Epic / initiative** | `<link>` |

## § 02 · Executive Summary

Three paragraphs max.

1. **What** — what we're shipping, in one sentence.
2. **Why** — the strategic reason, tied to a company / product goal.
3. **How we'll know it worked** — the one or two metrics that matter most.

## § 03 · Context & Background

- **Where this fits in the product strategy:** `<reference roadmap / OKR>`
- **What came before this:** `<prior attempts, related work, market moves>`
- **Current state:** `<baseline metrics, current user behaviour>`

## § 04 · Problem & Opportunity

### Problem
- **Users affected:** `<segment · size>`
- **Pain:** `<concrete, quantified>`
- **Evidence:** `<research · analytics · support · interviews>`
- **Cost of inaction:** `<what happens if we don't do this>`

### Opportunity
- **Size:** `<TAM / addressable users · revenue estimate>`
- **Window:** `<why now — market trigger, competitor move, regulation>`

## § 05 · Goals, Non-goals, Success Metrics

### Goals
Ordered by priority.
1. `<P0 goal — metric · target>`
2. `<P1 goal — metric · target>`
3. `<P2 goal — metric · target>`

### Non-goals
Explicit scope cuts. What we chose NOT to solve in this release.
- Not: `<adjacent problem>`
- Not: `<stakeholder-assumed capability>`

### Success Metrics
| Metric | Baseline | Target | Timeframe | Owner |
|---|---|---|---|---|
| North-star | `<current>` | `<target>` | 3 months post-launch | `<PM>` |
| Input metric 1 | `<current>` | `<target>` | Launch week | `<PM>` |
| Guardrail (don't regress) | `<current>` | `≥ current` | Always | `<Eng Lead>` |

## § 06 · Users & Personas

Detailed personas — more depth than a feature spec. Include jobs-to-be-done.

### Primary — `<Name>`
- **Context:** `<who they are · environment>`
- **Job to be done:** `<what they're trying to accomplish>`
- **Current workaround:** `<what they do today>`
- **Success for them:** `<how life improves post-launch>`

### Secondary — `<Name>`
- ...

### Edge / Anti-persona
- **Who this is NOT for:** `<explicit>` — helps reviewers calibrate scope.

## § 07 · User Journeys

Describe 2–4 end-to-end user journeys post-launch. Before/after preferred.

### Journey 1 — `<name>`
1. `<step 1>`
2. `<step 2>`
3. `<step 3>`
4. `<outcome>`

**Before:** `<current flow · pain points>`
**After:** `<new flow · improvements>`

## § 08 · Scope · Features in This Release

High-level list. Each feature links to its own feature spec.

| # | Feature | Priority | Owner | Spec Link |
|---|---|---|---|---|
| F1 | `<name>` | P0 | `<PM>` | `<link>` |
| F2 | `<name>` | P0 | `<PM>` | `<link>` |
| F3 | `<name>` | P1 | `<PM>` | `<link>` |

## § 09 · Requirements (High-Level)

Don't repeat each feature spec here. Capture **cross-feature requirements** and release-level constraints.

### Functional (cross-cutting)
- `<requirement that spans multiple features>`

### Non-Functional (release-level)
- **Performance:** `<e.g. p95 API response ≤ 300 ms across all new endpoints>`
- **Security:** `<e.g. SOC 2 controls for new data types>`
- **Reliability:** `<e.g. 99.95% uptime>`
- **Accessibility:** `<e.g. WCAG AA across all new surfaces>`
- **Compliance:** `<e.g. GDPR · regional data residency>`

## § 10 · UX Direction

- **Design principles for this release:** `<3–5 bullets>`
- **Key flows mocked:** `<Figma link>`
- **Design system changes needed:** `<components added / modified>`
- **Content / copy owner:** `<name>`

## § 11 · Technical Considerations

High-level. Detailed design lives in HLD/LLD.

- **Architecture changes:** `<new services · data stores · integrations>`
- **Platform decisions:** `<tech stack choices with rationale>`
- **Migration:** `<data · API versioning · rollout strategy>`
- **Build vs buy:** `<third-party components considered>`

## § 12 · Dependencies

| Dependency | Type | Owner | Needed by |
|---|---|---|---|
| `<upstream service>` | Internal | `<team>` | `<date>` |
| `<vendor / SDK>` | External | `<vendor>` | `<date>` |
| `<legal / compliance review>` | Internal | `<Legal>` | `<date>` |

## § 13 · Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| `<what could go wrong>` | H / M / L | H / M / L | `<plan>` | `<name>` |

## § 14 · Open Questions

| Question | Owner | Deadline | Resolution |
|---|---|---|---|
| `<unresolved decision>` | `<name>` | `<date>` | `<once decided>` |

## § 15 · Launch Plan

- **Rollout strategy:** `<dark launch · % rollout · geo · feature flag>`
- **Beta / early access:** `<who · how long>`
- **Launch comms:** `<blog · email · in-app · press>`
- **Support readiness:** `<docs · training · FAQs>`
- **Rollback plan:** `<how to turn it off · trigger criteria>`

## § 16 · Post-Launch Review

When and how we'll evaluate. Calendar the review at the time of the PRD, not after launch.

- **Review date:** `<launch + 4 weeks>`
- **Reviewers:** `<PM · Eng Lead · Exec Sponsor>`
- **What "success" looks like by then:** `<clear go/no-go criteria>`

## § 17 · Out of Scope

Explicit scope cuts for this release. Each is a future candidate.

- `<deferred feature>`
- `<power-user capability for v2>`
- `<admin / configuration surface>`

## § 18 · Appendices (Optional)

- **A. Research findings** — `<link to raw research>`
- **B. Competitive analysis** — `<summary>`
- **C. Financial model** — `<revenue / cost projections>`
- **D. Glossary** — `<domain terms>`

---

## Changelog

- `v0.1` · initial draft · `<author>` · `YYYY-MM-DD`
- `v0.5` · review feedback folded · `<author>` · `YYYY-MM-DD`
- `v1.0` · approved · `YYYY-MM-DD`
