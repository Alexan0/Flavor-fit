import { z } from "zod";

export const authFormSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string()
    .refine((val) => val.length >= 6, { message: "Password must contain at least 6 characters" })
    .min(6)
});
