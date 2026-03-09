import { z } from "zod";

import { ActivityLevel, Gender, NutritionGoal } from "@/__generated__/graphql";

const profileSchema = z
  .object({
    fullName: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
    gender: z.enum(Gender).optional().nullable(),
    age: z.coerce.number<number>().min(0, "Value must be 0 or greater").optional().nullable()
  })
  .optional()
  .nullable();

const bodyMeasurementsSchema = z
  .object({
    heightCm: z.coerce.number<number>().min(0, "Value must be 0 or greater").optional().nullable(),
    weightCm: z.coerce.number<number>().min(0, "Value must be 0 or greater").optional().nullable(),
    waistCm: z.coerce.number<number>().min(0, "Value must be 0 or greater").optional().nullable(),
    chestCm: z.coerce.number<number>().min(0, "Value must be 0 or greater").optional().nullable(),
    thighCm: z.coerce.number<number>().min(0, "Value must be 0 or greater").optional().nullable(),
    armCm: z.coerce.number<number>().min(0, "Value must be 0 or greater").optional().nullable(),
    goalWeightKg: z.coerce.number<number>().min(0, "Value must be 0 or greater").optional().nullable(),
    nutritionGoal: z.enum(NutritionGoal).optional().nullable(),
    activityLevel: z.enum(ActivityLevel).optional().nullable()
  })
  .optional()
  .nullable();

export const updateProfileSchema = z.object({
  email: z.email("Invalid email").optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  profile: profileSchema,
  measurements: bodyMeasurementsSchema
});
