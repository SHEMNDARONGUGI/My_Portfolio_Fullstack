import { configDotenv } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const envFilePath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../.env.local",
);

configDotenv({ path: envFilePath });
