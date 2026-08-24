import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().min(1, "Destription is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  technologies: z.array(z.string()),
  current: z.boolean().default(false),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export type CreateExperienceData = z.infer<typeof createExperienceSchema>;

export type UpdateExperienceData = z.infer<typeof updateExperienceSchema>;
