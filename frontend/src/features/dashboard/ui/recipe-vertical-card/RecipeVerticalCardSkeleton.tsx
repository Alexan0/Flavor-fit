import { SkeletonLoader } from "@/shared/components/custom-ui/skeleton-loader/SkeletonLoader";

export function RecipeVerticalCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white px-6 py-4">
      <SkeletonLoader className="h-60" />
      <div className="flex-1 overflow-auto">
        <SkeletonLoader className="mt-4" />
        <SkeletonLoader className="mt-3 h-16" />
        <div className="mt-2 flex items-center gap-1">
          <SkeletonLoader count={3} className="mb-0 h-6 w-18" />
        </div>
        <div className="mt-6">
          <span className="font-semibold">Ingredients</span>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <SkeletonLoader count={4} className="mb-0 h-18 w-18" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <SkeletonLoader className="mb-0 h-6 w-20" />
          <div className="flex items-center gap-2">
            <SkeletonLoader count={2} className="mb-0 h-6 w-18" />
          </div>
        </div>
      </div>
      <SkeletonLoader className="mt-4 rounded-3xl border py-6" />
    </div>
  );
}
