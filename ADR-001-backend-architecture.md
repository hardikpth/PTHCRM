# ADR-001: Central Backend, Database & Security Architecture for PTH CRM

**Status:** Accepted — foundation implemented; hosted project configuration pending
**Date:** 2026-08-02
**Deciders:** Laboratory Head (Hardik), Quality Manager, IT/vendor
**Constraints agreed:** Plan-first (design before build); **cloud hosting is acceptable**; the existing front-end is reused as the UI layer.

---

## Context

PTH CRM today is a **browser-only front-end**. All data (clients, pipeline/enquiries, quotations, follow-ups, SOR, tenders, audit) is kept in each browser's `localStorage`; sign-in and roles are cosmetic (validated in JavaScript). Consequences:

- Every computer/browser has an **independent dataset** — no shared source of truth.
- Records link **by name strings** (e.g. a follow-up stores `customer: "Adani Infra"`), not by stable IDs — so there is no referential integrity.
- "Auth" and "roles" provide **no security** — anyone can read/modify browser storage.
- No backups, no audit that can't be edited, no concurrency control.

The five requirement areas raised (central DB & sync, real auth, server-enforced authorization, backup/DR, production audit) **all require a server + database**. None can be satisfied inside static front-end code. This ADR selects the backend architecture and specifies the data model, security model, audit model and migration path.

### Non-functional profile (small lab CRM)
- Users: ~5–30 concurrent; branches: Surat (HO), Ahmedabad, Vadodara, Rajkot, Mumbai.
- Load: low (hundreds of writes/day). Availability: business-hours critical; PITR backups required.
- Compliance: NABL/ISO context → **append-only audit** and **retention** matter.
- Team: small; **low operational burden** strongly preferred.

---

## Decision

Adopt a **managed Postgres Backend-as-a-Service (Supabase)** as the system of record, and refactor the current front-end into the **UI layer** that talks to it via a typed data-access module (replacing every `localStorage` store).

Supabase is chosen because a single managed platform covers the majority of all five requirement areas with configuration rather than bespoke code: **PostgreSQL** (integrity, transactions, indexes), **GoTrue auth** (hashing, 2FA, reset, sessions, OAuth SSO), **Row-Level Security** (server-enforced RBAC + branch isolation), **Realtime** (multi-user sync), and **managed backups + PITR**. The audit trail is implemented as Postgres triggers into an append-only, hash-chained table.

Self-hosted **Django + PostgreSQL** remains the fallback if data residency later must move on-premise (Supabase is open-source and self-hostable, so this is a migration, not a rewrite).

---

## Options Considered

### Option A: Supabase (managed Postgres + Auth + RLS + Realtime) — **recommended**
| Dimension | Assessment |
|-----------|------------|
| Complexity | Low–Medium (config over code) |
| Cost | Low (free tier → ~$25/mo Pro with PITR) |
| Scalability | Ample for this profile |
| Team familiarity | Front-end JS stays; SQL/RLS to learn |
| Ops burden | Low (managed backups, patching, TLS) |

**Pros:** Fastest route to central DB + real auth + SSO + RLS + realtime + PITR; open-source/self-hostable later; front-end reuse is high.
**Cons:** Cloud-hosted (data leaves premises); RLS policies must be written carefully; some vendor coupling.

### Option B: Django (DRF) + PostgreSQL (self-hosted or cloud VM)
| Dimension | Assessment |
|-----------|------------|
| Complexity | High (build auth, RBAC, API, audit) |
| Cost | Medium (VM + ops time) |
| Scalability | Excellent |
| Team familiarity | Needs Python/Django |
| Ops burden | High (you run DB, backups, patching, TLS) |

**Pros:** Full control; **on-premise capable**; no vendor lock-in; field-level rules trivial in serializers.
**Cons:** Most code to build and, more importantly, to **operate securely** (backups, patching, monitoring) — the hidden cost for a small team.

### Option C: Firebase (Firestore + Auth)
**Pros:** Managed, easy auth, realtime. **Cons:** NoSQL document model fights the **relational** needs here (referential integrity, joins across clients/quotations/follow-ups, SQL reporting) — poor fit. Rejected.

### Option D: Stay an offline prototype
**Pros:** Zero cost/effort. **Cons:** Satisfies none of the five areas. Only acceptable as an interim with a visible "not secure" banner + full data export.

---

## Trade-off Analysis

The decisive factor for a small lab is **operational burden**, not raw flexibility. Option B is the most powerful but makes the team responsible for running Postgres, encrypted backups, PITR, TLS and patching — precisely the reliability work that gets skipped and causes data loss. Option A delivers ~80% of the list as managed features and keeps the door open to self-hosting later (same Postgres, same schema, same RLS). Since **cloud is acceptable**, Option A wins now; revisit Option B only if data-residency rules change.

---

## Target Data Model (PostgreSQL)

Core principle: **entities link by UUID foreign keys, not name strings.** Every table carries tenant/branch, versioning, soft-delete and audit columns.

**Common columns on every business table:**
`id uuid pk default gen_random_uuid()`, `branch_id uuid fk`, `created_at timestamptz`, `updated_at timestamptz`, `created_by uuid fk users`, `updated_by uuid fk users`, `version int not null default 1` (optimistic-lock/conflict detection), `deleted_at timestamptz null` (soft-delete / recycle bin).

```
branches(id, name, code)
users(id, branch_id, name, username unique, email unique citext, role_id fk,
      manager_id fk users, is_active, last_login_at, failed_attempts, locked_until,
      totp_secret, password managed by auth.users)      -- passwords hashed by GoTrue
roles(id, name, level)                                   -- Super Admin … Client Portal User
permissions(id, code)                                    -- View,Create,Edit,Approve,Export,Delete…
role_permissions(role_id, permission_id)                 -- server-enforced RBAC

clients(id, branch_id, name, industry, contact_person, phone, email, gst, address, notes, owner_id fk users, …common)
enquiries(id, branch_id, client_id FK clients, project, category, value, stage,
          probability, owner_id fk, priority, next_followup_at, po_number, lost_reason, …common)
quotations(id, branch_id, client_id FK clients, enquiry_id FK enquiries null, number unique,
           status, discount_pct, subtotal, gst, total, terms, valid_until, …common)
quotation_lines(id, quotation_id FK quotations on delete cascade, sr, category, name, code,
                parameters jsonb, qty, unit, rate, disc_pct, on_request bool, amount)
followups(id, branch_id, client_id FK clients, enquiry_id FK enquiries null,
          quotation_id FK quotations null, subject, due_at, channel, assignee_id fk users,
          priority, status, phone, email, notes, outcome, prev_followup_id fk self, …common)
sor_categories(id, no unique, name, package_rate, financial_year, …common)
sor_tests(id, category_id FK sor_categories on delete cascade, name, code, sample_qty,
          rate numeric null, rate_text, …common)
tenders(id, branch_id, client_id FK clients null, tender_no, title, value, due_at, stage,
        docs_total, docs_missing, …common)
audit_events(...)                                        -- see Audit section (append-only)
```

**Referential integrity & indexes** (directly answers area 1):
- FKs: `enquiries.client_id`, `quotations.client_id/enquiry_id`, `quotation_lines.quotation_id`, `followups.client_id/enquiry_id/quotation_id`, `sor_tests.category_id`.
- Indexes: FKs; `enquiries(branch_id, stage)`; `followups(assignee_id, due_at) where deleted_at is null`; `quotations(client_id, status)`; `clients(branch_id, name)`; unique `quotations.number`, `sor_categories.no`.
- Transactions: quotation + its lines saved in one DB transaction.
- **Concurrency:** each `UPDATE` requires the client's known `version`; `WHERE id=? AND version=?` — 0 rows updated ⇒ **conflict detected** ⇒ client re-fetches and merges (optimistic locking). This gives concurrent-edit protection and conflict resolution without heavy locking.
- **Realtime sync:** Supabase Realtime publishes row changes to subscribed clients → live updates across computers.

---

## Authentication (area 2)

Provided by Supabase Auth (GoTrue), enforced server-side:
- **Password hashing:** bcrypt (managed) — plaintext never stored (removes the current `Name@2026` scheme entirely).
- **2FA:** TOTP (authenticator app) or email OTP.
- **Password reset:** tokenized email workflow.
- **Sessions:** short-lived JWT + refresh token; **expiry & refresh**; server-side session/device list with revoke.
- **Account lockout:** track `failed_attempts` + `locked_until`; lock after N failures.
- **SSO:** Google & Microsoft (Azure AD) OAuth providers.
- **Auth audit:** login success/failure, 2FA, reset, permission change → `audit_events` (below).

---

## Authorization — server-enforced RBAC + RLS (area 3)

Enforced by **PostgreSQL Row-Level Security**, so it cannot be bypassed from the browser:
- **RBAC:** `role_permissions` checked in policies/API; a JWT claim carries `role`, `branch_id`, `user_id`.
- **Record-level & branch isolation:** RLS policy e.g. `USING (branch_id = auth.branch_id() OR auth.role() IN ('Super Admin','Director'))`.
- **Manager hierarchy / territory:** policy allows rows where `owner_id = auth.uid()` OR owner is in the manager's subtree (recursive `users.manager_id`).
- **Field-level read/write:** sensitive columns (e.g. rate cost, incentives) exposed via restricted views / column privileges per role.
- **Sharing & delegated access:** `record_shares(record_type, record_id, user_id, expires_at)` table consulted by policies (temporary delegation).
- **API authorization:** all access goes through PostgREST/Edge Functions under the caller's JWT — no service key in the browser.
- **Permission audit reports:** queries over `role_permissions` history + `audit_events`.

> This closes the current hole where "client-side hiding does not prevent data extraction" — the database itself refuses unauthorized rows.

---

## Production Audit Trail (area 5)

```
audit_events(
  id bigint identity, occurred_at timestamptz default now(),
  actor_id uuid, actor_role text, action text, entity_type text, entity_id uuid,
  before jsonb, after jsonb,                 -- full before/after field values
  ip inet, user_agent text, session_id uuid, -- IP/device/session metadata
  prev_hash bytea, row_hash bytea            -- hash chain for tamper detection
)
```
- **Append-only:** no UPDATE/DELETE grant to app roles; write-only via `AFTER INSERT/UPDATE/DELETE` triggers on every business table.
- **Before/after:** triggers capture `OLD`/`NEW` as JSON.
- **Covers:** data changes, logins, permission changes, **exports/downloads** (logged from the API), approval decisions.
- **Tamper detection:** `row_hash = sha256(prev_hash || payload)` → any edit breaks the chain; a verifier job flags it.
- **Retention:** partition by month; retain per policy (e.g. 7 years) then archive.
- **Compliance reports:** filterable exports for NABL/ISO auditors.

---

## Backup, Recovery & Continuity (area 4)

- **Automated encrypted backups + PITR** (Supabase Pro) — restore to any point in the retention window.
- **Recycle bin / undelete:** `deleted_at` soft-delete → restore accidentally deleted records; purge job after grace period.
- **Full CRM export:** scheduled + on-demand export of all tables (CSV/JSON) for portability.
- **Restore testing:** quarterly restore drill (documented runbook).
- **Backup-health alerts:** monitor backup success; alert on failure.
- **DR:** documented recovery target (RPO ≤ 5 min via PITR, RTO ≤ few hours) + optional read replica.
- **Retention policy:** per entity, documented.

---

## Migration path (front-end reuse)

1. Introduce a single **data-access layer** (`assets/js/db.js`) with `list/get/create/update/remove(entity, …)`; today it wraps `localStorage`, after cutover it wraps the Supabase client. Views call the layer, not storage directly.
2. **ID-ify relationships:** stop linking by name — clients/enquiries/quotations/follow-ups reference each other by `id` (a one-time data-shape change in the front-end, then the schema enforces it).
3. **One-time import:** load existing `localStorage` data into the DB via the export tool already built.
4. Cut auth over to Supabase; remove the `Name@2026` scheme and `?skip=1` bypass.
5. Enable RLS; verify each role sees only permitted rows.

---

## Requirement coverage matrix

| Area | How covered | Option A ships it via |
|------|-------------|-----------------------|
| 1 Central DB / sync / concurrency / integrity | Postgres + FKs + version col + Realtime | Managed |
| 2 Auth / hashing / 2FA / reset / sessions / lockout / SSO | Supabase Auth | Managed + config |
| 3 Server RBAC / record & field level / branch / territory / delegation | RLS policies + views + shares table | Config + SQL |
| 4 Backups / PITR / recycle bin / retention / DR / export | Managed backups + soft-delete + export jobs | Managed + jobs |
| 5 Append-only audit / before-after / tamper / metadata / retention | Trigger-based hash-chained audit table | SQL |

---

## Consequences

**Easier:** one source of truth across all computers; real security; auditor-ready trail; safe deletes; live multi-user updates; reporting via SQL.
**Harder:** now operating a real system — connectivity dependency, secrets management, RLS correctness testing, and a cutover/migration to execute carefully.
**To revisit:** on-premise/data-residency (→ self-host the same stack), and load if user count grows materially.

---

## Action Items (phased)

**Phase 0 — Design sign-off (this ADR)**
1. [x] Approve Option A (Supabase, cloud) and the data model above.
2. [ ] Confirm role→permission matrix and branch/territory rules with management.

**Phase 1 — Foundation**
3. [ ] Create Supabase project; [x] author schema migrations (tables, FKs, indexes, version/soft-delete).
4. [x] Implement audit triggers + hash chain; [ ] enable PITR backups after project creation.

**Phase 2 — Security**
5. [ ] Configure Auth (password, TOTP/OTP, reset, Google/Microsoft SSO, lockout).
6. [ ] Write & test RLS policies (branch isolation, manager hierarchy, field-level views, shares).

**Phase 3 — Front-end cutover**
7. [x] Add transitional shared data-access/sync layer; [ ] finish per-record normalized-table cutover and ID-ify relationships.
8. [ ] One-time import of existing data; remove demo auth + `?skip=1`.

**Phase 4 — Operations**
9. [ ] Recycle-bin UI, export/retention jobs, backup-health alerts, restore drill + runbook.
10. [ ] Compliance audit-report screens; permission-audit report.
