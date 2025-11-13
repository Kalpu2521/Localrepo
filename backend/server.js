import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectToDatabase from "./config/db.js";
import { generalLimiter, authLimiter } from "./middleware/rateLimit.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import recipientRoutes from "./routes/recipientRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();

const app = express();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic security and utility middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(generalLimiter);

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "smart-blood-donation", timestamp: Date.now() });
});

// Mount API routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/recipients", recipientRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/search", searchRoutes);

// 404 handler for API
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "API route not found" });
  }
  next();
});

// Serve frontend static files (after API routes)
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// SPA fallback: serve index.html for all non-API routes
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  const indexPath = path.join(publicPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.warn("Frontend not built yet. Run 'npm run build-frontend' in backend or 'npm run build' in frontend.");
      res.status(404).json({ message: "Frontend not available. Please build the frontend first." });
    }
  });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;

async function start() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((e) => {
  console.error("Failed to start server:", e);
  process.exit(1);
});

export default app;

