import { type Pokemon, PokemonClient, type PokemonForm } from "pokenode-ts";
import { createAppAsyncThunk } from "./with-types";

export const updateAppPokemonThunk = createAppAsyncThunk(
  "appLoading/updateAppPokemonThunk",
  async () => {
    const pokemonClient = new PokemonClient();

    let outerOffset = 0;
    const setLimit = 100;
    const pokemonFormList: (PokemonForm | Pokemon)[] = [];

    while (true) {
      const pokemonFormResource = await pokemonClient.listPokemonForms(
        outerOffset,
        setLimit,
      );

      const promiseList = await Promise.allSettled(
        pokemonFormResource.results.map(async (p) => {
          return await pokemonClient.getPokemonByName(p.name).catch(() => {
            return pokemonClient.getPokemonFormByName(p.name);
          });
        }),
      );

      promiseList.forEach((t) => {
        if (t.status === "fulfilled") {
          pokemonFormList.push(t.value);
        }
      });

      outerOffset += setLimit;

      if (!pokemonFormResource.next) {
        break;
      }
    }

    return pokemonFormList;
  },
);
