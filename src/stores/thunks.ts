import { AppJsonata, extractIdFromUrl } from "@/lib";
import { MainClient, type Pokemon, type PokemonForm } from "pokenode-ts";
import { createAppAsyncThunk } from "./with-types";

export const updateAppPokemonThunk = createAppAsyncThunk(
  "appLoading/updateAppPokemonThunk",
  async () => {
    const mainClient = new MainClient();
    const pokemonClient = mainClient.pokemon;

    const startTime = new Date().getTime();
    let outerOffset = 1400;
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

    const appJsonata = new AppJsonata<(Pokemon | PokemonForm)[], PokemonForm[]>(
      {
        jsonataStr: `$map($, function($v) {{
          "name": $v.name,
          "types": $map($v.types, function($t) {{
            "id": $extractIdFromUrl($t.type.url, "type"),
            "name": $t.type.name
          }})[],
          "moves": $map($v.moves, function($m) {{
            "id": $extractIdFromUrl($m.move.url, "move"),
            "name": $m.move.name,
            "versionGroupDetails": $map($m.version_group_details, function($v) {{
              "id": $v.version_group.url,
              "name": $v.version_group.name,
              "levelLearnedAt": $v.level_learned_at,
              "learnMethod": $v.move_learn_method.name
            }})[]
          }})[]
        }})[]`,
        functions: [extractIdFromUrl],
      },
    );
    const parsedPokemonList = await appJsonata.evaluate(pokemonFormList);

    const endTime = new Date().getTime();
    console.log("time taken in seconds", (endTime - startTime) / 1000);

    console.log("parsedPokemonList", parsedPokemonList);

    return pokemonFormList;
  },
);
