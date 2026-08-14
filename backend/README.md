# PTH CRM — Backend API (Django + DRF + JWT + PostgreSQL)

Turns PTH CRM into a **shared, multi-user** system: one PostgreSQL database, JWT
authentication, role-based permissions, an append-only audit trail, and the full
Schedule of Rates as reference data.

## Stack
- Django 5 + Django REST Framework
- JWT auth (`djangorestframework-simplejwt`)
- PostgreSQL (via `DATABASE_URL`; SQLite locally with no config)
- WhiteNoise (static), Gunicorn (WSGI), CORS for the front-end origin

## API surface
Base path: `/api`

| Method(s) | Endpoint | Notes |
|---|---|---|
| POST | `/auth/token/` | login → `{ access, refresh, user }` |
| POST | `/auth/token/refresh/` | refresh access token |
| GET | `/auth/me/` | current user profile |
| CRUD | `/users/` | admin roles only |
| CRUD | `/leads/` `/credentials/` `/equipment/` `/staff/` `/tenders/` `/approvals/` `/notifications/` `/quotations/` | authenticated |
| GET | `/sor/` | Schedule of Rates (read-only, 34 categories / 310 tests) |
| GET/POST | `/audit/` | audit trail (append-only) |

All list endpoints support `?search=`, `?ordering=`, and field filters (e.g. `/credentials/?status=expiring`).

## Run locally
Requires Python 3.12+.
```bash
cd backend
python -m venv .venv && . .venv/Scripts/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # edit if you like (SQLite works out of the box)
python manage.py migrate
python manage.py seed_demo                          # 5 users + admin + SOR; requires password env vars
python manage.py runserver
```
API at `http://127.0.0.1:8000/api/` · admin at `/admin/`. Set `DEMO_USER_PASSWORD` and
`DJANGO_SUPERUSER_PASSWORD` in the environment before seeding; never commit their values.

> First run needs migrations. If you change `models.py`, run `python manage.py makemigrations core` and commit the result.

## Deploy on Render (recommended — one click)
A blueprint lives at the repo root: [`render.yaml`](../render.yaml).
1. Push this repo to GitHub.
2. Render → **New → Blueprint** → select the repo. It provisions the Postgres DB and the web service, runs migrations + `seed_demo`, and starts Gunicorn.
3. After it deploys, set **`CORS_ALLOWED_ORIGINS`** (env var) to your front-end origin, e.g. `https://hardikpth.github.io`. Redeploy.
4. Your API base is `https://<service>.onrender.com/api`.

## Deploy on Railway
1. Railway → **New Project → Deploy from GitHub repo** → set **Root Directory** = `backend`.
2. Add a **PostgreSQL** plugin (Railway injects `DATABASE_URL`).
3. Variables: `SECRET_KEY` (random), `DEBUG=False`, `ALLOWED_HOSTS=.up.railway.app`, `CORS_ALLOWED_ORIGINS=https://hardikpth.github.io`.
4. Start command (Procfile is included): `gunicorn config.wsgi --workers 3 --timeout 120`.
   Run once in the Railway shell: `python manage.py migrate && python manage.py seed_demo`.
5. API base is `https://<project>.up.railway.app/api`.

## Connect the front-end
In the front-end `index.html`, before the other scripts, add:
```html
<script>window.PTH_API_BASE = 'https://YOUR-API-HOST/api';</script>
```
`assets/js/api.js` then authenticates against this backend (JWT) and exposes CRUD
helpers. See the project root README → *Going online* for wiring the Store to the API.

## Security notes
- Change all seeded passwords after first login.
- Keep `DEBUG=False` in production; set real `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`.
- `SECRET_KEY` must be a strong random value (Render generates one).
