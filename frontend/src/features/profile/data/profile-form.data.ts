import { ActivityLevel, Gender, NutritionGoal } from "@/__generated__/graphql";

export const GENDER_OPTIONS = [
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" }
];

export const NUTRITION_GOAL_OPTIONS = [
  { value: NutritionGoal.Maintenance, label: "Maintenance" },
  { value: NutritionGoal.MuscleGain, label: "Muscle Gain" },
  { value: NutritionGoal.WeightLoss, label: "Weight Loss" }
];

export const ACTIVITY_LEVEL_OPTIONS = [
  { value: ActivityLevel.Sedentary, label: "Sedentary (little or no exercise)" },
  { value: ActivityLevel.Light, label: "Light (light exercise 1–2 times/week)" },
  { value: ActivityLevel.Moderate, label: "Moderate (moderate exercise 3–5 times/week)" },
  { value: ActivityLevel.Active, label: "Active (intense exercise 6–7 times/week)" },
  { value: ActivityLevel.VeryActive, label: "Very Active (daily intense training or physical work)" }
];
