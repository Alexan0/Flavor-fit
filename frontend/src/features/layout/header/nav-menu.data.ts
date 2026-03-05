import { BookMarked, CalendarDays, ChartColumn, HouseIcon, Store, User, Utensils } from "lucide-react";

import type { IMenuItem } from "@/shared/components/custom-ui/nav-menu/nav-menu.types";
import { PAGES } from "@/shared/config/page.config";

export const HEADER_MENU: IMenuItem[] = [
  {
    icon: HouseIcon,
    label: "Home",
    href: PAGES.DASHBOARD
  },
  {
    icon: CalendarDays,
    label: "Meal Plans",
    href: PAGES.MEAL_PLANS
  },
  {
    icon: Utensils,
    label: "Nutrition",
    href: PAGES.NUTRITION
  },
  {
    icon: ChartColumn,
    label: "Analytics",
    href: PAGES.ANALYTICS
  },
  {
    icon: Store,
    label: "Order Groceries",
    href: PAGES.ORDER_GROCERIES
  },
  {
    icon: BookMarked,
    label: "Recipes",
    href: PAGES.RECIPES
  },
  {
    icon: User,
    label: "Profile",
    href: PAGES.PROFILE
  }
];
