import type { Request, Response } from "express";
import { getAllProjectsService } from "./project.service.js";

export const getAllProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const projects = await getAllProjectsService();

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
};
