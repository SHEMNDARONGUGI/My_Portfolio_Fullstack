import { z } from "zod";

const optionalUrl = z
  .string()
  .url()
  .or(z.literal(""))
  .transform((value) => value || undefined)
  .optional();

const optionalImageUrl = z
  .string()
  .url()
  .or(z.string().regex(/^\/uploads\/[a-f0-9-]+\.(avif|gif|jpg|png|webp)$/i))
  .or(z.literal(""))
  .transform((value) => value || undefined)
  .optional();

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).default([]),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  imageUrl: optionalImageUrl,
  featured: z.boolean().default(false),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
