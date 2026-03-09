import express from "express";
import rateLimit from "express-rate-limit";
import { requireAuth, requireAdmin, AuthenticatedRequest } from "./auth.js";

const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

router.use(apiLimiter);

// GET /me — returns the current authenticated user
router.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
  res.json({
    id: req.user!.id,
    email: req.user!.email,
    role: req.user!.role,
  });
});

// GET /admin/users — returns a placeholder user list (requires admin + service key)
router.get(
  "/admin/users",
  requireAuth,
  requireAdmin,
  async (_req, res) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      res.status(500).json({ error: "Server misconfiguration: missing Supabase env vars" });
      return;
    }

    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        res.status(response.status).json({ error: text });
        return;
      }

      const data = (await response.json()) as {
        users?: { id: string; email?: string; user_metadata?: { role?: string }; created_at?: string }[];
      };
      const users = (data.users ?? []).map((u) => ({
        id: u.id,
        email: u.email ?? "",
        role: u.user_metadata?.role ?? "user",
        createdAt: u.created_at ?? "",
      }));
      res.json({ users });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ error: `Failed to fetch users: ${message}` });
    }
  }
);

export default router;
