"use client";

import Link from "next/link";
import { Bell, Headset } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Logout } from "@/features/auth/ui/Logout";

import { NavMenu } from "@/shared/components/custom-ui/nav-menu/NavMenu";
import { UserInfo } from "@/shared/components/custom-ui/user-info/UserInfo";
import { Button } from "@/shared/components/ui/button";
import { PAGES } from "@/shared/config/page.config";

import { HEADER_MENU } from "./nav-menu.data";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link
          href={PAGES.DASHBOARD}
          className="from-primary to-primary-dark flex size-9 items-center justify-center rounded-full bg-linear-to-b text-xl font-black text-white"
        >
          F
        </Link>
        <NavMenu menu={HEADER_MENU} />
      </div>
      <div className="relative flex items-center">
        <Button variant="soft" size="icon" className="mr-2 rounded-full">
          <Headset className="size-5" />
        </Button>
        <Button variant="soft" size="icon" className="mr-2 rounded-full">
          <Bell className="size-5" />
        </Button>
        <Logout />
        <UserInfo avatarUrl="https://avatars.githubusercontent.com/u/0?v=1" name="Alex" email={user?.email || ""} />
        {!user?.isEmailVerified && <p className="absolute -top-4 left-0 text-sm text-red-400">Email not confirmed!</p>}
      </div>
    </header>
  );
}
