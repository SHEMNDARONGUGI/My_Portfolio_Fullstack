import type { Request, Response } from "express";

import {
  getAllExperienceService,
  getExperienceByIdService,
  createExperienceService,
  updateExperienceService,
  deleteExperienceService,
} from "./exp.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";
// get all experiences

export const getAllExperiences = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const experiences = await getAllExperienceService();

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  },
);
