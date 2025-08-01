import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const pokemonValidator = v.object({
  name: v.string(),
  types: v.array(v.object({ name: v.string(), id: v.string() })),
  pokeId: v.string(),
  imageUrl: v.string(),
  nameContainsForm: v.optional(v.boolean()),
});

export const pokemonMetadataValidator = v.object({
  pokeId: v.string(),
  imageUrl: v.optional(v.string()),
  excludeFromList: v.optional(v.boolean()),
  nameContainsForm: v.optional(v.boolean()),
  newName: v.optional(v.string()),
});

export const userInfoValidator = v.object({
  clerkUserId: v.string(),
  role: v.union(v.literal("admin"), v.literal("user")),
});

export default defineSchema({
  pokemons: defineTable(pokemonValidator)
    .index("by_name", ["name"])
    .index("by_poke_id", ["pokeId"]),
  pokemon_metadata: defineTable(pokemonMetadataValidator).index("by_poke_id", [
    "pokeId",
  ]),
  user_info: defineTable(userInfoValidator).index("by_clerk_user_id", [
    "clerkUserId",
  ]),
  user_favorite_pokemons: defineTable({
    userId: v.id("user_info"),
    pokemonId: v.id("pokemons"),
  })
    .index("by_user_id", ["userId"])
    .index("by_pokemon_id", ["pokemonId"])
    .index("by_user_id_pokemon_id", ["userId", "pokemonId"]),
});
