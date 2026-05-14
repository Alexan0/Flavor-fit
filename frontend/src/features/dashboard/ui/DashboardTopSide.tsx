"use client";

import { Search } from "lucide-react";

import { InputLabel } from "@/shared/components/custom-ui/with-label/InputLabel";
import { useAuth } from "@/shared/hooks/useAuth";

export function DashboardTopSide() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-6">
      <div>
        <h1 className="text-3xl">
          Hello, <b>{user?.profile?.fullName}</b>
        </h1>
        <p className="text-md">
          You have <b>8</b> activities today
        </p>
      </div>
      <InputLabel name="dashboard search" Icon={Search} placeholder="Search by recipes and more" className="h-11" />
    </div>
  );
}
