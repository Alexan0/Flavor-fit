import type { Metadata } from "next";

import { RecipeDetails } from "@/features/recipe/ui/RecipeDetails";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "",
  ...NO_INDEX_PAGE
};

export default function Page() {
  return <RecipeDetails />;
}
