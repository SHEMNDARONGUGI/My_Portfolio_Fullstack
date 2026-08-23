import express from "express";
import cors from "cors";

import { errorHandler } from "./middleware/error.middleware.js";

import projectRouter from "./features/projects/project.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

app.use("/api/v1/projects", projectRouter);

app.use(errorHandler);
export default app;
