import { configDotenv } from "dotenv";
configDotenv({ path: ".env.local" });

import argon2 from "argon2";

import { connectDB } from "../config/db.js";
import { User } from "../features/users/user.model.js";

const createAdmin = async () => {
  await connectDB();

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("ADMIN USERNAME and ADMIN_PASSWORD are required");
  }

  const existingUser = await User.findOne({ username });

  const passwordHash = await argon2.hash(password);

  await User.create({
    username,
    passwordHash,
    role: "admin",
  });

  console.log("Admin created successfully");

  process.exit(0);
};

createAdmin().catch((error) => {
  console.error("Failed to create admin", error);
  process.exit(1);
});
