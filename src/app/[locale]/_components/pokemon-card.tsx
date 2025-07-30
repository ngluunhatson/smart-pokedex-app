import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
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
          <span className="h-6 text-lg">
            {standardizeString(pokemon.name ?? "")}
          </span>
          <span className="text-muted-foreground text-sm">
            {standardizeString(pokemon.formName ?? "")}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {pokemon.types.map((type) => (
            <Tooltip key={type.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Image
                  src={`/images/type-icons/${type.name.toLowerCase()}.svg`}
                  width={24}
                  height={24}
                  alt={`${type.name} type`}
                  className="h-6 w-6"
                />
              </TooltipTrigger>
              <TooltipContent>
                <span>{standardizeString(type.name)}</span>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
      <span className="text-muted-foreground absolute top-2 right-2 text-sm">
        {pokemon.displayId || pokemon.id}
      </span>
    </div>
  );
}
