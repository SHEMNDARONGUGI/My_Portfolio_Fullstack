import type { Request, Response, RequestHandler } from "express";

import {
  getAllEducationService,
  getEducationByIdService,
  createEducationService,
  updateEducationService,
  deleteEducationService,
} from "./edu.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "zod";

export const getAllEducation: RequestHandler = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const allEducation = await getAllEducationService();

    res.status(200).json({
      success: true,
      count: allEducation.length,
      data: allEducation,
    });
  },
);

export const getEducationById: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const educationId = req.params.id as string;
    const education = await getEducationByIdService(educationId);

    if (!education) {
      res.status(404).json({
        success: false,
        message: "Education not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: education,
    });
  },
);

export const createEducation: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const education = await createEducationService(req.body);

    res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: education,
    });
  },
);

export const updateEducation: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const educationId = req.params.id as string;
    const education = await updateEducationService(educationId, req.body);

    if (!education) {
      res.status(404).json({
        success: false,
        message: "Education not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  },
);

export const deleteEducation: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const educationId = req.params.id as string;
    const education = await deleteEducationService(educationId);

    if (!education) {
      res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education deleted successfully!",
    });
  },
);
