"use client";

import { Loader } from "@/components";
import { api } from "@/convex/_generated/api";
import { useAppContext } from "@/hooks";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";

export function PokemonDetail({
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children">) {
  const t = useTranslations("pokemon-detail");
  const { pokemonId } = useAppContext();
  const pokemon = useQuery(api.pokemons.getPokemonById, {
    id: pokemonId,
  });

  if (!pokemonId || typeof pokemonId !== "string") {
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
          <Loader size={48} />
          <span className="text-2xl font-bold">
            {t("pokemon-loading-text")}
          </span>
        </div>
      </div>
    );
  }

  if (pokemon === null) {
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
