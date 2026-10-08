import type { ErrorRequestHandler } from "express";
import multer from "multer";

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
): void => {
  console.error(error);

  if (error instanceof multer.MulterError) {
    const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    res.status(status).json({
      success: false,
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Image exceeds the 5 MB upload limit"
          : "Invalid image upload",
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
