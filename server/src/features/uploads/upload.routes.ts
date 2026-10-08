import { Router, type Router as ExpressRouter } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { uploadImage } from "./upload.controller.js";
import { imageUpload } from "./upload.middleware.js";

const router: ExpressRouter = Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  imageUpload.single("image"),
  uploadImage,
);

export default router;
