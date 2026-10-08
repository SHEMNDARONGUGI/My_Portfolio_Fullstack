export interface Skill {
  _id: string;
  skill: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillsResponse {
  success: boolean;
  count: number;
  data: Skill[];
}

export interface SkillResponse {
  success: boolean;
  data: Skill;
}

export interface CreateSkillData {
  skill: string;
  description: string;
}

export interface UpdateSkillData {
  skill?: string;
  description?: string;
}

export interface DeleteSkillResponse {
  success: boolean;
  message: string;
}
