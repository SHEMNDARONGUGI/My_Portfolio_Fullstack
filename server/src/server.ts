import { configDotenv } from "dotenv";
configDotenv({ path: ".env.local" });

import app from "./app.js";

import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 8000;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
