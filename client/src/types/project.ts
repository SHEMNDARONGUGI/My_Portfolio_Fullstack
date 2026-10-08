export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsResponse {
  success: boolean;
  count: number;
  data: Project[];
}

export interface ProjectResponse {
  success: boolean;
  data: Project;
}

export interface DeleteProjectResponse {
  success: boolean;
  message: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}
