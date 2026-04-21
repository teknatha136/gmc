# HLD · `<System Name>` · v<0.1>

> **High-Level Design** · How the system is structured — the blueprint an architect would draw on a whiteboard. Written after requirements are stable, before detailed design. Audience: engineering leads, architects, senior engineers, security/ops reviewers.
> Target length: 10–25 pages. Concepts and boxes, not code.

---

## § 01 · Metadata

| Field | Value |
|---|---|
| **Title** | `<System / module · vN>` |
| **Status** | Draft / Review / Approved / Implemented |
| **Version** | `0.1` |
| **Author(s)** | `<Architect · Tech Lead>` |
| **Reviewers** | Architecture Review Board · Security · SRE · Dev Lead |
| **Last updated** | `YYYY-MM-DD` |
| **Related specs** | `<PRD · SRS · feature-spec links>` |

## § 02 · Purpose & Scope

- **What this HLD covers:** `<system / module in scope>`
- **What it does NOT cover:** `<out of scope>`
- **Intended readers:** `<roles>`

## § 03 · Context

### 3.1 · System Context Diagram
A single diagram showing this system as one box, with all external actors and systems connected by labelled arrows (C4 Level 1).

```
[ Mobile user ] --> (This System) --> [ Payment GW ]
                         |
                   [ Identity Svc ]
                         |
                   [ Data Warehouse ]
```

### 3.2 · Actors & External Systems
| Actor / System | Responsibility | Interaction |
|---|---|---|
| `<Mobile user>` | End user on iOS/Android | HTTPS + JWT |
| `<Payment Gateway>` | Executes money movement | REST + webhook callback |
| `<Identity Service>` | Authenticates users | OIDC |

## § 04 · Quality Attributes (Architecturally Significant NFRs)

These are the NFRs that **drive architecture choices**. Each links to a requirement and a trade-off made.

| Attribute | Target | Architectural implication |
|---|---|---|
| Availability | 99.95% | Multi-AZ active-active; no single DB primary |
| Latency | p95 < 250 ms | Read replica + cache layer |
| Throughput | 5k TPS peak | Horizontal scaling + queue-based workload |
| Security | PCI-DSS scoped | Tokenisation at edge; card data never stored in app |
| Data residency | BTN only | Region-pinned deployment |

## § 05 · Architectural Style & Principles

- **Style:** `<monolith · modular monolith · microservices · event-driven · serverless>` — and why.
- **Principles we hold:** `<e.g. API-first · strong consistency at boundaries · async where possible · idempotent writes>`
- **Explicitly rejected styles:** `<and why, briefly>`

## § 06 · Container / Component Diagram (C4 Level 2)

Show the major deployable units. Each box is a service, app, or datastore.

```
┌──────────────┐   ┌─────────────┐   ┌─────────────┐
│  Mobile App  │──▶│  API GW     │──▶│ Auth Svc    │
└──────────────┘   └─────┬───────┘   └─────────────┘
                         ▼
                  ┌─────────────┐   ┌──────────────┐
                  │ Payments Svc│──▶│ Ledger DB    │
                  └─────┬───────┘   └──────────────┘
                        ▼
                  ┌─────────────┐
                  │  Event Bus  │
                  └─────────────┘
```

### 6.1 · Component Summary

| Component | Purpose | Tech | Owner |
|---|---|---|---|
| API Gateway | Entry point · auth enforcement · rate limit | Kong / Envoy | Platform |
| Auth Service | OIDC issuer · token refresh | Node.js + Postgres | Platform |
| Payments Service | Transaction orchestration | Java + Kafka | Payments |
| Ledger DB | Source of truth for money movement | Postgres | Payments |
| Event Bus | Async messaging | Kafka | Platform |

## § 07 · Data Architecture

### 7.1 · Logical Data Model
Key entities and relationships at the conceptual level (not table definitions — that's LLD).

```
User ─1──* Account ─1──* Transaction ─*──1 Biller
```

### 7.2 · Data Stores
| Store | Purpose | Tech | Consistency model |
|---|---|---|---|
| Ledger | Transactions, balances | Postgres | Strong · serializable |
| User profile | Profile, preferences | Postgres | Strong |
| Session | Active sessions | Redis | Eventual · TTL |
| Event log | Audit + replay | Kafka (retained 30d) + S3 (archive) | Durable |

### 7.3 · Data Flow
Describe the major data flows (read path, write path, batch path).

### 7.4 · Data Retention & Residency
- `<PII retention>` — `<duration · regulation>`
- `<transactional data>` — `<duration · regulation>`
- `<region pinning>` — `<which data stays where>`

## § 08 · Integration Architecture

### 8.1 · Integration Style per Partner
| Partner | Pattern | Protocol | Idempotency | Retry | SLA |
|---|---|---|---|---|---|
| Payment GW | Request/response + webhook | HTTPS REST | `Idempotency-Key` header | Exp backoff, 3x | 99.9%, p95 2s |
| Identity | Request/response | OIDC / HTTPS | N/A | Fail fast | 99.95% |
| Data Warehouse | Batch ETL | SFTP CSV nightly | File-level checksum | Re-ingest | T+1 day |

### 8.2 · API Style
- `<REST / gRPC / GraphQL / event-driven>` — per surface, with rationale.
- **Versioning strategy:** `<URI · header · semver>`

## § 09 · Security Architecture

- **AuthN:** `<OIDC flow · token lifetime · refresh>`
- **AuthZ:** `<RBAC · ABAC · scopes>`
- **Network:** `<VPC · private subnets · zero-trust>`
- **Data protection:** `<at rest · in transit · key mgmt · KMS>`
- **Secrets:** `<vault · rotation>`
- **Audit logging:** `<what · where · retention>`
- **Threat model summary:** `<STRIDE top findings · link to full doc>`

## § 10 · Deployment Architecture

### 10.1 · Environments
| Environment | Purpose | Data | Access |
|---|---|---|---|
| Dev | Local + shared dev | Synthetic | Developers |
| Staging | Pre-prod validation | Anonymised prod subset | QA + select devs |
| Prod | Live | Real | On-call + deploys only |

### 10.2 · Topology
- **Regions:** `<primary · secondary · DR strategy>`
- **Zones:** `<AZ layout · active-active vs active-passive>`
- **Orchestration:** `<Kubernetes · ECS · serverless>`
- **CDN / Edge:** `<provider · caching strategy>`

### 10.3 · Deployment Strategy
- **CI/CD:** `<pipeline stages · gates>`
- **Release pattern:** `<blue/green · canary · rolling>`
- **Feature flags:** `<provider · gating strategy>`
- **Rollback:** `<automated trigger · procedure>`

## § 11 · Observability

- **Metrics:** `<Prometheus · CloudWatch · golden signals per service>`
- **Logs:** `<structured · correlation IDs · retention>`
- **Traces:** `<OpenTelemetry · sampling · sinks>`
- **Alerts:** `<SLO-based · on-call routing · runbook links>`
- **Dashboards:** `<links to primary dashboards>`

## § 12 · Reliability & Resilience

- **Failure modes considered:** `<node down · AZ down · dependency degradation · data corruption>`
- **Blast radius analysis:** `<max impact of any one failure>`
- **Circuit breakers · bulkheads · timeouts:** `<where and why>`
- **DR strategy:** `<RPO · RTO · runbook location>`
- **Backup strategy:** `<what · frequency · test cadence>`

## § 13 · Cross-Cutting Concerns

- **Internationalisation:** `<languages · locales · RTL>`
- **Accessibility:** `<WCAG level · testing approach>`
- **Performance budgets:** `<per-page / per-endpoint>`
- **Cost model:** `<estimated monthly · per-transaction>`
- **Compliance posture:** `<standards targeted>`

## § 14 · Key Architectural Decisions (ADR Summary)

Link out to individual ADRs. Summarise each in one line.

| ADR | Decision | Date | Status |
|---|---|---|---|
| ADR-001 | Adopt modular monolith over microservices for MVP | `<date>` | Accepted |
| ADR-002 | Use Postgres + event log instead of CQRS | `<date>` | Accepted |
| ADR-003 | Kong as API gateway | `<date>` | Superseded by ADR-014 |

## § 15 · Trade-offs & Alternatives Considered

For each **significant** decision: what we chose, what we rejected, and the cost of being wrong.

- **Chose:** `<option A>`
- **Rejected:** `<option B>` because `<reason>`
- **If we're wrong:** `<what breaks · how we'd recover>`

## § 16 · Open Questions

| Question | Owner | Blocking? | Deadline |
|---|---|---|---|
| `<to be resolved>` | `<name>` | Y/N | `<date>` |

## § 17 · Out of Scope

- `<feature deferred to v2>`
- `<integration to a future partner>`
- `<geographic expansion>`

---

## Changelog

- `v0.1` · initial draft · `<author>` · `YYYY-MM-DD`
- `v0.5` · ARB feedback folded · `YYYY-MM-DD`
- `v1.0` · approved by ARB · `YYYY-MM-DD`
