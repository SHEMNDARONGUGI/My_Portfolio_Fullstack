import express from "express";
import cors from "cors";

import { errorHandler } from "./middleware/error.middleware.js";

import projectRouter from "./features/projects/project.routes.js";
import experienceRouter from "./features/experience/exp.routes.js";
import eduRouter from "./features/education/edu.routes.js";
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
app.use("/api/v1/experience", experienceRouter);
app.use("/api/v1/education", eduRouter);
app.use(errorHandler);
export default app;
