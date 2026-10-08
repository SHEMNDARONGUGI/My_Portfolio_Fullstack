import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import "./config/env.js";

import { errorHandler } from "./middleware/error.middleware.js";

import projectRouter from "./features/projects/project.routes.js";
import experienceRouter from "./features/experience/exp.routes.js";
import eduRouter from "./features/education/edu.routes.js";
import skillRouter from "./features/skills/skill.router.js";
import certRouter from "./features/certification/cert.routes.js";
import serviceRouter from "./features/services/service.routes.js";
import authRouter from "./features/auth/auth.routes.js";
import uploadRouter from "./features/uploads/upload.routes.js";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const app: Express = express();

console.log("CLIENT_URL:", process.env.CLIENT_URL);

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(
  "/uploads",
  express.static(resolve(dirname(fileURLToPath(import.meta.url)), "../uploads")),
);

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/uploads", uploadRouter);

app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/experience", experienceRouter);
app.use("/api/v1/education", eduRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/certificate", certRouter);
app.use("/api/v1/services", serviceRouter);

// Global errorHandler
app.use(errorHandler);
export default app;
