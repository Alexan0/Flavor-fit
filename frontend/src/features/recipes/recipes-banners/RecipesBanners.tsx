import Image from "next/image";
import { Plus, Utensils } from "lucide-react";

import { HeadingWithIcon } from "@/shared/components/custom-ui/heading-with-icon/HeadingWithIcon";
import { Button } from "@/shared/components/ui/button";

import { RECIPES_HEADING } from "./recipes-danners.data";

export function RecipesBanners() {
  return (
    <div className="grid grid-cols-[75%_25%]">
      <div className="mr-6 flex justify-between rounded-2xl bg-linear-to-tr from-[#8062ee] to-[#a088fc] px-8 py-4">
        <div className="flex items-center gap-8">
          <Image
            width={100}
            height={100}
            src="/images/burger.png"
            alt="burger"
            draggable={false}
            className="relative -top-0.5 -left-7 scale-150 select-none"
          />
          <div>
            <h3 className="text-3xl font-bold text-white italic">Got a Recipe That Rocks?</h3>
            <span className="mt-1 block text-white opacity-70">
              Share It & Shine! Your recipe might just become the big hit!
            </span>
            <div className="mt-4 flex items-center gap-2">
              {RECIPES_HEADING.map((item) => (
                <span key={item.label} className="rounded-sm bg-[#9C84F9] px-2 py-1 text-xs text-white">
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Button variant="soft" className="bg-white text-black hover:bg-white/90">
          <Plus />
          Add Recipe
        </Button>
      </div>
      <div className="rounded-2xl bg-white px-8 py-4">
        <HeadingWithIcon Icon={Utensils} className="text-sm">
          Your Recipes
        </HeadingWithIcon>
        <div className="mt-8 flex items-center justify-between">
          <div>
            <span className="text-4xl font-bold -tracking-wide italic">12</span>
            <span className="text-sm text-black/40">Created</span>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="-ml-4 cursor-pointer">
                <Image width={36} height={36} src="/images/burger.png" alt="burger" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
