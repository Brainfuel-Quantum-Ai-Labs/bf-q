# BrainFuel Quantum AI Labs

**Website:** [https://www.bf-q.com](https://www.bf-q.com)  
**Founder:** Mohsin Agwan · Reseacher & Founder - Mumbai, India

Pioneering the convergence of quantum computing, artificial intelligence, and blockchain technologies — building tomorrow's intelligence infrastructure today.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + CSS Variables (dark mode by default)
- **Database:** PostgreSQL via Prisma ORM + Supabase (RLS, Storage, Auth)
- **Auth:** NextAuth.js (Credentials + Google + LinkedIn) + Supabase Auth
- **UI Components:** Radix UI primitives + CVA
- **Animations:** Framer Motion
- **Carousel:** Embla Carousel

---

## Docker Compose — Full Stack

Run all services (API, Worker, Sandbox Runner, Postgres, Redis) with a single command.

### Services

| Service | Image / Build | Port | Description |
|---|---|---|---|
| `postgres` | `postgres:16-alpine` | 5432 | Primary PostgreSQL 16 database |
| `redis` | `redis:7-alpine` | 6379 | Redis (job queue + cache) |
| `api` | `apps/api/Dockerfile` | 3000 | Next.js API & frontend |
| `worker` | `apps/worker/Dockerfile` | 3001 (health) | Background job worker (BullMQ) |
| `sandbox-runner` | `apps/sandbox-runner/Dockerfile` | 8080 | Isolated job executor (no host socket) |

### 1. Configure environment

```bash
cp .env.example .env
# Edit .env — set NEXTAUTH_SECRET, OAuth keys, etc.
```

Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 2. Build & start all services

```bash
docker compose up --build
```

To run in the background:

```bash
docker compose up --build -d
```

### 3. Run database migrations

Wait until postgres is healthy, then:

```bash
docker compose exec api npm run db:deploy
# Optionally seed sample data:
docker compose exec api npm run db:seed
```

### 4. Open the app

- **Web / API:** [http://localhost:3000](http://localhost:3000)
- **Worker health:** [http://localhost:3001/health](http://localhost:3001/health)
- **Sandbox Runner health:** [http://localhost:8080/health](http://localhost:8080/health)

### 5. Stop all services

```bash
docker compose down
# Remove volumes (wipes DB & Redis data):
docker compose down -v
```

### Security notes

- The `sandbox-runner` container runs commands **inside itself only** — no host Docker socket is mounted.
- It executes only a strict allowlist of commands (npm, npx, node, etc.).
- The container process runs as a non-root `sandbox` user.
- The `worker` triggers jobs by calling the `sandbox-runner` HTTP endpoint — it never shells out on the host.

---

## Local Development

### Prerequisites

- Node.js 20+
- Docker & Docker Compose

### 1. Clone & install

```bash
git clone https://github.com/Brainfuel-Quantum-Ai-Labs/bf-q.git
cd bf-q
npm install
```

`npm install` automatically runs `prisma generate` via the `postinstall` hook.

### 2. Configure environment

```bash
cp .env.example .env.local
```

The default `.env.example` already points to the local Docker database — no edits needed for local dev unless you change passwords.

### 3. Start local Postgres (dev-only, no worker/sandbox)

```bash
docker compose up postgres redis -d
```

This starts PostgreSQL 16 on port 5432 and Redis on port 6379.

### 4. Run migrations & seed

```bash
npm run db:migrate   # create/apply migrations (requires live DB)
npm run db:seed      # seed sample projects, products, and posts
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) → **New project**, choose a region, and set a database password.

### 2. Apply database migrations

From the Supabase dashboard, open the **SQL Editor** and run the migration file:

```bash
# Or apply via the Supabase CLI:
supabase db push  # if using local dev with supabase CLI
```

The migration at `supabase/migrations/001_rls_policies.sql` creates:
- **`profiles`** — user profiles with role (`user` / `admin`) and RLS
- **`files`** — file metadata with owner-scoped RLS
- **`audit_logs`** — append-only audit trail readable only by admins

### 3. Configure environment variables

Copy the values from **Supabase Dashboard → Project → Settings → API**:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` / public key |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key (keep secret) |
| `SUPABASE_JWT_SECRET` | Settings → API → JWT Settings |

### 4. Auth routes

| Route | Description |
|---|---|
| `/auth/login` | Supabase email/password sign-in |
| `/auth/signup` | Supabase account registration |
| `/dashboard` | Protected — requires any authenticated user |
| `/admin` | Protected — requires `role = admin` in `user_metadata` |

To promote a user to admin, update their `user_metadata` in the Supabase dashboard or via the service-role API:

```sql
update auth.users
set raw_user_meta_data = raw_user_meta_data || '{"role":"admin"}'::jsonb
where email = 'admin@example.com';
```

---

## Deploy to Railway

Railway auto-detects this project as a Next.js app via `railway.json` (Nixpacks builder).

### Environment Variables

Set the following in **Railway → Service → Variables**:

| Variable | Description |
|---|---|
| `PORT` | Set automatically by Railway — no action needed |
| `NODE_ENV` | Set to `production` (optional; Railway may set this automatically) |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | Your deployed Railway URL, e.g. `https://your-app.up.railway.app` |
| `NEXTAUTH_SECRET` | Random 32+ char secret — generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth client ID |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth client secret |
| `NEXT_PUBLIC_APP_URL` | Public app URL, e.g. `https://your-app.up.railway.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (server-only) |
| `SUPABASE_JWT_SECRET` | Supabase JWT secret |

### Build & Start Commands

These are configured in `railway.json` and applied automatically:

- **Build command:** `npm ci && npm run build`
- **Start command:** `npm run start` (uses `$PORT` supplied by Railway)

### Standalone API Service (optional)

The `services/api/` directory contains a standalone Express backend that can be deployed as a **second Railway service** alongside the Next.js app:

1. In your Railway project, create a new service from the same repository.
2. Set **Root Directory** to `services/api`.
3. Set the environment variables listed in `services/api/.env.example`.
4. Railway auto-detects Node.js, runs `npm run build && npm start`.

### Database Migrations

Railway does **not** run `prisma migrate deploy` automatically. Run migrations manually from your local machine against the Railway Postgres connection string:

```bash
DATABASE_URL="<your-railway-postgres-url>" npm run db:deploy
```

---

## Deploy on Vercel

### Environment Variables

Set the following in **Vercel → Project → Settings → Environment Variables**:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string. For **Vercel Postgres**: use the `POSTGRES_PRISMA_URL` value (PgBouncer pooled). |
| `NEXTAUTH_URL` | Your deployed URL, e.g. `https://www.bf-q.com` |
| `NEXTAUTH_SECRET` | Random 32+ char secret — generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth client ID |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth client secret |
| `NEXT_PUBLIC_APP_URL` | Public app URL, e.g. `https://www.bf-q.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (server-only) |
| `SUPABASE_JWT_SECRET` | Supabase JWT secret |

### Using Vercel Postgres (recommended)

1. Go to **Vercel → Storage → Create Database → Postgres**.
2. Connect the database to your project.
3. Vercel auto-injects `POSTGRES_*` variables. Set:
   - `DATABASE_URL` = value of `POSTGRES_PRISMA_URL`
4. Run migrations from your local machine (using the direct connection string):
   ```bash
   DATABASE_URL="<POSTGRES_URL_NON_POOLING>" npm run db:deploy
   npm run db:seed
   ```

### Build command

Vercel's default `npm run build` works. The `postinstall` hook runs `prisma generate` automatically before the build — no extra build command configuration needed.

> **Note:** `DATABASE_URL` is **not required at build time**. The build runs `next build` only; no migrations or DB queries happen during the Vercel build step. `DATABASE_URL` is required at **runtime** for any DB-backed API routes or pages.

### Running migrations on Vercel

Vercel build containers cannot reach your database, so migrations must be run separately:

- **Automatic (recommended):** Push changes to `prisma/migrations/` or `prisma/schema.prisma` on `main`. The [Migrate Database](.github/workflows/migrate.yml) GitHub Actions workflow runs `npm run migrate:deploy` automatically using the `DATABASE_URL` secret stored in GitHub repository secrets.
- **Manual:** Run from your local machine against the production DB:
  ```bash
  DATABASE_URL="<your-production-db-url>" npm run migrate:deploy
  ```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build (no DB needed) |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |
| `npm run migrate:deploy` | Apply pending migrations (CI/prod) |
| `npm run migrate:dev` | Create & apply dev migrations |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run db:generate` | Generate Prisma client (alias) |
| `npm run db:push` | Push schema to DB (no migrations) |
| `npm run db:migrate` | Create & apply dev migrations (alias) |
| `npm run db:deploy` | Apply pending migrations (alias) |
| `npm run db:seed` | Seed database with sample data |

---

## Project Structure

```
apps/
├── api/
│   └── Dockerfile              # Multi-stage Next.js build
├── worker/
│   ├── Dockerfile
│   └── src/index.js            # BullMQ worker — delegates to sandbox-runner
└── sandbox-runner/
    ├── Dockerfile
    └── src/index.js            # Isolated HTTP job executor
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/                # REST API endpoints
│   │   ├── auth/           # NextAuth + registration
│   │   ├── health/         # Health check endpoint (no DB)
│   │   ├── me/             # Current user (Supabase JWT / session)
│   │   ├── admin/users/    # Admin user list (Supabase service key)
│   │   ├── projects/       # CRUD projects
│   │   ├── products/       # CRUD products
│   │   ├── posts/          # CRUD posts
│   │   └── contact/        # Contact form handler
│   ├── auth/               # Supabase auth pages (login / signup)
│   ├── dashboard/          # Protected user dashboard
│   ├── admin/              # Admin panel (admin role required)
│   ├── about/
│   ├── services/
│   ├── products/           # Listing + [slug] detail
│   ├── projects/
│   ├── research/           # Listing + [slug] detail
│   ├── investors/
│   ├── partners/
│   ├── contact/
│   └── portal/             # legacy NextAuth portal (login / signup / dashboard / admin)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, TechPillars, ProductSlider
│   └── ui/                 # Button, Card, Badge, Input, Textarea
├── lib/
│   ├── supabase/           # Supabase client utilities
│   │   ├── client.ts       # Browser client
│   │   └── server.ts       # Server client (async cookies)
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client singleton
│   └── utils.ts            # cn(), formatDate(), slugify()
└── middleware.ts            # Security headers + Supabase/NextAuth route protection
prisma/
├── schema.prisma
└── seed.ts
docker-compose.yml           # Full-stack dev environment (5 services)
```

---

## Authentication

- **Credentials:** Email + password (bcrypt, min 8 chars)
- **Google OAuth:** [console.cloud.google.com](https://console.cloud.google.com)
- **LinkedIn OAuth:** [linkedin.com/developers](https://www.linkedin.com/developers)

| Role | Access |
|---|---|
| `USER` | Portal dashboard, public pages |
| `ADMIN` | Full CRUD + admin dashboard |

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | Public | Health check |
| GET | `/api/projects` | Public | List projects |
| POST | `/api/projects` | Admin | Create project |
| GET/PUT/DELETE | `/api/projects/:id` | Public/Admin | Project CRUD |
| GET | `/api/products` | Public | List products |
| POST | `/api/products` | Admin | Create product |
| GET | `/api/posts` | Public | List posts |
| POST | `/api/posts` | Admin | Create post |
| POST | `/api/contact` | Public | Contact form |
| POST | `/api/auth/register` | Public | Register user |

---

## Troubleshooting

### `PrismaClientInitializationError` on Vercel

**Root cause:** Prisma client is not generated before `next build`.  
**Fix:** The `postinstall` script (`prisma generate`) in `package.json` runs automatically after `npm install` on Vercel, generating the client before the build starts. Ensure `prisma` is in `devDependencies`.

### Build fails with "Failed to collect page data"

**Root cause:** A page or API route attempted a Prisma query at build time with no DB.  
**Fix:** All DB-backed pages use `export const dynamic = "force-dynamic"` and wrap DB calls in `try/catch`. API routes are dynamically rendered by default when they reference request-scoped data.

### `DATABASE_URL` is not defined

Set it in `.env.local` for local dev (copy `.env.example`), or in Vercel environment variables for production.

### Migrations fail on Vercel Postgres

Vercel Postgres uses PgBouncer (connection pooling) which is incompatible with `prisma migrate`. Run migrations from your local machine using the direct (non-pooled) connection string (`POSTGRES_URL_NON_POOLING`).

---

## Brand Attribution

> Designed & Developed by BrainFuel Quantum AI Labs — India

---

## License

Proprietary — © 2025 BrainFuel Quantum AI Labs. All rights reserved.
