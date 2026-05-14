import { CookingPot, MessageCircleMore } from "lucide-react";

import { SkeletonLoader } from "@/shared/components/custom-ui/skeleton-loader/SkeletonLoader";

export function RecipeSkeleton() {
  return (
    <>
      <SkeletonLoader className="mb-5 h-8 w-90" />
      <div className="grid h-[calc(100%-44px)] grid-cols-[3.5fr_1fr] gap-5">
        <div className="flex flex-col gap-6 overflow-auto rounded-3xl bg-white p-4">
          <div className="flex gap-6">
            <div className="flex-4">
              <SkeletonLoader className="h-104" />
            </div>
            <div className="flex-5">
              <div className="flex items-start justify-between gap-6">
                <SkeletonLoader className="mb-0" />
                <div className="flex items-center gap-2">
                  <SkeletonLoader count={3} className="mb-0 w-10" />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <SkeletonLoader count={4} className="mb-0 h-8 w-16" />
                </div>
                <div className="flex items-center gap-2">
                  <SkeletonLoader count={2} className="mb-0 h-8 w-24" />
                </div>
              </div>
              <div className="mt-6">
                <span className="font-semibold">Description:</span>
                <SkeletonLoader className="mt-1 mb-0 h-16" />
                <div className="mt-1 flex flex-wrap items-center gap-1">
                  <SkeletonLoader count={4} className="mb-0 h-4 w-16" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <SkeletonLoader count={4} className="mb-0 h-8 w-24" />
                </div>
              </div>
              <div className="mt-6">
                <span className="font-semibold">Ingredients:</span>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <SkeletonLoader count={4} className="mb-0 h-18 w-18" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CookingPot className="opacity-60" />
              <h3 className="text-lg font-semibold">Step-by-step preparation instruction:</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="w-60">
                  <SkeletonLoader className="mb-0 h-40" />
                  <SkeletonLoader className="mt-2 h-4 w-26" />
                  <SkeletonLoader className="mb-0 h-6" />
                  <SkeletonLoader className="mt-2 mb-0 h-10" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white px-6 py-4">
          <div className="flex items-center gap-2">
            <MessageCircleMore className="opacity-30" />
            <h3 className="text-lg font-semibold">Comments:</h3>
            <SkeletonLoader className="h-6 w-10" />
          </div>
          <div className="mt-2 ml-8 flex items-center gap-2">
            <SkeletonLoader className="mb-0 h-6 w-10" />
            <SkeletonLoader className="mb-0 h-6 w-10" />
          </div>
          <div className="mt-4 h-auto flex-1 overflow-auto">
            <SkeletonLoader count={5} className="mb-2.5 h-24 last:mb-0" />
          </div>
          <SkeletonLoader className="mt-6 h-13" />
        </div>
      </div>
    </>
  );
}
