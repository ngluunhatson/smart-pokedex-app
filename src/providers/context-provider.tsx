"use client";

import { Id } from "@/convex/_generated/dataModel";
import { createContext, ReactNode } from "react";

interface AppContextType {
  offset: number;
  limit: number;
  pokemonId?: Id<"pokemons">;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

export function AppProvider({ children, searchParams }: AppProviderProps) {
  const { offset, limit, pokemonId } = searchParams;

  const currentOffset =
    typeof offset === "string" && !isNaN(parseInt(offset))
      ? parseInt(offset)
      : 0;
  const currentLimit =
    typeof limit === "string" && !isNaN(parseInt(limit))
      ? parseInt(limit)
      : 100;

  const currentPokemonId =
    typeof pokemonId === "string" ? (pokemonId as Id<"pokemons">) : undefined;
  return (
    <AppContext.Provider
      value={{
        offset: currentOffset,
        limit: currentLimit,
        pokemonId: currentPokemonId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
