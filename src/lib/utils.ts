import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SearchParamsEnum } from "./enums";

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

export function buildQueryObject(
  inputQueryObject: Record<SearchParamsEnum, string | number | undefined>,
) {
  const returnQueryObject: Record<string, string | number> = {};
  Object.entries(inputQueryObject).forEach(([key, value]) => {
    if (value !== undefined) {
      returnQueryObject[key] = value;
    }
  });
  return returnQueryObject;
}
