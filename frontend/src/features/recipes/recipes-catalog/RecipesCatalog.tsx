"use client";

import { BookHeart, Star } from "lucide-react";

import { RecipeCarousel } from "@/features/recipe-carousel/RecipeCarousel";

export function RecipesCatalog() {
  return (
    <div>
      <RecipeCarousel title="Recommended" Icon={BookHeart} />
      <RecipeCarousel title="Popular" Icon={Star} />
    </div>
  );
}
