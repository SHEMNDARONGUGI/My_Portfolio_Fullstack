import { z } from "zod";

export const createSkillSchema = z.object({
  skill: z.string().min(1, "Skill is required"),
  description: z.string().min(1, "Description is required"),
});

export const updateSkillSchema = createSkillSchema.partial();

export type UpdateSkillData = z.infer<typeof updateSkillSchema>;

export type CreateSkillData = z.infer<typeof createSkillSchema>;
