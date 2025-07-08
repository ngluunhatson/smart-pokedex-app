"use client";

import { Sidebar, SidebarProps } from "@/components";
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib";
import { useCallback, useRef } from "react";

interface SidebarLayoutProps extends React.ComponentProps<"div"> {
  mobileWidthThreshold?: number;
  sidebar?: SidebarProps;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

export function SidebarLayout({
  mobileWidthThreshold,
  className,
  sidebar: {
    onSidebarOpenChange: onSidebarOpenChangeProp,
    ...otherSidebarProps
  } = {},
  children,
  contentClassName,
  contentStyle,
  ...props
}: SidebarLayoutProps) {
  const isMobile = useIsMobile(mobileWidthThreshold);
  const contentRef = useRef<HTMLDivElement>(null);

  const onSidebarOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!contentRef?.current) {
        return;
      }
      onSidebarOpenChangeProp?.(isOpen);
      contentRef.current.style.display = "block";

      if (isOpen && isMobile) {
        contentRef.current.style.display = "none";
        return;
      }

      if (!isOpen) {
        contentRef.current.style.padding = "48px 0 0 16px";
      } else {
        contentRef.current.style.padding = "16px";
      }
    },
    [isMobile, onSidebarOpenChangeProp, contentRef],
  );

  return (
    <div className={cn("flex h-full w-full", className)} {...props}>
      <Sidebar
        onSidebarOpenChange={onSidebarOpenChange}
        {...otherSidebarProps}
      />
      <div
        ref={contentRef}
        className={cn("bg-primary/10 flex-1", contentClassName)}
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  );
}
