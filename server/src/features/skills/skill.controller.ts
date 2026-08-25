import type { Request, Response, RequestHandler } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getAllSkillsService,
  getSkillByIdService,
  createSkillService,
  updateSkillService,
  deleteSkillService,
} from "./skill.service.js";

export const getAllSkills: RequestHandler = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const skills = await getAllSkillsService();

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  },
);

export const getSkillById: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const skillId = req.params.id as string;
    const skill = await getSkillByIdService(skillId);

    if (!skill) {
      res.status(404).json({
        success: false,
        message: "Skill not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: skill,
    });
  },
);

export const createSkill: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const skill = await createSkillService(req.body);

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: skill,
    });
  },
);

export const updateSkill: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const skillId = req.params.id as string;
    const skill = await updateSkillService(skillId, req.body);

    if (!skill) {
      res.status(404).json({
        success: false,
        message: "Skill not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  },
);

export const deleteSkill: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const skillId = req.params.id as string;
    const deletedSkill = await deleteSkillService(skillId);

    if (!deletedSkill) {
      res.status(404).json({
        success: false,
        message: "Skill Not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  },
);
