import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize global mock storage for testing in case DB is offline
global.dbMode = "mongodb";
global.mockUsers = [];
global.mockOrders = [];

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // Allow frontend dev ports
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    dbMode: global.dbMode,
    timestamp: new Date(),
    mockUsersCount: global.mockUsers.length,
    mockOrdersCount: global.mockOrders.length
  });
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio-placement-kit";

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (MongoDB mode)`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("Starting server in fallback MOCK DATABASE mode...");
    global.dbMode = "mock";
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (MOCK DB MODE ACTIVE)`);
    });
  });
