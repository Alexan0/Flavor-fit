import * as React from "react";

import { cn } from "@/shared/utils";

import { ErrorMessage } from "../ErrorMessage";

interface InputProps extends React.ComponentProps<"input"> {
  errorMessage?: string;
}

function Input({ className, type, errorMessage, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground/60 placeholder:text-foreground/60 selection:bg-primary selection:text-primary-foreground text-foreground border-input h-9 w-full min-w-0 rounded-md border bg-white/85 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-white/50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mb-2.5 focus-visible:border-white",
          className
        )}
        {...props}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}

export { Input };
