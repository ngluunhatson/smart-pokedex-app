import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const idArray: string[] = JSON.parse(
    process.env.POKEMON_FORM_ID_LIST_WITH_DEFAULT_FORM_NAME ?? "[]",
  );

  const updateList = idArray.map((id) => {
    return {
      pokeId: id,
      nameContainsForm: true,
    };
  });

  await fetchMutation(api.pokemon_metadata.bulkUpsertMetadata, {
    pokemonMetadata: updateList,
  });

  return Response.json(updateList);
}
