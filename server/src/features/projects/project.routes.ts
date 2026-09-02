import { Router } from "express";
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "./project.controller.js";

import { authorize } from "../../middleware/role.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", authenticate, authorize("admin"), createProject);
router.patch("/:id", authenticate, authorize("admin"), updateProject);
router.delete("/:id", authenticate, authorize("admin"), deleteProject);

export default router;
