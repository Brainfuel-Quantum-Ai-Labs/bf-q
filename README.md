# BrainFuel Quantum AI Labs

**Website:** [https://www.bf-q.com](https://www.bf-q.com)  
**Founder:** Mohsin Agwan · Navi Mumbai, India

Pioneering the convergence of quantum computing, artificial intelligence, and blockchain technologies — building tomorrow's intelligence infrastructure today.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + CSS Variables (dark mode by default)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth.js (Credentials + Google + LinkedIn)
- **UI Components:** Radix UI primitives + CVA
- **Animations:** Framer Motion
- **Carousel:** Embla Carousel

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

### 3. Start local Postgres

```bash
docker compose up -d
```

This starts a PostgreSQL 16 container on port 5432 with database `bfq_db`.

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

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to DB (no migrations) |
| `npm run db:migrate` | Create & apply dev migrations |
| `npm run db:deploy` | Apply pending migrations (CI/prod) |
| `npm run db:seed` | Seed database with sample data |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/                # REST API endpoints
│   │   ├── auth/           # NextAuth + registration
│   │   ├── health/         # Health check endpoint (no DB)
│   │   ├── projects/       # CRUD projects
│   │   ├── products/       # CRUD products
│   │   ├── posts/          # CRUD posts
│   │   └── contact/        # Contact form handler
│   ├── about/
│   ├── services/
│   ├── products/           # Listing + [slug] detail
│   ├── projects/
│   ├── research/           # Listing + [slug] detail
│   ├── investors/
│   ├── partners/
│   ├── contact/
│   └── portal/             # login / signup / dashboard / admin
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, TechPillars, ProductSlider
│   └── ui/                 # Button, Card, Badge, Input, Textarea
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client singleton
│   └── utils.ts            # cn(), formatDate(), slugify()
└── middleware.ts            # Security headers + route protection
prisma/
├── schema.prisma
└── seed.ts
docker-compose.yml           # Local Postgres dev environment
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

## License

Proprietary — © 2025 BrainFuel Quantum AI Labs. All rights reserved.
