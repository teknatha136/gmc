# LLD · `<Component / Module Name>` · v<0.1>

> **Low-Level Design** · How a single component is built inside. Written after HLD is stable, before implementation. Audience: the developers who will write the code; reviewers checking correctness and edge cases.
> Target length: 5–20 pages per component. Classes, functions, data structures, algorithms, error handling — concrete enough that two engineers implementing from this would produce near-identical code.

---

## § 01 · Metadata

| Field | Value |
|---|---|
| **Component** | `<service / module / class name>` |
| **Parent HLD** | `<link>` |
| **Status** | Draft / Review / Approved / Implemented |
| **Version** | `0.1` |
| **Author(s)** | `<engineer>` |
| **Reviewers** | Tech Lead · Peer · QA |
| **Last updated** | `YYYY-MM-DD` |
| **Related tickets** | `<JIRA/Linear>` |

## § 02 · Purpose

What this component does. Two or three sentences. Include where it sits in the HLD (reference §6 of HLD).

## § 03 · Responsibilities & Non-Responsibilities

### Responsibilities (this component owns)
- `<capability 1>`
- `<capability 2>`

### Non-responsibilities (delegated / not ours)
- `<capability handled by component X>`
- `<capability handled by component Y>`

## § 04 · Public Interface / API

### 4.1 · Endpoint / Method Signatures

```typescript
// HTTP endpoints
POST   /api/v1/favourites           -> 201 Favourite | 409 LimitReached
GET    /api/v1/favourites           -> 200 Favourite[]
DELETE /api/v1/favourites/{id}      -> 204 | 404
PATCH  /api/v1/favourites/{id}      -> 200 Favourite | 404

// Internal method signatures
createFavourite(userId: UUID, billerId: UUID, alias?: string): Result<Favourite, LimitError | DupError>
listFavourites(userId: UUID): Favourite[]
removeFavourite(userId: UUID, id: UUID): Result<void, NotFoundError>
renameFavourite(userId: UUID, id: UUID, alias: string): Result<Favourite, NotFoundError | ValidationError>
```

### 4.2 · Request / Response Schemas

```json
// POST /api/v1/favourites · request
{
  "billerId": "uuid",
  "alias":    "string, optional, max 30"
}

// POST /api/v1/favourites · response 201
{
  "id":          "uuid",
  "userId":      "uuid",
  "billerId":    "uuid",
  "alias":       "string | null",
  "createdAt":   "ISO-8601",
  "lastUsedAt":  "ISO-8601 | null"
}

// error envelope (shared)
{
  "error": {
    "code":    "LIMIT_REACHED" | "NOT_FOUND" | "VALIDATION",
    "message": "string",
    "details": { ... }
  }
}
```

### 4.3 · HTTP Status Code Contract
| Code | When | Body |
|---|---|---|
| 200 | Successful read/update | Entity |
| 201 | Successful create | Entity |
| 204 | Successful delete | Empty |
| 400 | Validation failure | Error envelope |
| 401 | Missing/invalid token | Error envelope |
| 403 | Valid token, no permission | Error envelope |
| 404 | Entity not found / not owned | Error envelope |
| 409 | Business conflict (limit, dup) | Error envelope |
| 5xx | Internal | Error envelope (no stack) |

## § 05 · Data Model (Physical)

### 5.1 · Schema

```sql
CREATE TABLE favourites (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  biller_id     UUID NOT NULL REFERENCES billers(id),
  alias         VARCHAR(30),
  last_amount   NUMERIC(12,2),
  last_used_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT favourites_user_biller_unique UNIQUE (user_id, biller_id)
);

CREATE INDEX favourites_user_idx ON favourites (user_id, last_used_at DESC);
```

### 5.2 · Constraints & Invariants
- **Max 10 rows per `user_id`** — enforced at application layer (not DB) to allow admin overrides.
- **Unique `(user_id, biller_id)`** — a user cannot favourite the same biller twice.
- **Cascade delete on user deletion** — favourites belong to the user.
- **`alias` is optional; when present, max 30 chars, trimmed.**

### 5.3 · Migration
- **Up:** add `favourites` table (forward migration script path).
- **Down:** `DROP TABLE favourites CASCADE;`
- **Backfill:** none.
- **Data impact:** 0 rows at launch; no existing data affected.

## § 06 · Internal Structure

### 6.1 · Class / Module Diagram

```
FavouritesController  (HTTP adapter)
        │
        ▼
FavouritesService     (business rules, limit enforcement)
        │
        ▼
FavouritesRepository  (DB access, SQL)
        │
        ▼
    [ favourites table ]
```

### 6.2 · Class Contracts

```typescript
class FavouritesService {
  constructor(private repo: FavouritesRepository) {}

  /**
   * Creates a favourite. Enforces max-10 rule.
   * Returns 409 LimitReached if user already has 10.
   * Returns 409 Duplicate if (user, biller) already exists.
   */
  async create(userId: UUID, billerId: UUID, alias?: string): Promise<Result<Favourite, ServiceError>>

  async list(userId: UUID): Promise<Favourite[]>

  async remove(userId: UUID, id: UUID): Promise<Result<void, ServiceError>>

  async rename(userId: UUID, id: UUID, alias: string): Promise<Result<Favourite, ServiceError>>
}
```

## § 07 · Algorithms & Business Logic

Write pseudocode or prose for each non-trivial operation.

### 7.1 · `create` — detailed flow

```
function create(userId, billerId, alias):
  validateAlias(alias)                     // trim · length ≤ 30 · else ValidationError

  existing = repo.countByUser(userId)
  if existing >= 10:
    return Err(LIMIT_REACHED)

  duplicate = repo.findByUserAndBiller(userId, billerId)
  if duplicate:
    return Err(DUPLICATE)

  row = repo.insert({ userId, billerId, alias, createdAt: now() })
  emit("favourite.created", row)
  return Ok(row)
```

**Concurrency:** two simultaneous `create` calls when count = 9 could both pass the limit check and insert an 11th row. Mitigation: wrap read+insert in a transaction with `SERIALIZABLE` isolation, or use a unique partial index on `(user_id)` with a row-count trigger. **Chosen approach:** serializable transaction.

### 7.2 · `rename` — detailed flow
*(similar structure)*

## § 08 · Error Handling

### 8.1 · Error Taxonomy

| Error | When | HTTP | User-facing? |
|---|---|---|---|
| `VALIDATION` | Bad input (alias > 30 chars) | 400 | Yes |
| `UNAUTHORIZED` | Missing/invalid token | 401 | Yes |
| `FORBIDDEN` | Accessing someone else's favourite | 403 | Yes |
| `NOT_FOUND` | ID doesn't exist or not owned | 404 | Yes |
| `LIMIT_REACHED` | User already has 10 | 409 | Yes |
| `DUPLICATE` | `(user, biller)` already exists | 409 | Yes |
| `DB_UNAVAILABLE` | Transient DB failure | 503 | Generic |
| `INTERNAL` | Unexpected | 500 | Generic |

### 8.2 · Retry, Idempotency, Timeouts
- **Idempotency:** `POST /favourites` accepts `Idempotency-Key` header. Replays return the original response for 24 h.
- **Timeouts:** DB queries 2 s; outbound event publish 1 s non-blocking.
- **Retry:** repository layer retries transient DB errors 2× with 100 ms backoff. Service layer does NOT retry business errors.

## § 09 · Concurrency, Transactions, Consistency

- **Transaction boundary:** the whole `create` flow runs in one DB transaction.
- **Isolation level:** `SERIALIZABLE` (justified by race described in §7.1).
- **Locking strategy:** optimistic (fail-fast on serialisation anomaly; client retries).
- **Event publish:** after commit, via outbox table + background relay, to guarantee at-least-once.

## § 10 · Caching

- **What is cached:** `list(userId)` response, key = `fav:list:<userId>`, TTL 60 s.
- **Invalidation:** on `create` / `remove` / `rename` / `use`, delete the key.
- **Fallback on cache miss:** read-through from DB.
- **Size bound:** LRU, max 100k keys.

## § 11 · Observability Hooks

- **Metrics:** counter `favourites.created` · `favourites.removed` · `favourites.limit_rejected` · histogram `favourites.create.duration_ms`.
- **Logs:** structured; always include `userId` (hashed), `favouriteId`, `traceId`.
- **Traces:** span per public method; attribute `favourites.count` at end of `list`.
- **Alerts:** error rate > 2% over 5 min · p95 latency > 500 ms over 10 min.

## § 12 · Security Considerations

- **AuthZ check on every call:** a favourite can only be read/modified by its owner.
- **Audit log:** all writes emit an audit event with `userId · action · targetId · timestamp · IP`.
- **PII:** `alias` is user-chosen; treat as user content (XSS-escape on render; don't log).
- **Rate limit:** `POST /favourites` — 20/min per user.

## § 13 · Test Plan (for this component)

Not the project test plan — just the test cases this LLD implies. QA Test Plan covers more.

### Unit tests
- `create` — happy path · limit reached · duplicate · validation fail · DB error
- `list` — empty · populated · returns user's rows only
- `remove` — not found · wrong owner · success
- `rename` — validation · not found · success

### Integration tests
- Full POST→DB→event round-trip
- Serialisable race: two concurrent creates at count=9 produce exactly one success
- Idempotency-Key replay returns same response
- AuthZ: user A cannot read/modify user B's favourite

### Load / performance
- p95 < 200 ms for `list` at 1k rps
- `create` at 500 rps sustained without queue backup

## § 14 · Deployment & Rollout

- **Feature flag:** `favourites.enabled` (default off at launch; ramp 10% → 50% → 100%).
- **Schema migration:** ship one release before feature (flag off) to avoid deploy-order coupling.
- **Rollback:** flag off; no data migration needed to revert (favourites table retained, unused).

## § 15 · Open Questions

- `<any design question unresolved at writing time>`

## § 16 · Out of Scope (for this LLD)

- Admin tool to reset a user's favourites — separate LLD.
- Cross-device sync of offline-queued favourites — depends on Sync service LLD.

---

## Changelog

- `v0.1` · initial draft · `<author>` · `YYYY-MM-DD`
- `v0.5` · peer review feedback · `YYYY-MM-DD`
- `v1.0` · approved · `YYYY-MM-DD`
