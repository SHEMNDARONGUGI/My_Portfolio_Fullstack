import { Project } from "./project.model.js";
import type { CreateProjectData, UpdateProjectData } from "./project.schema.js";

export const getAllProjectsService = async () => {
  return await Project.find().sort({ createdAt: -1 });
};

export const getProjectByIdService = async (id: string) => {
  return await Project.findById(id);
};

export const createProjectService = async (data: CreateProjectData) => {
  return await Project.create(data);
};

export const updateProjectService = async (
  id: string,
  data: UpdateProjectData,
) => {
  return await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteProjectService = async (id: string) => {
  return await Project.findByIdAndDelete(id);
};
