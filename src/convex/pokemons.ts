import { mutation, query } from "@/convex/_generated/server";
import { PokemonUI } from "@/lib";
import { v } from "convex/values";
import { pokemonValidator } from "./schemas/pokemons";

export const getAllPokemons = query({
  handler: async (ctx) => {
    return await ctx.db.query("pokemons").collect();
  },
});

export const getAndSortAllPokemons = query({
  args: {
    types: v.optional(v.array(v.object({ name: v.string(), id: v.string() }))),
  },
  handler: async (ctx) => {
    const pokemonList = await ctx.db.query("pokemons").collect();
    const indexArray: number[] = [];
    pokemonList.forEach((pokemon, index, arr) => {
      if (indexArray.includes(index)) {
        return;
      }
      const pokeNameToCompare = pokemon.name.split("-")[0];

      indexArray.push(index);
      arr.forEach((insidePokemon, insideIndex) => {
        if (indexArray.includes(insideIndex)) {
          return;
        }

        const insidePokeFormSplit = insidePokemon.name.split("-");
        if (insidePokeFormSplit.includes(pokeNameToCompare)) {
          indexArray.push(insideIndex);
        }
      });
    });

    const findFormNameRegex = /^(.*?)-(.*)$/;
    const sortedPokemonList: PokemonUI[] = [];

    indexArray.forEach((index) => {
      const pokemon = pokemonList[index];

      if (pokemon.pokeId.length >= 5 || pokemon.nameContainsForm) {
        const match = pokemon.name.match(findFormNameRegex);
        sortedPokemonList.push({
          _id: pokemon._id,
          pokeId: pokemon.pokeId,
          name: match?.[1] ? match[1] : pokemon.name,
          formName: match?.[2] ? match[2] : undefined,
          types: pokemon.types,
          imageUrl: pokemon.imageUrl,
        });
        return;
      }

      sortedPokemonList.push({
        _id: pokemon._id,
        pokeId: pokemon.pokeId,
        name: pokemon.name,
        types: pokemon.types,
        imageUrl: pokemon.imageUrl,
      });
    });

    let previousId = "";
    return sortedPokemonList.map((p) => {
      if (previousId.length === 0 || p.pokeId.length < 5) {
        previousId = p.pokeId;
        return p;
      }

      return {
        ...p,
        displayId: previousId,
      };
    });
  },
});

export const getPokemonById = query({
  args: {
    id: v.optional(v.id("pokemons")),
  },
  handler: async (ctx, args) => {
    if (!args.id) {
      return null;
    }
    return await ctx.db.get(args.id);
  },
});

export const insertPokemon = mutation({
  args: pokemonValidator,
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
    pokemons: v.array(pokemonValidator),
  },
  handler: async (ctx, args) => {
    for (const pokemon of args.pokemons) {
      const existingPokemon = await ctx.db
        .query("pokemons")
        .withIndex("by_poke_id", (q) => q.eq("pokeId", pokemon.pokeId))
        .unique();
      if (existingPokemon) {
        await ctx.db.patch(existingPokemon._id, pokemon);
        continue;
      }
      await ctx.db.insert("pokemons", pokemon);
    }
  },
});
