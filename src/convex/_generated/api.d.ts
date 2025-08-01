/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as pokemon_metadata from "../pokemon_metadata.js";
import type * as pokemons from "../pokemons.js";
import type * as user_favorite_pokemons from "../user_favorite_pokemons.js";
import type * as user_info from "../user_info.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  pokemon_metadata: typeof pokemon_metadata;
  pokemons: typeof pokemons;
  user_favorite_pokemons: typeof user_favorite_pokemons;
  user_info: typeof user_info;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
