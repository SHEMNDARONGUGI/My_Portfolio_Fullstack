import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()).default([]),
  icon: z.string().min(1, "Icon is required"),
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateServiceData = z.infer<typeof createServiceSchema>;
export type UpdateServiceData = z.infer<typeof updateServiceSchema>;
