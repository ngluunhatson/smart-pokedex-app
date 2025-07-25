import { mutation, query } from "@/convex/_generated/server";
import { v } from "convex/values";
import { pokemonMetadataSchema } from "./schema";

export const getAllMetadata = query({
  handler: async (ctx) => {
    return await ctx.db.query("pokemon_metadata").collect();
  },
});

export const bulkUpsertMetadata = mutation({
  args: {
    pokemonMetadata: v.array(v.object(pokemonMetadataSchema)),
  },
  handler: async (ctx, args) => {
    for (const metadata of args.pokemonMetadata) {
      const existingMetadata = await ctx.db
        .query("pokemon_metadata")
        .withIndex("by_poke_id", (q) => q.eq("pokeId", metadata.pokeId))
        .first();
      if (existingMetadata) {
        await ctx.db.patch(existingMetadata._id, metadata);
        continue;
      }
      await ctx.db.insert("pokemon_metadata", metadata);
    }
  },
});
