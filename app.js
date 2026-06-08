require("dotenv").config();

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { ensureSeedAdmin } = require("./controllers/authController");

function requireEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = requireEnv("DB_URI");
const SESSION_SECRET = requireEnv("SESSION_SECRET");
const CORS_ORIGIN = requireEnv("CORS_ORIGIN");
const DB_RETRY_DELAY_MS = 5000;

app.set("trust proxy", 1);

async function connectDatabase() {
  try {
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 10000 });
    console.log("Connected to MongoDB");

    try {
      const admin = await ensureSeedAdmin();
      console.log(`Seed admin ready: ${admin.email}`);
    } catch (seedError) {
      console.error("Admin seed error:", seedError.message);
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log(`Retrying MongoDB connection in ${DB_RETRY_DELAY_MS / 1000} seconds`);
    setTimeout(connectDatabase, DB_RETRY_DELAY_MS);
  }
}

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  session({
    name: "porsche.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  }),
);

const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/cars");
const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  const databaseStates = ["disconnected", "connected", "connecting", "disconnecting"];

  res.json({
    status: "ok",
    database: databaseStates[mongoose.connection.readyState] || "unknown",
  });
});

const frontendPath = path.join(__dirname, "views", "dist");
app.use(express.static(frontendPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  connectDatabase();
});
