import type { RequestHandler } from "express";
import { success } from "zod";

export const authorize = (...allowedRoles: string[]): RequestHandler => {
  return (_req, res, next) => {
    const user = res.locals.user;

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
      return;
    }

    next();
  };
};
