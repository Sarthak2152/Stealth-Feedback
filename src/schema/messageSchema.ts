import { z } from "zod";
export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(300, "Message should be at most 300 characters"),
});

export type messageSchemaType = z.infer<typeof messageSchema>;
