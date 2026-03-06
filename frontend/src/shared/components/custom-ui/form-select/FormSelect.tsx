import { Controller, useFormContext } from "react-hook-form";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

type Option = {
  label: string;
  value: string;
};

interface Props {
  name: string;
  placeholder?: string;
  options: Option[];
  Icon?: LucideIcon;
  label: string;
}

export function FormSelect({ name, options, placeholder, Icon, label }: Props) {
  const { control } = useFormContext();
  //TODO: add icon
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label className="relative block">
          <span className="mb-1 block text-sm opacity-50">{label}</span>
          {Icon && <Icon size={17} className="absolute bottom-2.5 left-3 z-1 opacity-50" />}
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} className={cn(Icon && "pl-9")} />
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
      )}
    />
  );
}
