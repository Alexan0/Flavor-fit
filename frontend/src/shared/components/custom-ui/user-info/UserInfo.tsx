import Image from "next/image";
import Link from "next/link";

import { PAGES } from "@/shared/config/page.config";

interface Props {
  avatarUrl?: string;
  name: string;
  email: string;
}

export function UserInfo({ avatarUrl = "", name, email }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Link href={PAGES.PROFILE} className="h-10 w-10">
        <Image src={avatarUrl} alt={name} width={40} height={40} className="h-full w-full rounded-full object-cover" />
      </Link>
      <div>
        <Link href={PAGES.PROFILE} className="font-medium">
          {name}
        </Link>
        <p className="test-xs max-w-62.5 overflow-hidden text-ellipsis opacity-60">{email}</p>
      </div>
    </div>
  );
}
