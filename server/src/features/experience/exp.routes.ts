import { Router } from "express";
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "./exp.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import {
  createExperienceSchema,
  updateExperienceSchema,
} from "./exp.schema.js";

const router = Router();

router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);

router.post("/", validate(createExperienceSchema), createExperience);

router.patch("/:id", validate(updateExperienceSchema), updateExperience);

router.delete("/:id", deleteExperience);

export default router;
