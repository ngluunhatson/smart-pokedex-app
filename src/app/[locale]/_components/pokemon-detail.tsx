import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import { getTranslations } from "next-intl/server";

interface PokemonDetailProps extends React.ComponentProps<"div"> {
  pokemonId?: Id<"pokemons">;
}

export async function PokemonDetail({
  pokemonId,
  className,
  ...props
}: PokemonDetailProps) {
  const t = await getTranslations("pokemon-detail");
  const pokemon = await fetchQuery(api.pokemons.getPokemonById, {
    id: pokemonId,
  });

  if (!pokemonId) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-2xl font-bold">{t("pick-a-pokemon-text")}</span>
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
