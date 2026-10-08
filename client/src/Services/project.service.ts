import api from "../lib/api";
import type {
  Project,
  ProjectsResponse,
  ProjectResponse,
  DeleteProjectResponse,
  CreateProjectData,
  UpdateProjectData,
} from "../types/project";

//Get all projects
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ProjectsResponse>("/projects");

  return response.data.data;
};

//Get one project
export const getProject = async (id: string): Promise<Project> => {
  const response = await api.get<ProjectResponse>(`/projects/${id}`);

  return response.data.data;
};

// create a project
export const createProject = async (
  data: CreateProjectData,
): Promise<Project> => {
  const response = await api.post<ProjectResponse>("/projects", data);

  return response.data.data;
};

// update a project
export const updateProject = async (
  id: string,
  data: UpdateProjectData,
): Promise<Project> => {
  const response = await api.patch<ProjectResponse>(`/projects/${id}`, data);

  return response.data.data;
};

// delete a project
export const deleteProject = async (id: string): Promise<void> => {
  await api.delete<DeleteProjectResponse>(`/projects/${id}`);
};
