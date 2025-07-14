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
    const pokeFormNameToCompare = pokeForm.name.split("-")[0];
    arr.forEach((insidePokeForm, insideIndex) => {
      const insidePokeFormSplit = insidePokeForm.name.split("-");
      if (insidePokeFormSplit.includes(pokeFormNameToCompare)) {
        pokeFormIndexArray.push(insideIndex);
      }
    });
  });

  const findFormNameRegex = /^(.*?)-(.*)$/;
  return pokeFormIndexArray.map((index) => {
    const pokeForm = pokeFormList[index];
    const pokeFormId = extractIdFromUrl(pokeForm.url, "pokemon-form");

    const match = pokeForm.name.match(findFormNameRegex);
    if (match && match.length === 3) {
      return {
        index,
        name: match[1],
        formName: match[2],
        id: pokeFormId,
      };
    }

    return {
      index: index,
      name: pokeForm.name,
      formName: null,
      id: pokeFormId,
    };
  });
}
