// src/app.ts
import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./components/products/route";
import userRouter from "./components/user/route";
// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use("/products", productRouter);
app.use("/auth", userRouter);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

export { app };
