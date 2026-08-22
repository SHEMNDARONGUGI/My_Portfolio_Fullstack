import { Router } from "express";
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "./project.controller.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
