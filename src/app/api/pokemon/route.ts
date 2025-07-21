import { extractIdFromUrl } from "@/lib";
import { PokemonClient } from "pokenode-ts";

const pokeClient = new PokemonClient();

export async function GET(request: Request) {
  const pokeFormResult = await pokeClient
    .listPokemonForms(0, 1600)
    .then((e) => e.results);
  const idToInfoMap: Record<
    string,
    { name: string; types: { name: string; id: string | null }[] }
  > = {};
  await Promise.all(
    pokeFormResult.map((p) =>
      pokeClient.getPokemonFormByName(p.name).then((res) => {
        idToInfoMap[res.id] = {
          name: res.name,
          types: res.types.map((t) => {
            return {
              name: t.type.name,
              id: extractIdFromUrl(t.type.url, "type"),
            };
          }),
        };
      }),
    ),
  );

  return Response.json(idToInfoMap);
}
