import { defineTable } from "convex/server";
import { v } from "convex/values";

export const pokemonMetadataValidator = v.object({
  pokeId: v.string(),
  imageUrl: v.optional(v.string()),
  excludeFromList: v.optional(v.boolean()),
  nameContainsForm: v.optional(v.boolean()),
  newName: v.optional(v.string()),
});

export const pokemonMetadataTable = defineTable(pokemonMetadataValidator).index(
  "by_poke_id",
  ["pokeId"],
);
