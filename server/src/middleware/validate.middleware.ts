import type { RequestHandler } from "express";
import type { z } from "zod";

export const validate = (schema: z.ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });

      return;
    }

    req.body = result.data;

    next();
  };
};
