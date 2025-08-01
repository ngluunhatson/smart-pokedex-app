import { mutation, query } from "@/convex/_generated/server";
import { getManyViaOrThrow } from "convex-helpers/server/relationships";
import { v } from "convex/values";
import { getUserInfo } from "./utils";

export const getFavoritePokemons = query({
  args: {
    clerkUserId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userInfo = await getUserInfo(ctx, args.clerkUserId);

    if (!userInfo) {
      return [];
    }

    return await getManyViaOrThrow(
      ctx.db,
      "user_favorite_pokemons",
      "pokemonId",
      "by_user_id",
      userInfo._id,
      "userId",
    ).catch((err) => {
      console.error(err);
      return [];
    });
  },
});

export const addOrRemoveFavoritePokemon = mutation({
  args: {
    pokemonId: v.id("pokemons"),
    clerkUserId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userInfo = await getUserInfo(ctx, args.clerkUserId);

    if (!userInfo) {
      return;
    }

    const existingFavorite = await ctx.db
      .query("user_favorite_pokemons")
      .withIndex("by_user_id_pokemon_id", (q) =>
        q.eq("userId", userInfo._id).eq("pokemonId", args.pokemonId),
      )
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
      return;
    }

    await ctx.db.insert("user_favorite_pokemons", {
      userId: userInfo._id,
      pokemonId: args.pokemonId,
    });
  },
});
