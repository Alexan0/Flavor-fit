import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils";

import { Input } from "../../ui/input";

import { LabelIcon } from "./LabelIcon";

interface Props extends ComponentProps<"input"> {
  label?: string;
  Icon?: LucideIcon;
  errorMessage?: string;
  parentClassName?: string;
}

export function InputLabel({ label, Icon, errorMessage, className, parentClassName, ...props }: Props) {
  return (
    <label className={cn("relative block", parentClassName)}>
      <LabelIcon label={label} Icon={Icon} />
      <Input
        className={cn("mb-0 rounded-xl bg-[#f1f1f1]", Icon && "pl-9", className)}
        errorMessage={errorMessage}
        {...props}
      />
    </label>
  );
}
