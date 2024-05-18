import { z } from "zod";

export const validationSchema = z.object({
  code: z.string().length(6, "Verification Code must be of 6 characters"),
});

export type validationSchemaType = z.infer<typeof validationSchema>;
