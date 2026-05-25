import { SkeletonLoader } from "@/shared/components/custom-ui/skeleton-loader/SkeletonLoader";

export function DashboardSkeleton() {
  return (
    <>
      <SkeletonLoader className="h-full rounded-3xl p-4" />
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-6">
          <SkeletonLoader count={2} className="h-full rounded-3xl p-4" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <SkeletonLoader count={3} className="h-full rounded-3xl p-4" />
        </div>
      </div>
    </>
  );
}
