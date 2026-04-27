# BRD · `<Initiative Name>` · v<0.1>

> **Business Requirements Document** · The *why* and *what* — never the *how*.
> Audience: business stakeholders, sponsors, steering committee, leadership.
> Written **before** solution design. A BRD is solution-agnostic; it doesn't say "web app" or "mobile feature" — it says "capability needed".
> Target length: 10–25 pages.

---

## § 01 · Metadata

| Field | Value |
|---|---|
| **Initiative name** | `<business-friendly name>` |
| **Status** | Draft / Review / Approved / Closed |
| **Version** | `0.1` |
| **Author(s)** | `<BA · Program Manager>` |
| **Sponsor** | `<exec owner>` |
| **Reviewers / sign-off** | `<business stakeholders — named>` |
| **Date initiated** | `YYYY-MM-DD` |
| **Target decision date** | `YYYY-MM-DD` |
| **Related documents** | `<links to PRD · SRS · prior BRDs>` |

## § 02 · Executive Summary

Two or three paragraphs. A senior leader should read only this and know whether to approve.

1. **Business situation** — what has changed or is broken.
2. **What we propose to do** — the capability needed, in business language.
3. **Expected outcome** — business value, in numbers where possible.

## § 03 · Business Context & Background

- **Current state of the business:** `<relevant operational context>`
- **What triggered this request:** `<market event, regulation, competitor, internal incident, leadership ask>`
- **Prior related work:** `<previous initiatives that touched this area>`
- **Strategic alignment:** `<which corporate goal / OKR / pillar this serves>`

## § 04 · Business Problem Statement

One crisp paragraph. Avoid naming any solution.

- **Problem:** `<what is broken or missing — in business terms>`
- **Who is affected:** `<business units · customer segments · partners>`
- **Impact today:** `<quantified — revenue lost · hours wasted · customer churn · compliance risk · NPS>`
- **Cost of doing nothing:** `<projected impact if we don't act>`

> **Rule:** if your problem statement mentions a system, app, or feature, rewrite it. Describe the business pain, not a solution.

## § 05 · Business Objectives

Numbered, measurable, time-bound.

- **BO-01** · `<objective · metric · target · timeframe>`
- **BO-02** · `<objective · metric · target · timeframe>`
- **BO-03** · `<objective · metric · target · timeframe>`

## § 06 · Business Requirements

Numbered capabilities the business needs. **Do not describe implementation.**

- **BR-01** · The business needs the ability to `<capability>` so that `<business outcome>`.
- **BR-02** · The business needs to comply with `<regulation>` by `<date>`.
- **BR-03** · The business needs to reduce `<cost / time / error>` by `<target>`.

Every BR must trace forward to one or more functional requirements in the SRS / PRD / feature specs.

## § 07 · Stakeholders

| Stakeholder | Role | Interest | Influence | Engagement |
|---|---|---|---|---|
| `<name>` | Sponsor | H | H | Informed weekly |
| `<name>` | End-user group lead | H | M | Consulted fortnightly |
| `<name>` | Compliance | M | H | Signs off |
| `<name>` | Support team | H | L | Informed at key milestones |

> Use **RACI** (Responsible / Accountable / Consulted / Informed) for task-level. Use this matrix for initiative-level overview.

## § 08 · Current Process (As-Is)

Describe the current process in prose or a simple flow. Highlight pain points.

1. `<step 1>` — (pain: `<what hurts here>`)
2. `<step 2>`
3. `<step 3>` — (pain: `<what hurts here>`)
4. `<outcome today>`

## § 09 · Future Process (To-Be)

Describe the desired future-state process. Still in business terms.

1. `<step 1>` — (improvement: `<what changes>`)
2. `<step 2>`
3. `<outcome after>`

**Benefits vs current state:**
- `<faster · cheaper · more accurate · compliant · safer>`

## § 10 · Assumptions

Things we're taking as true for this BRD to hold.

- `<regulation X will not change before Q3>`
- `<team Y will have capacity starting <date>>`
- `<vendor Z remains our partner of record>`

## § 11 · Constraints

Fixed, non-negotiable boundaries.

- **Budget:** `<BTN / USD cap>`
- **Timeline:** `<must be live by <date>>`
- **Regulatory:** `<must comply with X by Y>`
- **Technology:** `<must stay within existing tech estate>`
- **Geography / language:** `<markets · locales required>`

## § 12 · Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| `<regulatory approval delayed>` | M | H | `<early engagement with regulator>` | `<Legal>` |
| `<key vendor fails>` | L | H | `<backup vendor shortlisted>` | `<Procurement>` |

## § 13 · Success Metrics

How the business will know this initiative delivered value.

| Metric | Baseline | Target | Measurement method | Owner | Review date |
|---|---|---|---|---|---|
| `<revenue>` | `<today>` | `<target>` | `<source>` | `<name>` | `<date>` |
| `<processing time>` | `<today>` | `<target>` | `<source>` | `<name>` | `<date>` |
| `<error rate>` | `<today>` | `<target>` | `<source>` | `<name>` | `<date>` |

## § 14 · Cost-Benefit Overview

### Expected Costs
- Build: `<engineering effort · external cost>`
- Run: `<ongoing licences · support · hosting>`
- Change management: `<training · comms>`

### Expected Benefits
- **Quantified:** `<revenue uplift · cost savings · risk reduction in BTN/year>`
- **Qualitative:** `<brand · morale · strategic optionality>`

### Payback
- **Break-even:** `<month / year>`
- **3-year NPV:** `<if modelled>`

## § 15 · Out of Scope

Explicit. Each item is a defence against scope creep.

- `<adjacent initiative>`
- `<geography not covered>`
- `<user group not served in v1>`

## § 16 · Approvals

| Role | Name | Decision | Date |
|---|---|---|---|
| Business Sponsor | | Approve / Reject / Revise | |
| Finance | | | |
| Compliance / Legal | | | |
| Head of Affected Business Unit | | | |
| Program Management | | | |

---

## Appendix A · Traceability (forward)

Each BR traces to one or more downstream artifacts.

| BR | PRD / SRS Section | Feature Spec | Priority |
|---|---|---|---|
| BR-01 | PRD § 5 · Goal 1 | `<feature name>` | P0 |
| BR-02 | SRS § 3.3.5 | — | P0 |

## Appendix B · Glossary

| Term | Meaning |
|---|---|
| `<business term>` | `<definition>` |

---

## Changelog

- `v0.1` · initial draft · `YYYY-MM-DD`
- `v0.5` · stakeholder feedback folded · `YYYY-MM-DD`
- `v1.0` · approved · `YYYY-MM-DD`
