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

import { authorize } from "../../middleware/role.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);

router.post(
  "/",
  validate(createExperienceSchema),
  authenticate,
  authorize("admin"),
  createExperience,
);

router.patch(
  "/:id",
  validate(updateExperienceSchema),
  authenticate,
  authorize("admin"),
  updateExperience,
);

router.delete("/:id", authenticate, authorize("admin"), deleteExperience);

export default router;
