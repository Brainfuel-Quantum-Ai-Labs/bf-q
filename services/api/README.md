# bf-q-api — BrainFuel Quantum AI Labs standalone REST API

A lightweight Express backend that can be deployed as a separate Railway service alongside the Next.js app.

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | Public | Health check |
| GET | `/me` | Bearer JWT | Returns current user info |
| GET | `/admin/users` | Bearer JWT (admin) | Lists all users via Supabase Admin API |

## JWT Verification

All protected routes expect a Supabase-issued JWT in the `Authorization: Bearer <token>` header. The token is verified using the `SUPABASE_JWT_SECRET` environment variable (found at **Supabase → Project → Settings → API → JWT Settings**).

## Local Development

```bash
cd services/api
cp .env.example .env
npm install
npm run dev    # tsx watch — hot reload on port 4000
```

## Deploy to Railway

1. In your Railway project, create a new **service** pointing to this repository.
2. Set the **Root Directory** to `services/api`.
3. Railway auto-detects a Node.js app and runs `npm run build && npm start`.
4. Set environment variables (see `.env.example`).

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Listening port (set automatically by Railway) |
| `SUPABASE_JWT_SECRET` | Supabase project JWT secret |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (admin operations) |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins |
