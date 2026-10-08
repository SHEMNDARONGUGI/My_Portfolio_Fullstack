import api from "../lib/api";
import type {
  Skill,
  SkillsResponse,
  SkillResponse,
  CreateSkillData,
  UpdateSkillData,
  DeleteSkillResponse,
} from "../types/skill";

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get<SkillsResponse>("/skill");

  return response.data.data;
};

export const getSkill = async (id: string): Promise<Skill> => {
  const response = await api.get<SkillResponse>(`/skill/${id}`);

  return response.data.data;
};

export const createSkill = async (data: CreateSkillData): Promise<Skill> => {
  const response = await api.post<SkillResponse>("/skill", data);

  return response.data.data;
};

export const updateSkill = async (
  id: string,
  data: UpdateSkillData,
): Promise<Skill> => {
  const response = await api.patch<SkillResponse>(`/skill/${id}`, data);

  return response.data.data;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await api.delete<DeleteSkillResponse>(`/skill/${id}`);
};
