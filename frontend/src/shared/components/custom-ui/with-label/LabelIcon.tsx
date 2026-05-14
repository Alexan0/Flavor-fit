import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils";

interface Props {
  label?: string;
  Icon?: LucideIcon;
}

export function LabelIcon({ label, Icon }: Props) {
  return (
    <>
      {!!label && <span className="mb-1 block text-sm opacity-50">{label}</span>}
      {!!Icon && <Icon size={17} className={cn("absolute top-2.5 left-3 z-1 opacity-50", !!label && "top-8.5")} />}
    </>
  );
}
