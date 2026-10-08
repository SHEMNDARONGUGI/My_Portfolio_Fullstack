import { Router, type Router as ExpressRouter } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createServiceSchema,
  updateServiceSchema,
} from "./service.schema.js";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "./service.controller.js";

const router: ExpressRouter = Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createServiceSchema),
  createService,
);
router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(updateServiceSchema),
  updateService,
);
router.delete("/:id", authenticate, authorize("admin"), deleteService);

export default router;
