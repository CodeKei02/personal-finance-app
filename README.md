# Personal Finance App

Full-stack personal finance manager.

- **Frontend**: React + TypeScript + Vite, state managed with **Zustand**, styled with Tailwind.
- **Backend**: Node.js + Express + **Prisma** ORM over **PostgreSQL**.
- **Database**: PostgreSQL, run via **Docker** for a one-command setup.
- **Package manager**: `pnpm` for both workspaces.

## Features

- Email/password auth (JWT) plus a one-click **guest login** ("Iniciar como invitado").
- **Server-side paginated** transactions (the list is paged from PostgreSQL, not shipped as one big array).
- Monthly expense totals via `prisma.transaction.aggregate({ _sum })` and per-category totals via `prisma.transaction.groupBy()`.
- **Currency switch** (VES / USD / EUR) with live exchange rates fetched from an external API and cached in the DB; amounts are converted for display.
- **Cron job** that runs daily at midnight, scans `recurring_bills`, and auto-generates the matching expense transaction (marking the bill as paid for the month).

## Repository layout

```
.
├── backend/            # Express + Prisma API (pnpm package)
├── frontend/           # React + Vite app (pnpm package)
└── docker-compose.yml  # PostgreSQL service
```

## Prerequisites

- Node.js 20+ and `pnpm`
- Docker (for PostgreSQL)

## 1. Start PostgreSQL (Docker)

From the repository root:

```bash
docker compose up -d db
```

This starts PostgreSQL 16 on host port **55432** (mapped to avoid clashing with any local PostgreSQL on 5432), with credentials `finance / finance` and database `finance`. Data persists in the `pgdata` volume.

## 2. Backend

```bash
cd backend
cp .env.example .env          # adjust if needed
pnpm install
pnpm prisma migrate dev       # creates the schema in the Dockerized DB
pnpm dev                      # starts the API on http://localhost:4000
```

Key environment variables (`backend/.env`):

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string (points at the Docker DB on port 55432) |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `PORT` | API port (default `4000`) |
| `CORS_ORIGIN` | Allowed frontend origin (default `http://localhost:5173`) |
| `FX_API_URL` | External FX rates endpoint (base USD, no key required) |
| `FX_CACHE_TTL_MINUTES` | How long cached rates stay fresh |

### API overview

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/guest`, `GET /api/auth/me`
- `GET /api/transactions?page&limit&category&search&sortBy` (paginated), plus `POST/PUT/DELETE`
- `GET /api/transactions/summary/monthly` (aggregate `_sum`)
- `GET /api/transactions/summary/by-category` (`groupBy`)
- `GET /api/budgets`, `GET /api/pots`, `GET /api/recurring-bills` (+ CRUD)
- `GET /api/currency/rates`
- `PATCH /api/users/me/currency`

## 3. Frontend

```bash
cd frontend
cp .env.example .env          # VITE_API_URL=http://localhost:4000/api
pnpm install
pnpm dev                      # starts the app on http://localhost:5173
```

Open http://localhost:5173 and either register, log in, or click **Iniciar como invitado** to start immediately.

## Useful commands

| Location | Command | Description |
| --- | --- | --- |
| root | `docker compose up -d db` | start PostgreSQL |
| root | `docker compose down` | stop PostgreSQL (data kept in volume) |
| backend | `pnpm prisma migrate dev` | apply/create migrations |
| backend | `pnpm prisma studio` | inspect the DB |
| backend | `pnpm build` / `pnpm start` | compile and run the API |
| frontend | `pnpm build` | production build |

## Notes

- Amounts are stored in a base currency (USD) and converted on the client using cached rates.
- Each user's data (transactions, budgets, pots, recurring bills) is scoped to their account via the JWT.
