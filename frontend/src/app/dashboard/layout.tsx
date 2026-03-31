import type { PropsWithChildren } from "react";

import { Header } from "@/features/layout/header/Header";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="h-screen p-5">
      <Header />
      <div className="mt-10 h-[calc(100%-108px)] gap-6">{children}</div>
    </div>
  );
}
