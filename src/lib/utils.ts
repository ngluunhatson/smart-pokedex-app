import { clsx, type ClassValue } from "clsx";
import { NamedAPIResource } from "pokenode-ts";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function standardizeString(str: string) {
  const strArray = str.split("-");

  return strArray
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function extractIdFromUrl(url: string, matchStr: string) {
  const escapedMatchStr = matchStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`/${escapedMatchStr}\/(\\d+)\/`);
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export function sortPokemonFormList(pokeFormList: NamedAPIResource[]) {
  const pokeFormIndexArray: number[] = [];
  pokeFormList.forEach((pokeForm, index, arr) => {
    if (pokeFormIndexArray.includes(index)) {
      return;
    }
    pokeFormIndexArray.push(index);
    const pokeFormNameToCompare = pokeForm.name.split("-")[0];
    arr.forEach((insidePokeForm, insideIndex) => {
      if (pokeFormIndexArray.includes(insideIndex)) {
        return;
      }
      const pokeFormId = extractIdFromUrl(insidePokeForm.url, "pokemon-form");

      if (!pokeFormId || pokeFormId.length < 5) {
        return;
      }

      const insidePokeFormSplit = insidePokeForm.name.split("-");
      if (insidePokeFormSplit.includes(pokeFormNameToCompare)) {
        pokeFormIndexArray.push(insideIndex);
      }
    });
  });

  const findFormNameRegex = /^(.*?)-(.*)$/;
  const sortedPokeFormList: {
    index: number;
    name?: string;
    formName?: string;
    id: string;
  }[] = [];

  pokeFormIndexArray.forEach((index) => {
    const pokeForm = pokeFormList[index];
    const pokeFormId = extractIdFromUrl(pokeForm.url, "pokemon-form");
    if (!pokeFormId) {
      return;
    }

    const idArray: string[] = JSON.parse(
      process.env.NEXT_PUBLIC_POKEMON_FORM_ID_LIST_WITH_DEFAULT_FORM_NAME ??
        "[]",
    );
    if (pokeFormId.length >= 5 || idArray.includes(pokeFormId)) {
      const match = pokeForm.name.match(findFormNameRegex);

      sortedPokeFormList.push({
        index: index,
        name: match?.[1],
        formName: match?.[2],
        id: pokeFormId,
      });
      return;
    }

    sortedPokeFormList.push({
      index: index,
      name: pokeForm.name,
      formName: undefined,
      id: pokeFormId,
    });
  });
  return sortedPokeFormList;
}
