import { Project } from "./project.model.js";

export const getAllProjectsService = async () => {
  return await Project.find().sort({ createdAt: -1 });
};
