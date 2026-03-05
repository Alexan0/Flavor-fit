import type { ActivityLevel, Gender, NutritionGoal } from "@/__generated__/graphql";

export interface IProfileForm {
  fullname: string;
  email: string;
  avatarUrl?: string;
  gender?: Gender;
  age?: number;
  bio?: string;
  heightCm?: number;
  weightKg?: number;
  goalWeightKg?: number;
  chestCm?: number;
  waistCm?: number;
  thighCm?: number;
  armCm?: number;
  activityLevel?: ActivityLevel;
  nutritionGoal?: NutritionGoal;
}
