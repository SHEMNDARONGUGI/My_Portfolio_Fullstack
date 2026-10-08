import { mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

const uploadDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../uploads",
);

mkdirSync(uploadDirectory, { recursive: true });

const imageExtensions: Record<string, string> = {
  "image/avif": ".avif",
  "image/gif": ".gif",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) =>
      callback(null, uploadDirectory),
    filename: (_req, file, callback) =>
      callback(null, `${randomUUID()}${imageExtensions[file.mimetype]}`),
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    callback(null, Boolean(imageExtensions[file.mimetype]));
  },
});
