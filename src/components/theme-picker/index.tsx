"use client";

import { cn, ThemeEnum } from "@/lib";
import { LucidePalette } from "lucide-react";
import { useTheme } from "next-themes";
import { Badge } from "../badge";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../dropdown-menu";

interface ThemePickerProps {
  dropdownLabel?: string;
  button?: {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
    className?: string;
    srText?: string;
  };
  iconSize?: number;
}

export function ThemePicker({
  button,
  iconSize,
  dropdownLabel,
}: ThemePickerProps) {
  const { setTheme } = useTheme();
  const themeArray = [
    ThemeEnum.DEFAULT,
    ThemeEnum.BLUE,
    ThemeEnum.GREEN,
    ThemeEnum.ORANGE,
    ThemeEnum.RED,
    ThemeEnum.ROSE,
    ThemeEnum.YELLOW,
    ThemeEnum.VIOLET,
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          aria-label={button?.srText ?? "Open Theme Picker"}
          {...button}
        >
          <LucidePalette size={iconSize} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2" align="start">
        <DropdownMenuLabel>
          {dropdownLabel ?? "Pick Theme Color"}
        </DropdownMenuLabel>
        <DropdownMenuGroup className="pr-2 pl-2">
          <div className="grid grid-cols-12 gap-3">
            {themeArray.map((themeKey) => (
              <Button
                key={themeKey}
                className={cn(
                  "col-span-4 w-full justify-start border-2 p-2",
                  themeKey,
                  themeKey === ThemeEnum.DEFAULT &&
                    "dark:border-accent dark:text-accent dark:hover:text-primary",
                )}
                variant="outline"
                aria-label={`Pick ${themeKey} theme`}
                onClick={() => {
                  setTheme((previousTheme) => {
                    if (previousTheme.includes("dark")) {
                      return previousTheme.replace(
                        previousTheme.slice(0, -5),
                        themeKey,
                      );
                    } else {
                      return themeKey;
                    }
                  });
                }}
              >
                <Badge
                  className={cn(
                    "h-4 w-4 rounded-full",
                    themeKey === ThemeEnum.DEFAULT && "dark:border-accent",
                  )}
                ></Badge>
                {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
              </Button>
            ))}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
