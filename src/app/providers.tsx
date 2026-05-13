"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AdsenseLoader } from "@/components/adsense-loader";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AdsenseLoader />
      {children}
    </SessionProvider>
  );
}
