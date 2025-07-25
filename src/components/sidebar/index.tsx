"use client";

import { Button, ButtonProps, Icon } from "@/components";
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib";
import { LucideArrowLeft, LucideMenu } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useCallback, useEffect, useState } from "react";

interface SidebarButtonProps {
  type: "close" | "open";
  onClick?: () => void;
  srText?: string;
  button?: ButtonProps;
  icon?: React.ComponentProps<typeof DynamicIcon>;
}

export interface SidebarProps extends React.ComponentProps<"div"> {
  width?: number;
  mobileWidthThreshold?: number;
  openButton?: Omit<SidebarButtonProps, "type" | "onClick">;
  closeButton?: Omit<SidebarButtonProps, "type" | "onClick">;
  onSidebarOpenChange?: (isOpen: boolean) => void;
  variableForAutoCloseOnMobile?: string;
}

function SidebarButton({ type, onClick, button, icon }: SidebarButtonProps) {
  const SidebarButtonIcon = ({
    type,
    icon,
  }: Pick<SidebarButtonProps, "type" | "icon">) => {
    if (icon) return <Icon {...icon} />;

    if (type === "open") return <LucideMenu />;
    return <LucideArrowLeft />;
  };

  SidebarButtonIcon.displayName = "SidebarButtonIcon";

  const { className, ...otherButtonProps } = button ?? {};

  return (
    <Button
      size="icon"
      className={cn(
        "shadow-primary absolute top-2 right-2",
        type === "open" && "right-[-8px] translate-x-[36px]",
        className,
      )}
      variant="ghost"
      aria-label={type === "open" ? "Open sidebar" : "Close sidebar"}
      {...otherButtonProps}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
        button?.onClick?.(event);
      }}
    >
      <SidebarButtonIcon type={type} icon={icon} />
    </Button>
  );
}

export function Sidebar({
  width,
  mobileWidthThreshold,
  className,
  children,
  openButton,
  closeButton,
  onSidebarOpenChange,
  variableForAutoCloseOnMobile,
  ...props
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile(mobileWidthThreshold);

  const setSidebarOpen = useCallback(
    (newOpen: boolean) => {
      setIsOpen(newOpen);
      onSidebarOpenChange?.(newOpen);
    },
    [onSidebarOpenChange],
  );

  useEffect(() => {
    if (variableForAutoCloseOnMobile && isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(!isMobile);
    }
  }, [isMobile, setSidebarOpen, variableForAutoCloseOnMobile]);

  return (
    <div
      style={{ width: isOpen ? (isMobile ? "100%" : (width ?? 400)) : 0 }}
      className={cn(
        "relative flex transition-[width] duration-500 ease-in-out",
        isOpen &&
          cn(
            "bg-secondary border-r-primary/60 shadow-primary/60 h-full border-r-[1px] shadow-lg",
            className,
          ),
        !isOpen && "h-0 p-0",
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full transition-opacity duration-500 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      >
        {children}
      </div>

      <SidebarButton
        type={isOpen ? "close" : "open"}
        onClick={() => setSidebarOpen(!isOpen)}
        {...(isOpen ? openButton : closeButton)}
      />
    </div>
  );
}
