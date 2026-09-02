import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createCertificationSchema,
  updateCertificationSchema,
} from "./cert.schema.js";

import {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCerticicate,
  deleteCertificate,
} from "./cert.controller.js";

import { authorize } from "../../middleware/role.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
const router = Router();

router.get("/", getAllCertificates);
router.get("/:id", getCertificateById);

router.post(
  "/",
  validate(createCertificationSchema),
  authenticate,
  authorize("admin"),
  createCertificate,
);

router.patch(
  "/:id",
  authenticate,
  validate(updateCertificationSchema),
  authorize("admin"),
  updateCerticicate,
);

router.delete("/:id", authenticate, authorize("admin"), deleteCertificate);

export default router;
