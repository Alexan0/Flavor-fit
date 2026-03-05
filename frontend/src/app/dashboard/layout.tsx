import type { PropsWithChildren } from "react";

import { Header } from "@/features/layout/header/Header";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="h-screen p-5">
      <Header />
      {children}
    </div>
  );
}
