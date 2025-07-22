"use client";

import { Link } from "@/i18n/navigation";
import { sortPokemonFormList } from "@/lib";
import { useTranslations } from "next-intl";
import { NamedAPIResourceList, PokemonClient } from "pokenode-ts";
import { useEffect, useMemo, useState } from "react";
import { LimitPicker } from "./limit-picker";
import { PokemonCard } from "./pokemon-card";

const pokeClient = new PokemonClient();

interface SidebarContentProps {
  currentOffSet: number;
  currentLimit: number;
}

export function SidebarContent({
  currentOffSet,
  currentLimit,
}: SidebarContentProps) {
  const t = useTranslations();
  const [pokeFormResourceList, setPokeFormResourceList] =
    useState<NamedAPIResourceList | null>(null);

  const sortedPokeFormList = useMemo(() => {
    if (!pokeFormResourceList) {
      return [];
    }
    return sortPokemonFormList(pokeFormResourceList.results);
  }, [pokeFormResourceList]);

  const pagedPokemonFormList = useMemo(() => {
    if (!sortedPokeFormList) {
      return [];
    }
    return sortedPokeFormList.slice(
      currentOffSet,
      currentOffSet + currentLimit,
    );
  }, [sortedPokeFormList, currentOffSet, currentLimit]);

  useEffect(() => {
    pokeClient
      .listPokemonForms(
        0,
        parseInt(process.env.NEXT_PUBLIC_POKEMON_LIMIT ?? "1600"),
      )
      .then((e) => setPokeFormResourceList(e));
  }, []);

  const currentPage = Math.floor(currentOffSet / currentLimit) + 1;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="text-primary border-b-primary flex h-[60px] w-full items-center justify-center border-b-[1px] p-2 font-bold">
        <span className="text-xl font-bold">{t("app-name")}</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-scroll">
        {pagedPokemonFormList.map((p) => {
          return (
            <Link
              key={p.id}
              href={{
                pathname: "/",
                query: {
                  offset: currentOffSet,
                  limit: currentLimit,
                  pokeFormId: p.id,
                },
              }}
            >
              <PokemonCard
                pokemon={p}
                className="border-t-primary border-t-[1px]"
              />
            </Link>
          );
        })}
      </div>
      <div className="border-t-primary flex w-full items-center justify-between border-t-[1px] p-2">
        <LimitPicker />
        {pokeFormResourceList?.count}
      </div>
    </div>
  );
}
