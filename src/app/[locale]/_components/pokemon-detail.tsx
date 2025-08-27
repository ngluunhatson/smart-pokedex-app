"use client";

import { Loader } from "@/components";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";

interface PokemonDetailProps extends React.ComponentProps<"div"> {
  pokemonId?: Id<"pokemons">;
}

export function PokemonDetail({
  pokemonId,
  className,
  ...props
}: PokemonDetailProps) {
  const t = useTranslations("pokemon-detail");
  const pokemon = useQuery(api.pokemons.getPokemonById, {
    id: pokemonId,
  });

  if (!pokemonId) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-2xl font-bold">{t("pick-a-pokemon-text")}</span>
      </div>
    );
  }

  if (pokemon === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8" />
          <span className="text-muted-foreground text-sm">
            {t("pokemon-loading-text")}
          </span>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-2xl font-bold">
          {t("pokemon-not-found-text")}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{pokemon.name}</h1>
      </div>
    </div>
  );
}
