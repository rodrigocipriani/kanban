"use client";

import { Button } from "@/design-system/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ds/ui/Tooltip";
import { useTheme } from "next-themes";
import { useState } from "react";
import useIsComponentMounted from "../hooks/useIsComponentMounted";
import Icon from "../ui/Icon";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsComponentMounted();
  const [currentTheme, setCurrentTheme] = useState(theme);

  if (!isMounted) {
    return null;
  }

  const nextTheme =
    currentTheme === "light"
      ? "dark"
      : currentTheme === "dark"
      ? "system"
      : "light";

  const cycleTheme = () => {
    const nextTheme =
      currentTheme === "light"
        ? "dark"
        : currentTheme === "dark"
        ? "system"
        : "light";
    setCurrentTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={cycleTheme}>
            {currentTheme === "light" && <Icon icon="sun" />}
            {currentTheme === "dark" && <Icon icon="moon" />}
            {currentTheme === "system" && (
              <span>
                <Icon icon="sun" size="xs" />
                <Icon icon="moon" size="xs" />
              </span>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Current theme is {currentTheme} <br /> Click to change theme to{" "}
            {nextTheme}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
