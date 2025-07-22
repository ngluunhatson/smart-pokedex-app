import { cn, PokemonUI, standardizeString } from "@/lib";
import Image from "next/image";

interface PokemonCardProps extends React.ComponentProps<"div"> {
  pokemon: PokemonUI;
}

export function PokemonCard({
  pokemon,
  className,
  ...props
}: PokemonCardProps) {
  return (
    <div
      className={cn(
        "hover:bg-primary flex h-[100px] w-full gap-2 p-2 transition-colors duration-200 ease-in-out",
        className,
      )}
      {...props}
    >
      <Image
        src={pokemon.imageUrl}
        width={100}
        height={100}
        alt={pokemon.name ?? ""}
      />
      <div>{standardizeString(pokemon.name ?? "")}</div>
      {standardizeString(pokemon.formName ?? "")}
      {pokemon.id}
    </div>
  );
}
