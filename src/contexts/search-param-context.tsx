"use client";

import { createContext, ReactNode, useContext } from "react";

interface SearchParamContextType {
  currentOffset: number;
  currentLimit: number;
  currentId?: string;
}

const SearchParamContext = createContext<SearchParamContextType | undefined>(
  undefined,
);

interface SearchParamProviderProps {
  children: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

export function SearchParamProvider({
  children,
  searchParams,
}: SearchParamProviderProps) {
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
    <SearchParamContext.Provider
      value={{ currentOffset, currentLimit, currentId }}
    >
      {children}
    </SearchParamContext.Provider>
  );
}

export function useSearchParamContext() {
  const context = useContext(SearchParamContext);
  if (context === undefined) {
    throw new Error(
      "useSearchParamContext must be used within a SearchParamProvider",
    );
  }
  return context;
}
