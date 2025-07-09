"use client";

import { LucideSunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../button";

interface DarkModeToggleProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  button?: {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
    className?: string;
    srText?: string;
  };
  iconSize?: number;
}

export function DarkModeToggle({
  button,
  iconSize = 24,
  onClick,
}: DarkModeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      onClick={(event) => {
        if (!theme) {
          return;
        }
        onClick?.(event);
        if (theme.includes("dark")) {
          setTheme(theme.slice(0, -5));
        } else {
          setTheme(theme + "-dark");
        }
      }}
      aria-label={button?.srText ?? "Toggle dark mode"}
      {...button}
    >
      <LucideSunMoon size={iconSize} />
    </Button>
  );
}
