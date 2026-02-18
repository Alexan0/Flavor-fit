import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";

import type { IMenuItem } from "./nav-menu.types";
import { NavMenuItem } from "./NavMenuItem";

interface Props {
  menu: IMenuItem[];
}

export function NavMenu({ menu }: Props) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2">
      {menu.map((item) => (
        <NavMenuItem key={item.href} isActive={!!match(item.href)(pathname)} menuItem={item} />
      ))}
    </nav>
  );
}
