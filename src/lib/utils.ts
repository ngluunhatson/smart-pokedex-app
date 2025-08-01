import { Id } from "@/convex/_generated/dataModel";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type PokemonUI = {
  _id: Id<"pokemons">;
  pokeId: string;
  displayId?: string;
  name: string;
  formName?: string;
  types: { name: string; id: string }[];
  imageUrl: string;
  isFavorite?: boolean;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function standardizeString(str: string) {
  const strArray = str.split("-");

  return strArray
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function extractIdFromUrl(url: string, matchStr: string) {
  const escapedMatchStr = matchStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`/${escapedMatchStr}\/(\\d+)\/`);
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}
