import express from "express";
import routes from "./routes.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());

// CORS — allow the Next.js app to call this service
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000").split(",");
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

// Health check — no auth required
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "bf-q-api", timestamp: new Date().toISOString() });
});

// API routes
app.use("/", routes);

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`bf-q-api listening on port ${PORT}`);
});

export default app;
