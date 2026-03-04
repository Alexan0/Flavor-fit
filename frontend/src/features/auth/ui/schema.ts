import { z } from "zod";

export const passwordValidationSchema = z
  .string()
  .refine((val) => val.length >= 6, { message: "Password must contain at least 6 characters" })
  .min(6);

export const emailValidationSchema = z.email("Invalid email");

export const authFormSchema = z.object({
  email: emailValidationSchema,
  password: passwordValidationSchema
});

export const forgotPasswordSchema = z.object({
  email: emailValidationSchema
});

export const resetPasswordSchema = z
  .object({
    password: passwordValidationSchema,
    repeatPassword: passwordValidationSchema
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"]
  });
