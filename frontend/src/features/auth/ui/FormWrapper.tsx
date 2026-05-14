import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export function FormWrapper({ title, children }: Props) {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="relative w-sm rounded-lg bg-linear-to-tr from-[#8062ee] to-[#a088fc] p-5 text-white shadow-lg">
        <h1 className="mb-6 text-center text-4xl font-bold">{title}</h1>
        {children}
      </div>
    </main>
  );
}
