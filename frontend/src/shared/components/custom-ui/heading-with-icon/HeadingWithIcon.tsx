import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  Icon: LucideIcon;
  children: ReactNode;
}

export function HeadingWithIcon({ Icon, children }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="opacity-45" />
      <h1 className="text-lg font-semibold">{children}</h1>
    </div>
  );
}
