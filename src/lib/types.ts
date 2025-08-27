import { Id } from "@/convex/_generated/dataModel";
import { type Pokemon, type PokemonForm } from "pokenode-ts";

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

export type ParsedPokemon = {
  name: string;
  types: { name: string; id: string }[];
  species: string;
  moves: {
    name: string;
    id: string;
    versionGroupDetails: {
      name: string;
      id: string;
      levelLearnedAt: number;
      learnMethod: string;
    }[];
  }[];
  abilities: {
    name: string;
    id: string;
  }[];
  stats: {
    name: string;
    id: string;
    baseStat: number;
    effort: number;
  }[];
};

export type PokemonFormWithPokemon = Omit<PokemonForm, "pokemon"> & {
  pokemon: Pokemon;
};
