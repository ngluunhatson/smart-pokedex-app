import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const pokemonSchema = {
  name: v.string(),
  types: v.array(v.object({ name: v.string(), id: v.string() })),
  pokeId: v.string(),
  imageUrl: v.string(),
  nameContainsForm: v.optional(v.boolean()),
};

export const pokemonMetadataSchema = {
  pokeId: v.string(),
  imageUrl: v.optional(v.string()),
  excludeFromList: v.optional(v.boolean()),
  nameContainsForm: v.optional(v.boolean()),
  newName: v.optional(v.string()),
};

export default defineSchema({
  pokemons: defineTable(pokemonSchema)
    .index("by_name", ["name"])
    .index("by_poke_id", ["pokeId"]),
  pokemon_metadata: defineTable(pokemonMetadataSchema).index("by_poke_id", [
    "pokeId",
  ]),
});
