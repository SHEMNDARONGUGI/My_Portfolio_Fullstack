import type { Request, Response, RequestHandler } from "express";

import {
  getAllExperienceService,
  getExperienceByIdService,
  createExperienceService,
  updateExperienceService,
  deleteExperienceService,
} from "./exp.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";

// get all experiences

export const getAllExperiences: RequestHandler = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const experiences = await getAllExperienceService();

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  },
);

export const getExperienceById: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res): Promise<void> => {
    const experienceId = req.params.id as string;
    const experience = await getExperienceByIdService(experienceId);

    if (!experience) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  },
);

export const createExperience: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const experience = await createExperienceService(req.body);

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  },
);

export const updateExperience: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const experienceId = req.params.id as string;
    const experience = await updateExperienceService(experienceId, req.body);

    if (!experience) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Experience Updated successfully",
      data: experience,
    });
  },
);

export const deleteExperience: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const experienceId = req.params.id as string;
    const experience = await deleteExperienceService(experienceId);

    if (!experience) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully!",
    });
  },
);
