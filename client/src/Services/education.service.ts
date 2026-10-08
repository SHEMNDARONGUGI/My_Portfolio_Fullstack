import api from "../lib/api";
import type {
  Education,
  EducationsResponse,
  EducationResponse,
  CreateEducationData,
  UpdateEducationData,
  DeleteEducationResponse,
} from "../types/education";

export const getEducations = async (): Promise<Education[]> => {
  const response = await api.get<EducationsResponse>("/education");

  return response.data.data;
};

export const getEducation = async (id: string): Promise<Education> => {
  const response = await api.get<EducationResponse>(`/education/${id}`);

  return response.data.data;
};

export const createEducation = async (
  data: CreateEducationData,
): Promise<Education> => {
  const response = await api.post<EducationResponse>("/education", data);

  return response.data.data;
};

export const updateEducation = async (
  id: string,
  data: UpdateEducationData,
): Promise<Education> => {
  const response = await api.patch<EducationResponse>(`/education/${id}`, data);

  return response.data.data;
};

export const deleteEducation = async (id: string): Promise<void> => {
  await api.delete<DeleteEducationResponse>(`/education/${id}`);
};
