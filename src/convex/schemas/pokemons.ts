import { defineTable } from "convex/server";
import { v } from "convex/values";

export const pokemonValidator = v.object({
  name: v.string(),
  types: v.array(v.object({ name: v.string(), id: v.string() })),
  pokeId: v.string(),
  imageUrl: v.string(),
  nameContainsForm: v.optional(v.boolean()),
});

export const pokemonTable = defineTable(pokemonValidator)
  .index("by_name", ["name"])
  .index("by_poke_id", ["pokeId"]);
