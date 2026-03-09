import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

import { LabelIcon } from "./LabelIcon";

type Option = {
  label: string;
  value: string;
};

interface Props {
  value?: string;
  onChange: (value: string | null) => void;
  placeholder?: string;
  options: Option[];
  Icon?: LucideIcon;
  label: string;
}

export function SelectLabel({ value, onChange, options, placeholder, Icon, label }: Props) {
  return (
    <label className="relative block">
      <LabelIcon label={label} Icon={Icon} />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn("w-full", Icon && "pl-9")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
