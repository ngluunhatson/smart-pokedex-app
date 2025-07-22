import { api } from "@/convex/_generated/api";
import { extractIdFromUrl } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { PokemonClient, PokemonSprites } from "pokenode-ts";

const pokeClient = new PokemonClient();

export async function GET(request: Request) {
  const pokemonList = await fetchQuery(api.pokemons.getAndSortAllPokemons, {});

  return Response.json(pokemonList);
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { maxLimit } = await request.json();
  const pokeFormResult = await pokeClient
    .listPokemonForms(0, isNaN(maxLimit) ? 1600 : maxLimit)
    .then((e) => e.results);
  const pokemonFormList = await Promise.all(
    pokeFormResult.map(async (p) => {
      return pokeClient
        .getPokemonByName(p.name)
        .catch(() => {
          return pokeClient.getPokemonFormByName(p.name);
        })
        .then((res) => {
          return {
            name: res.name,
            types: res.types.map((t) => {
              return {
                name: t.type.name,
                id: extractIdFromUrl(t.type.url, "type") ?? "",
              };
            }),
            sprites: res.sprites.front_default ?? res.sprites.back_default,
            officialArtwork: (res.sprites as PokemonSprites).other?.[
              "official-artwork"
            ].front_default,
            id: res.id,
            spriteObject: res.sprites,
          };
        });
    }),
  );

  const pokemonMetadataList = await fetchQuery(
    api.pokemon_metadata.getAllMetadata,
  );

  const excludeIdList = pokemonMetadataList
    .filter((e) => e.excludeFromList)
    .map((p) => p.pokeId);

  const mappedList = pokemonFormList
    .filter((p) => !excludeIdList.includes(p.id.toString()))
    .map((p) => {
      const pokemonMetadata = pokemonMetadataList.find(
        (e) => e.pokeId === p.id.toString(),
      );
      return {
        name: p.name,
        types: p.types,
        pokeId: p.id.toString(),
        imageUrl:
          pokemonMetadata?.imageUrl ?? p.officialArtwork ?? p.sprites ?? "",
        nameContainsForm: pokemonMetadata?.nameContainsForm,
      };
    });

  await fetchMutation(api.pokemons.bulkUpsertPokemons, {
    pokemons: mappedList,
  });

  return Response.json(mappedList);
}
