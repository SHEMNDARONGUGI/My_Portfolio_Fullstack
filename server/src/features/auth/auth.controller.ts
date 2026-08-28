import type { Request, RequestHandler, Response } from "express";

import { loginService } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const login: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { token, user } = await loginService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  },
);

export const logout: RequestHandler = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  },
);
