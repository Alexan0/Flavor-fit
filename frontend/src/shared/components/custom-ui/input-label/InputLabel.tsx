import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils";

import { Input } from "../../ui/input";

interface Props extends ComponentProps<"input"> {
  label: string;
  Icon?: LucideIcon;
}

export function InputLabel({ label, Icon, className, ...props }: Props) {
  return (
    <label className="relative block">
      <span className="mb-1 block text-sm opacity-50">{label}</span>
      {Icon && <Icon size={17} className="absolute bottom-5 left-3 z-1 opacity-50" />}
      <Input className={cn(className, "rounded-xl bg-[#f1f1f1]", Icon && "pl-9")} {...props} />
    </label>
  );
}
