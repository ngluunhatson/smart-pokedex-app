"use client";

import { redirect, usePathname } from "@/i18n/navigation";
import { LocaleEnum } from "@/lib";
import { LucideGlobe } from "lucide-react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../dropdown-menu";

interface LocalePickerProps {
  dropdownLabel?: string;
  button?: {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
    className?: string;
    srText?: string;
  };
  iconSize?: number;
  localeTitleMap: Record<LocaleEnum, string>;
}

export function LocalePicker({
  dropdownLabel,
  button,
  iconSize = 24,
  localeTitleMap,
}: LocalePickerProps) {
  const currentPathName = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          aria-label={button?.srText ?? "Open Localization Picker"}
          {...button}
        >
          <LucideGlobe size={iconSize} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2" align="start">
        <DropdownMenuLabel>
          {dropdownLabel ?? "Pick Localization"}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {Object.values(LocaleEnum).map((locale) => (
            <DropdownMenuItem
              key={`locale-${locale}`}
              onClick={() => redirect({ locale, href: currentPathName })}
            >
              {localeTitleMap[locale]}

              <DropdownMenuShortcut>
                {locale.toUpperCase()}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
