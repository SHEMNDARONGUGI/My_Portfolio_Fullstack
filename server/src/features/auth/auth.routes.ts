import { Router } from "express";

import { login, logout } from "./auth.controller.js";
import { loginSchema } from "./auth.schema.js";

import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";

import rateLimit from "express-rate-limit";
import { success } from "zod";

const router = Router();

const LoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});
router.post("/super-admin", LoginLimiter, validate(loginSchema), login);
router.post("/logout", authenticate, logout);

export default router;
