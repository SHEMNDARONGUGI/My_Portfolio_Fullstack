import { z } from "zod";

const optionalUrl = z
  .string()
  .url()
  .or(z.literal(""))
  .transform((value) => value || undefined)
  .optional();

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).default([]),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  imageUrl: optionalUrl,
  featured: z.boolean().default(false),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
