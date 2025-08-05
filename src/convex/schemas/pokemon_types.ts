import { defineTable } from "convex/server";
import { v } from "convex/values";

export const pokemonTypeValidator = v.object({
  name: v.string(),
});

export const pokemonTypeTable = defineTable(pokemonTypeValidator).index(
  "by_name",
  ["name"],
);
