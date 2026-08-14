# PTH CRM Technical Audit

**Audit date:** 2026-07-28  
**Audited version:** 1.3.0  
**Scope:** Static server, front-end syntax, authentication flow, HTTP behavior, and module-completion claims.

## Executive summary

The application is a polished, runnable front-end prototype. It is suitable for demonstrations and workflow validation, but it is **not production-ready CRM software** because it has no backend, database, server-side authentication, authorization enforcement, durable business-data storage, document storage, or real PDF/ZIP generation.

The audit fixed the two clearest functional/server defects found: sign-in previously accepted every password, and missing asset requests incorrectly returned the application HTML with HTTP 200.

## Fixes applied

- Added prototype password validation and rejection feedback to the sign-in flow.
- Hardened static-file path containment using `path.resolve` plus `path.relative`.
- Added explicit `400`, `404`, and `405` responses for malformed URLs, missing assets, and unsupported methods.
- Added correct `HEAD` request handling.
- Added `X-Content-Type-Options: nosniff` and `Referrer-Policy: no-referrer` response headers.
- Preserved SPA fallback only for extensionless client routes.
- Aligned `package.json` version with the application assets and module audit (`1.3.0`).

## Verification completed

- Node syntax checks passed for `server.js`, `data.js`, `sor.js`, `charts.js`, and `app.js`.
- Live HTTP checks passed:
  - root page: `200 text/html`
  - extensionless SPA route: `200 text/html`
  - missing JavaScript asset: `404`
  - malformed encoded URL: `400`
  - unsupported POST: `405` with `Allow: GET, HEAD`
  - HEAD request: `200` with no response body
- Browser smoke tests passed:
  - invalid password remains on sign-in and shows `Sign-in failed`
  - documented password opens Overview and the cinematic intro
  - no console errors were observed during the tested flow

## Production blockers

1. **No backend or database.** Most records reset after reload; the audit trail alone uses browser `localStorage`.
2. **No real security boundary.** Credentials and authorization logic are shipped to the browser. The `?skip=1` URL bypasses login intentionally. This must never protect real customer or laboratory data.
3. **No enforced role-based access control.** Roles are display data; navigation and actions are not protected by server-side permissions.
4. **Incomplete workflows.** Several modules are display-complete but lack CRUD or state transitions, as detailed in `MODULE-AUDIT.md`.
5. **Placeholder outputs.** PDF, ZIP, certificate verification, downloads, SSO, 2FA, and several exports/actions are demonstrations rather than real integrations.
6. **Potential HTML-injection surface.** The UI relies heavily on `innerHTML`. Some dynamic values are escaped, but production development should centralize safe rendering and validate/sanitize every server-derived value.
7. **No automated test suite.** Current verification is syntax and smoke testing only.
8. **External font dependency.** Google Fonts requires internet access; a production or offline deployment should self-host the approved font assets.

## Recommended delivery order

1. Build the Django/DRF and PostgreSQL foundation with server-side authentication, RBAC, migrations, audit events, and environment-based secrets.
2. Implement persistent CRM entities first: customers, enquiries, pipeline, quotations, SOR versions, and activity history.
3. Implement credentials, approvals, certifications, equipment, and staff with document storage and expiry jobs.
4. Replace placeholder PDF/ZIP/download/QR actions with server-generated artifacts and authorization checks.
5. Add unit, API, authorization, and end-to-end tests plus backup/restore and deployment documentation.

## Operating note

For prototype use, start with `Start-LabCred.bat` or `npm start`, then browse to `http://localhost:5173/`. Do not expose this prototype to the public internet or load real confidential records into it.
