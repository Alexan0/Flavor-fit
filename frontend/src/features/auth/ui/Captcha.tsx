"use client";

import type { Dispatch, Ref, SetStateAction } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

interface Props {
  ref: Ref<TurnstileInstance | null>;
  setCaptchaToken: Dispatch<SetStateAction<string | null>>;
}

export function Captcha({ ref, setCaptchaToken }: Props) {
  return (
    <div className="flex justify-center pt-2">
      <Turnstile
        ref={ref}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken(null)}
        options={{ theme: "light", language: "en" }}
      />
    </div>
  );
}
