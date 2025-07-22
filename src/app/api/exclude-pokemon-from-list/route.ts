import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const idArray: number[] = [
    ...Array.from({ length: 40 }, (_, i) => 10269 + i),
    10344,
    10345,
  ];

  const updateList = idArray.map((id) => {
    return {
      pokeId: id.toString(),
      excludeFromList: true,
    };
  });

  await fetchMutation(api.pokemon_metadata.bulkUpsertMetadata, {
    pokemonMetadata: updateList,
  });

  return Response.json(updateList);
}
