import express from "express";
import cors from "cors";
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

export default app;
