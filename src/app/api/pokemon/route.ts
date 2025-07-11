import { PokemonClient } from "pokenode-ts";

const pokeCLient = new PokemonClient();

export async function GET(request: Request) {
  const pokeFormResult = await pokeCLient.listPokemonForms(0, 100);
  const pokemons = await Promise.all(
    pokeFormResult.results.map((p) =>
      pokeCLient.getPokemonByName(p.name).then((res) => {
        return {
          id: res.id,
          name: res.name,
          image: res.sprites,
        };
      }),
    ),
  );

  return Response.json(pokemons);
}
