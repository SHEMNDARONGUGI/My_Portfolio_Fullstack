export interface Experience {
  _id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  current: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExperiencesResponse {
  success: boolean;
  count: number;
  data: Experience[];
}

export interface ExperienceResponse {
  success: boolean;
  data: Experience;
}

export interface CreateExperienceData {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  current: boolean;
}

export interface UpdateExperienceData {
  company?: string;
  role?: string;
  description?: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  current: boolean;
}

export interface DeleteExperienceResponse {
  success: boolean;
  message: string;
}
