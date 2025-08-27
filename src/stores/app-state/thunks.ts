import { AppJsonata, extractIdFromUrl, ParsedPokemon } from "@/lib";
import { MainClient, type Pokemon, type PokemonForm } from "pokenode-ts";
import { createAppAsyncThunk } from "../with-types";

type PokemonFormWithPokemon = Omit<PokemonForm, "pokemon"> & {
  pokemon: Pokemon;
};

export const updateAppPokemonThunk = createAppAsyncThunk(
  "appState/updateAppPokemonThunk",
  async () => {
    const mainClient = new MainClient();
    const pokemonClient = mainClient.pokemon;

    const startTime = new Date().getTime();
    let outerOffset = 1000;
    const setLimit = 100;
    const pokemonFormList: (PokemonFormWithPokemon | Pokemon)[] = [];

    const test = await mainClient.game.listGenerations();
    console.log("generations", test);
    const test2 = await mainClient.game.listVersionGroups();
    console.log("version groups", test2);
    const test3 = await mainClient.game.listVersions();
    console.log("versions", test3);
    const test4 = await mainClient.game.listPokedexes();
    console.log("pokedexes", test4);

    const appJsonata = new AppJsonata<
      (PokemonFormWithPokemon | Pokemon)[],
      ParsedPokemon[]
    >({
      jsonataStr: `$map($, function($v)
        {(
          $vMoves := $exists($v.moves) ? $v.moves : $v.pokemon.moves;
          $vAbilities := $exists($v.abilities) ? $v.abilities : $v.pokemon.abilities;
          $vStats := $exists($v.stats) ? $v.stats : $v.pokemon.stats;
          $vSpecies := $exists($v.species) ? $v.species : $v.pokemon.species;
          {
            "name": $v.name,
            "types": $map($v.types, function($t) {{
              "id": $extractIdFromUrl($t.type.url, "type"),
              "name": $t.type.name
            }})[],
            "moves":$map($vMoves, function($m) {{
              "id": $extractIdFromUrl($m.move.url, "move"),
              "name": $m.move.name,
              "versionGroupDetails": $map($m.version_group_details, function($v) {{
                "id": $extractIdFromUrl($v.version_group.url, "version-group"),
                "name": $v.version_group.name,
                "levelLearnedAt": $v.level_learned_at,
                "learnMethod": $v.move_learn_method.name
              }})[]
            }})[],
            "abilities": $map($vAbilities, function($a) {{
              "id": $extractIdFromUrl($a.ability.url, "ability"),
              "name": $a.ability.name,
              "isHidden": $a.is_hidden
            }})[],
            "stats": $map($vStats, function($s) {{
              "name": $s.stat.name,
              "baseStat": $s.base_stat,
              "effort": $s.effort
            }})[],
            "species": $vSpecies.name
          }
        )}
      )[]`,
      functions: [extractIdFromUrl],
    });

    const parsedPokemonList: ParsedPokemon[] = [];
    while (true) {
      const pokemonFormResource = await pokemonClient.listPokemonForms(
        outerOffset,
        setLimit,
      );

      const promiseList = await Promise.allSettled(
        pokemonFormResource.results.map(async (p) => {
          return await pokemonClient
            .getPokemonByName(p.name)
            .catch(async () => {
              return await pokemonClient
                .getPokemonFormByName(p.name)
                .then(async (pForm) => {
                  return {
                    ...pForm,
                    pokemon: await pokemonClient.getPokemonByName(
                      pForm.pokemon.name,
                    ),
                  };
                });
            });
        }),
      );

      promiseList.forEach((t) => {
        if (t.status === "fulfilled") {
          pokemonFormList.push(t.value);
        }
      });

      outerOffset += setLimit;

      const parsed = await appJsonata.evaluate(pokemonFormList);
      parsedPokemonList.push(...(parsed ?? []));
      console.log("parsed", parsed);
      setTimeout(() => {}, 100);

      if (!pokemonFormResource.next) {
        break;
      }
    }

    const endTime = new Date().getTime();
    console.log("time taken in seconds", (endTime - startTime) / 1000);

    return parsedPokemonList;
  },
);
