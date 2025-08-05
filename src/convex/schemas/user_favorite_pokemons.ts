import { defineTable } from "convex/server";
import { v } from "convex/values";

export const userFavoritePokemonsValidator = v.object({
  userId: v.id("user_info"),
  pokemonId: v.id("pokemons"),
});

export const userFavoritePokemonsTable = defineTable(
  userFavoritePokemonsValidator,
)
  .index("by_user_id", ["userId"])
  .index("by_pokemon_id", ["pokemonId"])
  .index("by_user_id_pokemon_id", ["userId", "pokemonId"]);
