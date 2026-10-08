export interface Education {
  _id: string;
  institution: string;
  course: string;
  description: string;
  skills: string[];
  startDate: string;
  endDate?: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EducationsResponse {
  success: boolean;
  count: number;
  data: Education[];
}

export interface EducationResponse {
  success: boolean;
  data: Education;
}

export interface CreateEducationData {
  institution: string;
  course: string;
  description: string;
  skills: string[];
  startDate: string;
  endDate?: string;
  logoUrl?: string;
}

export interface UpdateEducationData {
  institution?: string;
  course?: string;
  description?: string;
  skills?: string[];
  startDate?: string;
  endDate?: string;
  logoUrl?: string;
}

export interface DeleteEducationResponse {
  success: boolean;
  message: string;
}
