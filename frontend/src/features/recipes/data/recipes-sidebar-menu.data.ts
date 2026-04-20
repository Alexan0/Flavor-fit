import { Apple, ChefHat, CookingPot, MonitorCog, Pill } from "lucide-react";

import type { ISidebarMenuAccordionItem } from "@/shared/components/custom-ui/sidebar-menu-accordion/sidebar-menu-accordion.types";

import type { TRecipeFilters } from "../types/recipes-sidebar-menu.types";

import { Cuisine, DietaryPreference, HealthGoal, MealType, SpecialOccasion } from "@/__generated__/graphql";

export const recipeSidebarMenuData: ISidebarMenuAccordionItem<keyof TRecipeFilters>[] = [
  {
    icon: CookingPot,
    name: "Meal Type",
    key: "mealType",
    isInitialOpen: true,
    children: [
      {
        label: "Breakfast",
        value: MealType.Breakfast
      },
      {
        label: "Lunch",
        value: MealType.Lunch,
        badgeValue: "+1"
      },
      {
        label: "Dinner",
        value: MealType.Dinner
      },
      {
        label: "Snack",
        value: MealType.Snack
      },
      {
        label: "Dessert",
        value: MealType.Dessert
      },
      {
        label: "Drinks",
        value: MealType.Drinks
      }
    ]
  },
  {
    icon: Apple,
    name: "Dietary Preferences",
    key: "dietaryPreference",
    isInitialOpen: true,
    children: [
      {
        label: "Vegetarian",
        value: DietaryPreference.Vegetarian
      },
      {
        label: "Low-Carb",
        value: DietaryPreference.LowCarb,
        badgeValue: "+2"
      },
      {
        label: "Gluten-Free",
        value: DietaryPreference.GlutenFree
      },
      {
        label: "Keto",
        value: DietaryPreference.Keto
      },
      {
        label: "Dairy-Free",
        value: DietaryPreference.DairyFree
      }
    ]
  },
  {
    icon: Pill,
    name: "Health Goals",
    key: "healthGoal",
    children: [
      {
        label: "Weight Loss",
        value: HealthGoal.WeightLoss
      },
      {
        label: "Muscle Gain",
        value: HealthGoal.MuscleGain
      },
      {
        label: "Heart Health",
        value: HealthGoal.HeartHealth
      }
    ]
  },
  {
    icon: ChefHat,
    name: "Cuisine",
    key: "cuisine",
    children: [
      {
        label: "Russian",
        value: Cuisine.Russian
      },
      {
        label: "Italian",
        value: Cuisine.Italian
      },
      {
        label: "Chinese",
        value: Cuisine.Chinese
      },
      {
        label: "Mexican",
        value: Cuisine.Mexican
      },
      {
        label: "Indian",
        value: Cuisine.Indian
      },
      {
        label: "French",
        value: Cuisine.French
      }
    ]
  },
  {
    icon: MonitorCog,
    name: "Special Occasions",
    key: "specialOccasion",
    children: [
      {
        label: "Holiday",
        value: SpecialOccasion.Holiday
      },
      {
        label: "Birthday",
        value: SpecialOccasion.Birthday
      },
      {
        label: "Anniversary",
        value: SpecialOccasion.Anniversary
      },
      {
        label: "Party",
        value: SpecialOccasion.Party
      }
    ]
  }
];
