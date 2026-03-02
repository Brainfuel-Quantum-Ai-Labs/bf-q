import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Verifies a Supabase JWT from the Authorization header.
 * Attaches decoded user info to req.user.
 */
export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);
  const jwtSecret = process.env.SUPABASE_JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({ error: "Server misconfiguration: missing JWT secret" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    req.user = {
      id: decoded.sub as string,
      email: (decoded.email as string) ?? "",
      role: (decoded.user_metadata?.role as string) ?? "user",
    };
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

/**
 * Requires the authenticated user to have the "admin" role.
 * Must be used after requireAuth.
 */
export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "Forbidden: admin access required" });
    return;
  }
  next();
}
