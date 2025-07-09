"use client";

import { LucideSunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../button";

interface DarkModeToggleProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  className?: string;
  iconSize?: number;
}

export function DarkModeToggle({
  variant,
  className,
  iconSize,
  onClick,
}: DarkModeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant={variant}
      className={className}
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
    >
      <LucideSunMoon size={iconSize} />
    </Button>
  );
}
