import { Router, type Router as ExpressRouter } from "express";
import rateLimit from "express-rate-limit";
import {
  listContactMessages,
  submitContactMessage,
} from "./contact.controller.js";
import { contactMessageSchema } from "./contact.schema.js";
import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router: ExpressRouter = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message: "Too many messages submitted. Please try again later.",
  },
});

router.get("/", authenticate, authorize("admin"), listContactMessages);
router.post(
  "/",
  contactLimiter,
  validate(contactMessageSchema),
  submitContactMessage,
);

export default router;
