import { defineSchema } from "convex/server";
import { pokemonMetadataTable } from "./schemas/pokemon_metadata";
import { pokemonTypeTable } from "./schemas/pokemon_types";
import { pokemonTable } from "./schemas/pokemons";
import { userFavoritePokemonsTable } from "./schemas/user_favorite_pokemons";
import { userInfoTable } from "./schemas/user_info";

export default defineSchema({
  pokemons: pokemonTable,
  pokemon_metadata: pokemonMetadataTable,
  user_info: userInfoTable,
  user_favorite_pokemons: userFavoritePokemonsTable,
  pokemon_types: pokemonTypeTable,
});
