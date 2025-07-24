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
        "hover:bg-primary/30 relative flex h-[100px] w-full gap-2 p-2",
        className,
      )}
      {...props}
    >
      <Image
        src={pokemon.imageUrl}
        width={100}
        height={80}
        alt={pokemon.name ?? ""}
      />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-[1px]">
          <span className="text-lg">
            {standardizeString(pokemon.name ?? "")}
          </span>
          <span className="text-muted-foreground text-sm">
            {standardizeString(pokemon.formName ?? "")}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {pokemon.types.map((type) => (
            <span
              key={type.id}
              className="bg-primary/20 rounded-full px-2 py-1 text-xs"
            >
              {standardizeString(type.name)}
            </span>
          ))}
        </div>
      </div>
      <span className="text-muted-foreground absolute top-2 right-2 text-sm">
        {pokemon.displayId || pokemon.id}
      </span>
    </div>
  );
}
