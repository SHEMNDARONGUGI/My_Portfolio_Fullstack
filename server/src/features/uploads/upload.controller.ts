import { readFile, unlink } from "node:fs/promises";
import { asyncHandler } from "../../utils/asyncHandler.js";
import type { RequestHandler } from "express";

export const uploadImage: RequestHandler = asyncHandler(
  async (req, res): Promise<void> => {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Choose a JPEG, PNG, GIF, WebP, or AVIF image to upload",
      });
      return;
    }

    const file = req.file;
    const bytes = await readFile(file.path);
    const signatureMatches =
      (file.mimetype === "image/jpeg" &&
        bytes[0] === 0xff &&
        bytes[1] === 0xd8 &&
        bytes[2] === 0xff) ||
      (file.mimetype === "image/png" &&
        bytes.subarray(0, 8).equals(
          Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        )) ||
      (file.mimetype === "image/gif" &&
        ["GIF87a", "GIF89a"].includes(bytes.toString("ascii", 0, 6))) ||
      (file.mimetype === "image/webp" &&
        bytes.toString("ascii", 0, 4) === "RIFF" &&
        bytes.toString("ascii", 8, 12) === "WEBP") ||
      (file.mimetype === "image/avif" &&
        bytes.toString("ascii", 4, 8) === "ftyp" &&
        ["avif", "avis"].includes(bytes.toString("ascii", 8, 12)));

    if (!signatureMatches) {
      await unlink(file.path);
      res.status(400).json({
        success: false,
        message: "The uploaded file contents are not a supported image",
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: {
        url: `/uploads/${file.filename}`,
      },
    });
  },
);
