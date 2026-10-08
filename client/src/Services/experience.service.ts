import api from "../lib/api";
import type {
  Experience,
  ExperiencesResponse,
  ExperienceResponse,
  CreateExperienceData,
  UpdateExperienceData,
  DeleteExperienceResponse,
} from "../types/experience";

// Get all experiences
export const getExperiences = async (): Promise<Experience[]> => {
  const response = await api.get<ExperiencesResponse>("/experience");

  return response.data.data;
};

// Get one experience
export const getExperience = async (id: string): Promise<Experience> => {
  const response = await api.get<ExperienceResponse>(`/experience/${id}`);

  return response.data.data;
};

// Create an experience
export const createExperience = async (
  data: CreateExperienceData,
): Promise<Experience> => {
  const response = await api.post<ExperienceResponse>("/experience", data);

  return response.data.data;
};

// Update an experience
export const updateExperience = async (
  id: string,
  data: UpdateExperienceData,
): Promise<Experience> => {
  const response = await api.patch<ExperienceResponse>(
    `/experience/${id}`,
    data,
  );

  return response.data.data;
};

// Delete an experience
export const deleteExperience = async (id: string): Promise<void> => {
  await api.delete<DeleteExperienceResponse>(`/experience/${id}`);
};
