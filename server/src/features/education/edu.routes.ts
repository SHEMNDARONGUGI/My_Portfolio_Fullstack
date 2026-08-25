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

const router = Router();

router.get("/", getAllEducation);
router.get("/:id", getEducationById);

router.post("/", validate(createEducationSchema), createEducation);

router.patch("/:id", validate(updateEducationSchema), updateEducation);

router.delete("/:id", deleteEducation);

export default router;
