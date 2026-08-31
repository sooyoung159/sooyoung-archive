"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AdsenseLoader } from "@/components/adsense-loader";
import { ThemeProvider } from "@/components/theme-provider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <AdsenseLoader />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
