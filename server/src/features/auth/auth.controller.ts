import type { Request, RequestHandler, Response } from "express";

import { loginService } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const login: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
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
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid credentials") {
        res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
        return;
      }

      throw error;
    }
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

export const getCurrentUser: RequestHandler = (req, res): void => {
  res.status(200).json({
    success: true,
    data: res.locals.user,
  });
};
