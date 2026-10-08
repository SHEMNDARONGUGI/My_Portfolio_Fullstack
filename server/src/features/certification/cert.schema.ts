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

export const createCertificationSchema = z.object({
  imageUrl: optionalImageUrl,
  certSource: z.string().min(1, "Certificate source institution is required"),
  certTitle: z.string().min(1, "Certificate title is required"),
  description: z.string().min(1, "Description is required"),
  certLink: optionalUrl,
});

export const updateCertificationSchema = createCertificationSchema.partial();

export type UpdateCertificationData = z.infer<typeof updateCertificationSchema>;

export type CreateCertificationData = z.infer<typeof createCertificationSchema>;
