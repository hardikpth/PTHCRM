# PTH CRM — Pramukh Test House

A premium, responsive front-end prototype for a **Laboratory CRM & Compliance Management** platform,
branded for **Pramukh Test House** (PTH Consultancy Services LLP), Surat — accredited to ISO 9001:2015
and NABL ISO/IEC 17025:2017. Built for material-testing, geotechnical, NDT and calibration workflows
with government departments, PSUs and infrastructure clients.

Repository: **https://github.com/hardikpth/PTHCRM**

> **Brand, logo & tagline are configurable** (Settings → Branding, or `DB.brand` in `assets/js/data.js`).

## Architecture — code and data are separate ⭐
Your **data** is kept apart from the **application code**, so updating features never erases records.

- **Code** (features / UI / logic): `index.html`, `assets/css/*`, `assets/js/{data.js, sor.js, charts.js, app.js}`. Replaced on every deploy.
- **Data** (users, CRM leads, credentials, equipment, staff, tenders, quotations, notifications, audit trail): held by `assets/js/store.js` in the browser's **localStorage** under one key (`pth_crm_data`).

How it behaves:
- **First run** seeds data from the code defaults. After that, your edits live in the Store.
- **Deploying new code** (or a plain reload) does **not** touch your data.
- A new collection introduced by a future version is **merged in** without overwriting what you already have (schema migration).
- **Settings → Data Management** gives you **Back up (download JSON)**, **Restore from backup**, and **Reset to defaults** — plus live record counts.

> Scope note: localStorage is **per-browser / per-device**. For shared, multi-user, multi-device data you need the backend (see *Going online / production* below). The Store layer is designed so swapping localStorage for a REST API later is a contained change (one file).

## Login users
The static site provides role-based preview access and does not contain credentials. The Django
backend requires `DEMO_USER_PASSWORD` and `DJANGO_SUPERUSER_PASSWORD` deployment secrets. Set both
outside source control before running `seed_demo`.

## Schedule of Rates (SOR)
The full **PTH SOR FY 2026–27** — **310 tests across 34 categories** — was imported from
`PTH_SOR_2026-27_Final_Complete.docx` into `assets/js/sor.js`.

- **Schedule of Rates** page (sidebar → CRM): browse/search every test by name or IS code; one-click "add to quotation".
- **Quotations** page: pick a category → test; the **rate auto-fills from the SOR**, quantity × rate rolls up to subtotal, 18% GST and total. "Rate on Demand" items are carried as *On request*.

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
| **Accreditation Scope / Equipment / Staff** | Scope cards, calibration table, staff credential cards |
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
PTHCRM/
├── index.html                 # entry point (cache-busted asset links)
├── server.js                  # zero-dependency Node static server
├── package.json               # npm start → node server.js
├── Start-LabCred.bat          # Windows one-click launcher
├── README.md
├── MODULE-AUDIT.md            # module-by-module status audit
└── assets/
    ├── img/logo.jpeg          # authentic PTH seal
    ├── css/styles.css         # design tokens + full component library + responsive + dark theme
    └── js/
        ├── data.js            # DEFAULTS: sample laboratory database + seed data
        ├── sor.js             # Schedule of Rates (310 tests) imported from the SOR docx
        ├── store.js           # DATA layer — persists user data to localStorage (code/data separation)
        ├── charts.js          # dependency-free SVG charts: area, donut, gauge, sparkline, counters
        └── app.js             # icon set, router, all views, audit trail, drawers/modals/intro
```

---

## Going online / production

**Demo / review link (minutes, free):** it's a static site.
- **GitHub Pages:** push, then repo → Settings → Pages → Source `main` / root → your URL is `https://hardikpth.github.io/PTHCRM/`.
- **Netlify / Cloudflare Pages / Vercel:** connect the repo or drag-drop the folder; add a custom domain (e.g. `crm.pramukhtesthouse.com`) with automatic HTTPS.

**Real multi-user production:** a full backend now ships in **[`backend/`](backend/README.md)** — Django + DRF + JWT + PostgreSQL, with models mirroring the Store collections, role-based permissions, an append-only audit trail, the Schedule of Rates as reference data, and one-click deploy configs for **Render** ([`render.yaml`](render.yaml)) and **Railway** (`backend/Procfile`).

To connect the front-end to it once deployed:
1. Deploy the backend (see `backend/README.md`) → you get an API base like `https://pthcrm-api.onrender.com/api`.
2. In `index.html`, uncomment and set `window.PTH_API_BASE` to that URL.
3. `assets/js/api.js` (already included) then handles JWT login + CRUD. Wiring the Store's load/save to `Api` is the final integration step — a contained change in `store.js`, because the rest of the app already reads/writes through the `Store` interface.

Two-part hosting: **front-end** on GitHub Pages/Netlify (static), **backend** on Render/Railway (API + database). Point them at each other via `PTH_API_BASE` (front-end) and `CORS_ALLOWED_ORIGINS` (back-end).

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
