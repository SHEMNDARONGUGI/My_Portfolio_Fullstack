import { Router } from "express";
import {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "./edu.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { updateEducationSchema, createEducationSchema } from "./edu.schema.js";

import { authorize } from "../../middleware/role.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllEducation);
router.get("/:id", getEducationById);

router.post(
  "/",
  validate(createEducationSchema),
  authenticate,
  authorize("admin"),
  createEducation,
);

router.patch(
  "/:id",
  validate(updateEducationSchema),
  authenticate,
  authorize("admin"),
  updateEducation,
);

router.delete("/:id", authenticate, authorize("admin"), deleteEducation);

export default router;
