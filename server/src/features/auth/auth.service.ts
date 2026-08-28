import argon2 from "argon2";

import { User } from "../users/user.model.js";
import type { loginData } from "./auth.schema.js";

import { createToken } from "../../utils/jwt.js";

export const loginService = async ({ username, password }: loginData) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatches = await argon2.verify(user.passwordHash, password);

  if (!passwordMatches) {
    throw new Error("Invalid credentials");
  }
  const token = createToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  };
};
