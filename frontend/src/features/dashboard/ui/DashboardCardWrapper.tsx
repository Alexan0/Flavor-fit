import type { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface Props extends PropsWithChildren {
  Icon?: LucideIcon;
  title: string;
  subtitle?: string;
  link?: string;
  children: ReactNode;
}

export function DashboardCardWrapper({ Icon, title, subtitle, link, children }: Props) {
  return (
    <div className="h-full rounded-3xl bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="mb-4 flex items-center gap-2">
          {Icon && <Icon className="opacity-60" size={20} />}
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <span className="text-gray-400">{subtitle}</span>
        </div>
        {link && (
          <Link href={link}>
            <Button variant="soft" size="icon-xs">
              <ArrowUpRight className="opacity-60" />
            </Button>
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
