import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { PokemonClient } from "pokenode-ts";

interface PokemonDetailProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  pokeId?: string | string[] | undefined;
}

const pokemonClient = new PokemonClient();

export async function PokemonDetail({
  pokeId: inputPokeId,
  className,
  ...props
}: PokemonDetailProps) {
  const t = await getTranslations("pokemon-detail");

  const pokeId = parseInt(
    Array.isArray(inputPokeId) ? inputPokeId[0] : (inputPokeId ?? ""),
  );
  if (!pokeId || isNaN(pokeId)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-2xl font-bold">{t("pick-a-pokemon-text")}</span>
      </div>
    );
  }

  const pokemon = await pokemonClient.getPokemonById(pokeId).catch(() => {
    return pokemonClient.getPokemonFormById(pokeId);
  });

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {pokemon ? (
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{pokemon.name}</h1>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-2xl font-bold">{t("pick-a-pokemon-text")}</span>
        </div>
      )}
    </div>
  );
}
