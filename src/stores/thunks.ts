import { PokemonClient, PokemonForm } from "pokenode-ts";
import { createAppAsyncThunk } from "./with-types";

export const updateAppPokemonThunk = createAppAsyncThunk(
  "appLoading/updateAppPokemonThunk",
  async () => {
    const pokemonClient = new PokemonClient();

    // await new Promise((resolve) => setTimeout(resolve, 0));
    const result = await pokemonClient.listPokemonForms(0, 1600).then((res) => {
      return res.results;
    });
    let offset = 0;
    const pokemonFormList: (PokemonForm | null)[] = [];
    while (true) {
      const slicedResult = result.slice(offset, offset + 100);
      const tempList = await Promise.all(
        slicedResult.map(async (p) => {
          return await pokemonClient
            .getPokemonFormByName(p.name)
            .catch((e) => null);
        }),
      );
      pokemonFormList.push(...tempList);
      offset += 100;
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (pokemonFormList.length === result.length) {
        break;
      }
    }
    console.log(pokemonFormList, "pokemonFormList");

    return pokemonFormList;
  },
);
