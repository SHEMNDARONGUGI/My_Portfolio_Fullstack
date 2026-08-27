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

const router = Router();

router.get("/", getAllCertificates);
router.get("/:id", getCertificateById);

router.post("/", validate(createCertificationSchema), createCertificate);

router.patch("/:id", validate(updateCertificationSchema), updateCerticicate);

router.delete("/:id", deleteCertificate);

export default router;
