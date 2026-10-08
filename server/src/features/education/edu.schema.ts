import { z } from "zod";

const optionalImageUrl = z
  .string()
  .url()
  .or(z.string().regex(/^\/uploads\/[a-f0-9-]+\.(avif|gif|jpg|png|webp)$/i))
  .or(z.literal(""))
  .optional();

export const createEducationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  course: z.string().min(1, "Course is required"),
  description: z.string().min(1, "Description is required"),
  skills: z.array(z.string()),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  logoUrl: optionalImageUrl,
});

export const updateEducationSchema = createEducationSchema.partial();

export type CreateEducationData = z.infer<typeof createEducationSchema>;

export type UpdateEducationData = z.infer<typeof updateEducationSchema>;
