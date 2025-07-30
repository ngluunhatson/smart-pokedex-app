import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Dictionary mapping from pokemon id to new name
  const idToNewName: Record<string, string> = {
    // Example entries, replace with your actual mapping
    "29": "nidoran-female",
    "32": "nidoran-male",
    "718": "zygarde-50-power-construct",
    // ... add more mappings as needed
  };

  const updateList = Object.entries(idToNewName).map(([pokeId, newName]) => ({
    pokeId,
    newName,
  }));

  await fetchMutation(api.pokemon_metadata.bulkUpsertMetadata, {
    pokemonMetadata: updateList,
  });

  return Response.json(updateList);
}
