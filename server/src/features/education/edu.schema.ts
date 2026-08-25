import { z } from "zod";

const optionalUrl = z.string().url().or(z.literal("")).optional();

export const createEducationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  course: z.string().min(1, "Course is required"),
  description: z.string().min(1, "Description is required"),
  skills: z.array(z.string()),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  logoUrl: optionalUrl,
});

export const UpdateExperienceSchema = createEducationSchema.partial();

export type createEducationData = z.infer<typeof createEducationSchema>;

export type updateEducationData = z.infer<typeof UpdateExperienceSchema>;
