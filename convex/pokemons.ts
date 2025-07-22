import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { pokemonSchema } from "./schema";

export const getAllPokemons = query({
  handler: async (ctx) => {
    return await ctx.db.query("pokemons").collect();
  },
});

export const insertPokemon = mutation({
  args: pokemonSchema,
  handler: async (ctx, args) => {
    await ctx.db.insert("pokemons", args);
  },
});

export const updatePokemon = mutation({
  args: {
    id: v.id("pokemons"),
    name: v.optional(v.string()),
    types: v.optional(v.array(v.object({ name: v.string(), id: v.string() }))),
    pokeId: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    nameContainsForm: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const deletePokemon = mutation({
  args: {
    id: v.id("pokemons"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const bulkUpsertPokemons = mutation({
  args: {
    pokemons: v.array(v.object(pokemonSchema)),
  },
  handler: async (ctx, args) => {
    for (const pokemon of args.pokemons) {
      const existingPokemon = await ctx.db
        .query("pokemons")
        .withIndex("by_poke_id", (q) => q.eq("pokeId", pokemon.pokeId))
        .first();
      if (existingPokemon) {
        await ctx.db.patch(existingPokemon._id, pokemon);
        continue;
      }
      await ctx.db.insert("pokemons", pokemon);
    }
  },
});
