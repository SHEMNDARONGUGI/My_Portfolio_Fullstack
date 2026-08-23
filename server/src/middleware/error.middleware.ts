import type { NextFunction, Request, Response } from "express";
import { success } from "zod";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
