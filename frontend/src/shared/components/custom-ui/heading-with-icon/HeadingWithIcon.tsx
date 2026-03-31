import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils";

interface Props {
  Icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function HeadingWithIcon({ Icon, children, className }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="opacity-60" />
      <h1 className={cn("text-lg font-semibold", className)}>{children}</h1>
    </div>
  );
}
