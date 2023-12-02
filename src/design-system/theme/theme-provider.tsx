"use client";



import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

import useIsComponentMounted from "../hooks/useIsComponentMounted";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const isMounted = useIsComponentMounted();

  if (!isMounted) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
