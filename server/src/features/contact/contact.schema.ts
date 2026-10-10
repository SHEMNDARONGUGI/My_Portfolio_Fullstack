import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.email("Enter a valid email address"),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export type ContactMessageData = z.infer<typeof contactMessageSchema>;
