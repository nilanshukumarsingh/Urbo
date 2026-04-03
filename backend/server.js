import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { startReassigningProvider } from "./job/index.js";
import authRoutes from "./routes/auth.route.js";
import serviceRoutes from "./routes/service.route.js";
import bookingRoutes from "./routes/booking.route.js";
import userRoutes from "./routes/user.route.js";
import reviewRoutes from "./routes/review.route.js";

dotenv.config();

const isVercel = Boolean(process.env.VERCEL);

connectDB().catch((error) => {
  console.error("Failed to initialize database connection", error);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Urbanro backend is running" });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/review", reviewRoutes);

// Start cron jobs
if (!isVercel) {
  startReassigningProvider();
}

const PORT = process.env.PORT || 5000;

if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
