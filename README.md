# BrainFuel Quantum AI Labs

**Website:** [https://www.bf-q.com](https://www.bf-q.com)  
**Founder:** Mohsin Agwan · Navi Mumbai, India

Pioneering the convergence of quantum computing, artificial intelligence, and blockchain technologies — building tomorrow's intelligence infrastructure today.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + CSS Variables (dark mode by default)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth.js (Credentials + Google + LinkedIn)
- **UI Components:** Radix UI primitives + CVA
- **Animations:** Framer Motion
- **Carousel:** Embla Carousel

---

## Quickstart

### 1. Clone & install

```bash
git clone https://github.com/bf-q/bf-q.git
cd bf-q
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | Random 32+ char secret (`openssl rand -base64 32`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth client ID |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth client secret |
| `NEXT_PUBLIC_APP_URL` | Public app URL |

### 3. Database setup

```bash
npm run db:push
npm run db:generate
npm run db:seed
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/                # REST API endpoints
│   │   ├── auth/           # NextAuth + registration
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
```

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
| `npm run db:push` | Push schema to DB |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed database |

---

## Deploy on Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` and follow prompts
3. Set environment variables from `.env.example` in Project Settings
4. Run `vercel --prod`

Use [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app) for PostgreSQL.

After setting `DATABASE_URL`:

```bash
npx prisma migrate deploy
npx prisma db seed
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

## License

Proprietary — © 2025 BrainFuel Quantum AI Labs. All rights reserved.�
