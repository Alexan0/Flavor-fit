import { Apple, ChefHat, CookingPot, MonitorCog, Pill } from "lucide-react";

import type { ISidebarMenuAccordionItem } from "@/shared/components/custom-ui/sidebar-menu-accordion/sidebar-menu-accordion.types";

export const recipeSidebarMenuData: ISidebarMenuAccordionItem[] = [
  {
    icon: CookingPot,
    name: "Meal Type",
    isInitialOpen: true,
    children: [
      {
        label: "Breakfast",
        value: "breakfast"
      },
      {
        label: "Lunch",
        value: "lunch",
        badgeValue: "+1"
      },
      {
        label: "Dinner",
        value: "dinner"
      },
      {
        label: "Snack",
        value: "snack"
      },
      {
        label: "Dessert",
        value: "dessert"
      },
      {
        label: "Drinks",
        value: "drinks"
      }
    ]
  },
  {
    icon: Apple,
    name: "Dietary Preferences",
    isInitialOpen: true,
    children: [
      {
        label: "Vegetarian",
        value: "vegetarian"
      },
      {
        label: "Low-Carb",
        value: "low-carb",
        badgeValue: "+2"
      },
      {
        label: "Gluten-Free",
        value: "gluten-free"
      },
      {
        label: "Keto",
        value: "keto"
      },
      {
        label: "Dairy-Free",
        value: "dairy-free"
      }
    ]
  },
  {
    icon: Pill,
    name: "Health Goals",
    children: [
      {
        label: "Weight Loss",
        value: "weight-loss"
      },
      {
        label: "Muscle Gain",
        value: "muscle-gain"
      },
      {
        label: "Heart Health",
        value: "heart-health"
      }
    ]
  },
  {
    icon: ChefHat,
    name: "Cuisine",
    children: [
      {
        label: "Russian",
        value: "russian"
      },
      {
        label: "Italian",
        value: "italian"
      },
      {
        label: "Chinese",
        value: "chinese"
      },
      {
        label: "Mexican",
        value: "mexican"
      },
      {
        label: "Indian",
        value: "indian"
      },
      {
        label: "French",
        value: "french"
      }
    ]
  },
  {
    icon: MonitorCog,
    name: "Special Occasions",
    children: [
      {
        label: "Holiday",
        value: "holiday"
      },
      {
        label: "Birthday",
        value: "birthday"
      },
      {
        label: "Anniversary",
        value: "anniversary"
      },
      {
        label: "Party",
        value: "party"
      }
    ]
  }
];
