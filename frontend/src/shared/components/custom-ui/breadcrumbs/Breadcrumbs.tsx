import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

interface Props {
  title: string;
  href: string;
}

export function Breadcrumbs({ title, href }: Props) {
  return (
    <div className="mb-5 flex gap-2">
      <Link href={href} className="flex gap-1">
        <ArrowLeftIcon width={14} />
        <span>Back</span>
      </Link>
      <span className="font-medium">/ {title}</span>
    </div>
  );
}
