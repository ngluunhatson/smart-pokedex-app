"use client";

import { createContext, ReactNode } from "react";

interface AppContextType {
  offset: number;
  limit: number;
  pokeName?: string;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

export function AppProvider({ children, searchParams }: AppProviderProps) {
  const { offset, limit, pokeName } = searchParams;

  const currentOffset =
    typeof offset === "string" && !isNaN(parseInt(offset))
      ? parseInt(offset)
      : 0;
  const currentLimit =
    typeof limit === "string" && !isNaN(parseInt(limit))
      ? parseInt(limit)
      : 100;

  const currentName = typeof pokeName === "string" ? pokeName : undefined;
  return (
    <AppContext.Provider
      value={{
        offset: currentOffset,
        limit: currentLimit,
        pokeName: currentName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
