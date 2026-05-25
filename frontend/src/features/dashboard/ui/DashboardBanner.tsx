import Image from "next/image";
import { Plus } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

export function DashboardBanner() {
  return (
    <div className="flex flex-col rounded-3xl bg-linear-to-tr from-[#8062ee] to-[#a088fc] p-6">
      <Image width={200} height={150} src="/images/stars.svg" alt="stars" draggable={false} className="select-none" />
      <h3 className="text-3xl font-bold text-white italic">Got a Recipe That Rocks?</h3>
      <span className="mt-1 block flex-1 text-white opacity-70">
        Share It & Shine! Your recipe might just become the big hit!
      </span>
      <Button variant="default" className="mt-4 w-full rounded-3xl border bg-transparent py-6 text-white">
        <Plus />
        Add Recipe
      </Button>
    </div>
  );
}
