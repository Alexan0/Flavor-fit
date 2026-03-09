import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils";

import { Input } from "../../ui/input";

import { LabelIcon } from "./LabelIcon";

interface Props extends ComponentProps<"input"> {
  label: string;
  Icon?: LucideIcon;
  errorMessage?: string;
}

export function InputLabel({ label, Icon, errorMessage, className, ...props }: Props) {
  return (
    <label className="relative block">
      <LabelIcon label={label} Icon={Icon} />
      <Input
        className={cn(className, "mb-0 rounded-xl bg-[#f1f1f1]", Icon && "pl-9")}
        errorMessage={errorMessage}
        {...props}
      />
    </label>
  );
}
