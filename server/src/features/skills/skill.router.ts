import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "./skill.controller.js";

import { authorize } from "../../middleware/role.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";

import { createSkillSchema, updateSkillSchema } from "./skills.schema.js";
const router = Router();

router.get("/", getAllSkills);
router.get("/:id", getSkillById);

router.post(
  "/",
  validate(createSkillSchema),
  authenticate,
  authorize("admin"),
  createSkill,
);

router.patch(
  "/:id",
  validate(updateSkillSchema),
  authenticate,
  authorize("admin"),
  updateSkill,
);

router.delete("/:id", authenticate, authorize("admin"), deleteSkill);

export default router;
