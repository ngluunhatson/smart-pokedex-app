"use client";

import { createContext, ReactNode, useContext } from "react";

interface PaginationContextType {
  currentOffset: number;
  currentLimit: number;
}

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined,
);

interface PaginationProviderProps {
  children: ReactNode;
  currentOffset?: number;
  currentLimit?: number;
}

export function PaginationProvider({
  children,
  currentOffset = 0,
  currentLimit = 100,
}: PaginationProviderProps) {
  const value = {
    currentOffset: currentOffset,
    currentLimit: currentLimit,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
}

export function usePaginationContext() {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider",
    );
  }
  return context;
}
