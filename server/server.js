import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

await connectCloudinary();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Health check endpoint
app.get("/", (req, res) => res.send("Server is live !"));

// Require authentication for all routes below this point
app.use(requireAuth());

// AI routes - all require authentication
app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
