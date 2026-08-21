import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
});
