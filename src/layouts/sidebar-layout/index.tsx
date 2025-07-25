"use client";

import { Sidebar, SidebarProps } from "@/components";
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib";
import { createContext, useCallback, useContext, useRef } from "react";

interface SidebarLayoutContextType {
  isMobile: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
  onSidebarOpenChange: (isOpen: boolean) => void;
}

const SidebarLayoutContext = createContext<SidebarLayoutContextType | null>(
  null,
);

function useSidebarLayoutContext() {
  const context = useContext(SidebarLayoutContext);
  if (!context) {
    throw new Error(
      "SidebarLayout components must be used within SidebarLayout",
    );
  }
  return context;
}

interface SidebarLayoutProps extends React.ComponentProps<"div"> {
  mobileWidthThreshold?: number;
  children: React.ReactNode;
}

export function SidebarLayout({
  mobileWidthThreshold,
  className,
  children,
  ...props
}: SidebarLayoutProps) {
  const isMobile = useIsMobile(mobileWidthThreshold);
  const contentRef = useRef<HTMLDivElement>(null);

  const onSidebarOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!contentRef?.current) {
        return;
      }
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
    [isMobile],
  );

  const contextValue: SidebarLayoutContextType = {
    isMobile,
    contentRef,
    onSidebarOpenChange,
  };

  return (
    <SidebarLayoutContext.Provider value={contextValue}>
      <div className={cn("flex h-full w-full", className)} {...props}>
        {children}
      </div>
    </SidebarLayoutContext.Provider>
  );
}

interface SidebarLayoutPanelProps
  extends Omit<SidebarProps, "onSidebarOpenChange"> {
  children: React.ReactNode;
}

export function SidebarLayoutPanel({
  children,
  ...sidebarProps
}: SidebarLayoutPanelProps) {
  const { onSidebarOpenChange } = useSidebarLayoutContext();

  return (
    <Sidebar onSidebarOpenChange={onSidebarOpenChange} {...sidebarProps}>
      {children}
    </Sidebar>
  );
}

interface SidebarLayoutContentProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function SidebarLayoutContent({
  children,
  className,
  ...props
}: SidebarLayoutContentProps) {
  const { contentRef } = useSidebarLayoutContext();

  return (
    <div
      ref={contentRef}
      className={cn("bg-primary/10 flex-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}
