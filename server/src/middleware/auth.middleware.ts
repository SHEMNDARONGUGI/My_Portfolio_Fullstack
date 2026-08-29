import type { RequestHandler } from "express";

import { verifyToken } from "../utils/jwt.js";

export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(201).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  try {
    const payload = verifyToken(token);

    res.locals.user = payload;
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
