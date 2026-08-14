# PTH CRM — Module Audit & Completion Plan
_As of v1.4.0 · 2026-07-28_

Legend: ✅ Functional (interactive logic + audit-logged) · 🟡 Display-complete (renders real data, actions are placeholders) · ⬜ Not yet built as its own page

## Status by module

| # | Module | Status | What works today | To complete |
|---|--------|--------|------------------|-------------|
| 1 | **Overview** | ✅ | KPI cards with counters, **period selector** (7d/30d/quarter/FY re-scales values), **Export CSV**, KPI→module deep links, animated area chart with series toggle, compliance gauge, credential donut, sparklines, approvals list, expiry timeline + detail drawer | Branch/FY filters, live "compare" overlay |
| 2 | CRM Pipeline | ✅ | Kanban with **drag-and-drop**, Won→PO modal, Lost→reason modal, live column totals, lead drawer, **audit-logged** stage moves | Persist card positions, activity tab per lead |
| 3 | Enquiries | ✅ | Table, detail drawer, **create modal** with validation, audit-logged | Inline edit, saved filters, bulk actions |
| 4 | **Quotations** | ✅ | **SOR-powered builder** — category lines, full combo parameters, custom out-of-SOR services, optional discounts, GST totals, editable terms templates, print and Save | Customer persistence, generated PDF, revisions |
| 5 | **Schedule of Rates** | ✅ | 310 tests / 34 categories from your SOR, search by name/IS code, category filter, **add-to-quotation** | Inline rate edit, versioned re-import |
| 6 | **User Management** | ✅ | Full **CRUD** — add/edit/delete, **enable/disable**, validation, password auto-suggest, stats, search, audit-logged | Per-role permission matrix, bulk import |
| 7 | **Audit Trail** | ✅ | Immutable activity log, **auto-captures** login/create/edit/delete/enable-disable/status-change/export, filters (action/module/search), **Export CSV**, **persists** to localStorage | Server sink, tamper hash, date-range picker |
| 8 | Credentials | 🟡→✅ | Table with status, detail drawer (tabs), **add-credential modal** (audit-logged) | Column sort/resize/visibility, saved filters, bulk upload, doc viewer |
| 9 | Approvals | 🟡 | Approval records + workflow stages display | Stage-advance actions, query tracking |
| 10 | Certifications | 🟡 | Org + customer certificate sections, workflow display | Draft→Issued state machine, QR verify, dispatch log |
| 11 | Accreditation Scope | 🟡 | Scope-of-accreditation display | Add/edit scope lines, discipline filters |
| 14 | Package Builder | ✅ | 3-panel builder with **drag-and-drop** ordering, live summary | Real PDF/ZIP generation, cover page/TOC |
| 15 | Expiry Calendar | 🟡 | Grouped timeline (7/30/60/90 days) + drawer | Month grid view, ICS export |
| 16 | Analytics | 🟡 | Chart set | Report builder, custom ranges |
| 17 | Alerts | 🟡 | Notification list, read/unread | Mark-all-read, per-type prefs |
| 18 | Customer Portal | 🟡 | Portal view, QR verify demo | Login scope, download log |
| 19 | Settings | 🟡→✅ | **Branding (name/company/logo/accent) applies live** & audit-logged | Roles & permissions editor, 2FA, sessions |

## Cross-cutting done this pass
- **Audit Trail** subsystem (`logAudit(action, module, detail)`) wired into Overview, Pipeline, Enquiries, Quotations, Credentials, User Management, Settings and Auth — persisted to `localStorage` (`pth_audit_v1`).
- **CSV export** helper (`downloadCSV`) used by Overview KPIs and Audit Trail.
- Microcopy cleanup (removed "Congratulations", per the spec's tone rules).

## Recommended completion order (next passes)
1. **Credentials** → full table controls + document viewer + bulk upload (highest daily-use module).
2. **Approvals & Certifications** → the state machines (Draft→Issued, stage-advance) + QR verify.
3. **Persistence layer** → extend localStorage to all entities so every module's edits survive reload.
4. **Roles & Permissions** editor in Settings → drive nav/actions from the permission matrix.

Each 🟡 module already renders real sample data and the correct layout; "completion" means wiring the
actions (CRUD, state changes, exports) — the same pattern now proven in modules 1–7.
