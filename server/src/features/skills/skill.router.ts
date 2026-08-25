import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "./skill.controller.js";

import { createSkillSchema, updateSkillSchema } from "./skills.schema.js";
const router = Router();

router.get("/", getAllSkills);
router.get("/:id", getSkillById);

router.post("/", validate(createSkillSchema), createSkill);

router.patch("/:id", validate(updateSkillSchema), updateSkill);

router.delete("/:id", deleteSkill);

export default router;
