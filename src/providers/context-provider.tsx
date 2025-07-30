"use client";

import { createContext, ReactNode } from "react";

interface AppContextType {
  offset: number;
  limit: number;
  pokeId?: string;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

export function AppProvider({ children, searchParams }: AppProviderProps) {
  const { offset, limit, pokeId } = searchParams;

  const currentOffset =
    typeof offset === "string" && !isNaN(parseInt(offset))
      ? parseInt(offset)
      : 0;
  const currentLimit =
    typeof limit === "string" && !isNaN(parseInt(limit))
      ? parseInt(limit)
      : 100;

  const currentId = typeof pokeId === "string" ? pokeId : undefined;

  return (
    <AppContext.Provider
      value={{
        offset: currentOffset,
        limit: currentLimit,
        pokeId: currentId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
