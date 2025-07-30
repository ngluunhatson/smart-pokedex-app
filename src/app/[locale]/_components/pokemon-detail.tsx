import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { PokemonClient } from "pokenode-ts";

interface PokemonDetailProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  pokeName?: string | string[] | undefined;
}

const pokemonClient = new PokemonClient();

export async function PokemonDetail({
  className,
  pokeName,
  ...props
}: PokemonDetailProps) {
  const t = await getTranslations("pokemon-detail");

  if (!pokeName || typeof pokeName !== "string") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-2xl font-bold">{t("pick-a-pokemon-text")}</span>
      </div>
    );
  }

  const pokemon = await pokemonClient
    .getPokemonByName(pokeName)
    .catch(() => {
      return pokemonClient.getPokemonFormByName(pokeName);
    })
    .catch(() => null);

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
