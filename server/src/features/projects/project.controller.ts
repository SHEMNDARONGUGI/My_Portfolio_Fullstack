import type { Request, Response } from "express";
import {
  getAllProjectsService,
  getProjectByIdService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
} from "./project.service.js";

import { createProjectSchema, updateProjectSchema } from "./project.schema.js";
import { success } from "zod";

export const getAllProjects = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await getAllProjectsService();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Failed to fetch projects: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Projects",
    });
  }
};

export const getProjectById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const projectId = req.params.id;
    const project = await getProjectByIdService(projectId);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Failed to fetch project");
    res.status(500).json({
      success: false,
      message: "Failed to fetch project with that ID",
    });
  }
};

export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = createProjectSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });

      return;
    }
    const project = await createProjectService(result.data);
    res.status(201).json({
      success: true,
      message: "Project created Successfully",
      data: project,
    });
  } catch (error) {
    console.error("Failed to create project: ", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create project" });
  }
};

export const updateProject = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    // Validating req.body with the zod schema
    const result = updateProjectSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
      return;
    }

    const updatedProject = await updateProjectService(
      req.params.id,
      result.data,
    );

    if (!updatedProject) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Project updated succesfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Failed to update project: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const deletedProject = await deleteProjectService(req.params.id);

    if (!deletedProject) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete project: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};
