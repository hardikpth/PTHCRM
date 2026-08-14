# PTH CRM — Pramukh Test House

A premium, responsive front-end prototype for a **Laboratory CRM & Compliance Management** platform,
branded for **Pramukh Test House** (PTH Consultancy Services LLP), Surat — accredited to ISO 9001:2015
and NABL ISO/IEC 17025:2017. Built for material-testing, geotechnical, NDT and calibration workflows
with government departments, PSUs and infrastructure clients.

> **Brand, logo & tagline are configurable** (Settings → Branding, or `DB.brand` in `assets/js/data.js`).

## Login users
Five users are available for static preview access. The shared preview password is
**`PTH-Demo!8vK4mQ27`** and must never be reused for production authentication.

| User | Password | Role |
|---|---|---|
| Hardik | `PTH-Demo!8vK4mQ27` | Laboratory Head |
| Tushal | `PTH-Demo!8vK4mQ27` | Quality Manager |
| Shivang | `PTH-Demo!8vK4mQ27` | Technical Manager |
| Jaydeep | `PTH-Demo!8vK4mQ27` | CRM Manager |
| Nirav | `PTH-Demo!8vK4mQ27` | Authorised Signatory |

Pick the user on the login screen; the preview password auto-fills.

## Schedule of Rates (SOR)
The full **PTH SOR FY 2026–27** — **310 tests across 34 categories** — was imported from
`PTH_SOR_2026-27_Final_Complete.docx` into `assets/js/sor.js`.

- **Schedule of Rates** page (sidebar → CRM): browse/search every test by name or IS code; one-click "add to quotation".
- **Quotations** page: pick a category → test; the **rate auto-fills from the SOR**, quantity × rate rolls up to the GST-exclusive subtotal, then 18% GST is added separately. "Rate on Demand" items are carried as *On request*.
- Quotation lines include their **test category**. SOR combo packages print every included test parameter in brackets; out-of-SOR custom services, optional percentage discounts and editable category-specific terms templates are supported.
- **Excel/CSV bulk import** is available for Enquiries, Quotations, Schedule of Rates, Customers and Tenders. Each screen provides a downloadable CSV template; `.xlsx`, `.xls`, `.ods` and `.csv` files are supported.
- **Named PDF bulk import** is available for Credentials, Approvals, Certifications and Accreditation Scope. Each PDF filename becomes the particular record name.

> **Tax basis:** All prices listed in the FY 2026–27 SOR exclude GST. Applicable GST is added extra at quotation/invoice time, as stated in the approved Word SOR.

To re-import an updated SOR later, replace the `.docx` and regenerate `assets/js/sor.js` (see `sor.js` header).

## Logo
The **authentic PTH seal** (`assets/img/logo.jpeg`, extracted from the official SOR document) is used
in the sidebar, login, cinematic intro and customer portal. To swap it, replace that file, or set a
different *Logo image URL* in Settings → Branding (or `DB.brand.logoUrl` in `assets/js/data.js`).
A built-in SVG mark is the automatic fallback if the image is missing.

## User Management
Sidebar → **User Management**. Full CRUD over user profiles:

- **Add** user (name, username, email, role, branch, password, enabled toggle) with validation
- **Edit** any user
- **Enable / disable** — a per-row toggle; disabled users are greyed and cannot appear on the login screen
- **Delete** with a confirmation dialog
- Live stats (total / active / disabled / distinct roles) and search

All 15 roles from the spec are selectable. (Prototype state is in-memory — it resets on reload.)

---

## Run it on localhost (recommended)

The app ships with a **zero-dependency Node server** — no `npm install`, nothing to download.

**Easiest (Windows):** double-click **`Start-LabCred.bat`**.

**Or from a terminal** in the `labcred/` folder:

```bash
npm start
```
```bash
node server.js
```

Then open **http://localhost:5173/** (it also auto-opens your browser).

- `http://localhost:5173/` → Login → **Sign In** plays the ~12s cinematic intro → dashboard.
- `http://localhost:5173/?skip=1` → skips login + intro, boots straight to **Overview**.
- Change the port: `set PORT=8080 && node server.js` (Windows) or `PORT=8080 node server.js`.

### Or just open the file
No server needed for a quick look — double-click **`index.html`**.
(A server is preferred: it avoids browser `file://` caching quirks when you edit files.)

---

## What's implemented

### Design system
- Fully **token-driven** palette (CSS variables) — white surfaces, warm-grey canvas, lime-green accent,
  black active controls, thin borders, minimal shadows, floating cards.
- **Light + dark theme** (toggle in the top bar; shield icon).
- Inter typeface, tabular numbers for financial/statistical values.
- `prefers-reduced-motion` respected throughout (disables 3D zoom, counters, card-float; keeps subtle fades).

### Screens (single-page app, hash-free router)
| Screen | Highlights |
|---|---|
| **Login** | Split hero + form, SSO, 2FA note |
| **Cinematic intro** | 6-scene sequence — sharpen-from-blur, sidebar focus, floating KPI cards, final logo/tagline. Skippable. |
| **Overview** | 5 KPI cards w/ counters + sparklines, animated area chart, semicircular compliance gauge, credential-status donut, approvals list, expiry timeline |
| **CRM Pipeline** | 9-stage Kanban, **drag & drop**, Won → PO modal, Lost → reason modal, live column totals |
| **Enquiries / Customers / Quotations** | Tables, cards, quotation builder w/ live totals |
| **Credentials** | Stat strip, filter bar, sortable table, bulk-select, **detail drawer** (Overview / Document / Renewal History / Checklist / Audit Trail), Add-Credential modal w/ validation |
| **Approvals** | Workflow board with animated 13-stage progression, records table |
| **Certifications** | Org + customer certificates, 7-step workflow visualiser |
| **Accreditation Scope** | Scope cards and named-PDF bulk import |
| **Tenders** | Opportunity cards → Package Builder |
| **Package Builder** | 3-panel builder, drag-to-reorder, live missing/expiring summary |
| **Expiry Calendar** | Grouped timeline (7/30/60/90 days) + month calendar |
| **Notifications** | Filterable alert feed with professional lab microcopy |
| **Analytics** | KPI row, revenue-vs-collection chart, revenue-by-service donut |
| **Customer Portal** | Client preview: report status, downloads, QR verification |
| **Settings** | Configurable branding (name / tagline / accent), roles × permissions matrix |

### Interactions
Toasts, modals, right-side drawers, skeleton-ready structures, form validation with field shake,
success check animation, hover-lift cards, staggered entrance animations, collapsible + mobile sidebar,
bottom nav + FAB on mobile.

---

## File structure

```
labcred/
├── index.html                 # entry point (cache-busted asset links)
├── server.js                  # zero-dependency Node static server
├── package.json               # npm start → node server.js
├── Start-LabCred.bat          # Windows one-click launcher
├── README.md
└── assets/
    ├── css/styles.css         # design tokens + full component library + responsive + dark theme
    └── js/
        ├── data.js            # sample laboratory database (credentials, leads, approvals, ...)
        ├── charts.js          # dependency-free SVG charts: area, donut, gauge, sparkline, counters
        ├── imports.js         # Excel/CSV and named-PDF bulk import workflows
        └── app.js             # icon set, router, all views, drawers/modals/toasts, cinematic intro
```

---

## Scope note

This is a **high-fidelity front-end prototype** — the visual + interaction source of truth. It uses
in-memory sample data and no backend. The original brief targets an Angular + Django/DRF + PostgreSQL +
Celery/Redis + Channels stack with JWT auth, RBAC, object storage and PDF generation; this prototype is
designed to map cleanly onto that build:

- **Design tokens** → Tailwind theme / SCSS variables
- **`VIEWS.*`** render functions → Angular routed components
- **`DB`** shape → DRF serializers / models
- **`charts.js`** → ECharts / Chart.js
- **Kanban / Package Builder drag-drop** → Angular CDK Drag & Drop
- **Cinematic intro / drawers** → Angular Animations / GSAP

## Customising branding
Edit `assets/js/data.js` → `DB.brand`, or use **Settings → Branding** at runtime (name, tagline, accent
colour). The accent swatch live-updates the `--primary` CSS variable across the whole app.
