"use client";

import { Input } from "@/components";
import { api } from "@/convex/_generated/api";
import { Link } from "@/i18n/navigation";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { LimitPicker } from "./limit-picker";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { PokemonCard } from "./pokemon-card";

interface SidebarContentProps {
  currentOffSet: number;
  currentLimit: number;
}

export function SidebarContent({
  currentOffSet,
  currentLimit,
}: SidebarContentProps) {
  const t = useTranslations();
  const pokemonList = useQuery(api.pokemons.getAndSortAllPokemons, {
    types: [],
  });

  const pagedPokemonFormList = useMemo(() => {
    if (!pokemonList) {
      return [];
    }
    return pokemonList.slice(currentOffSet, currentOffSet + currentLimit);
  }, [pokemonList, currentOffSet, currentLimit]);

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
        <LimitPicker maxLimit={(pokemonList?.length ?? 0).toString()} />

        <Pagination>
          <PaginationPrevious href={"#"}></PaginationPrevious>
          <PaginationContent className="flex gap-2">
            <Input defaultValue={currentPage} className="w-8" />
            {"of " + Math.ceil((pokemonList?.length ?? 0) / currentLimit)}
          </PaginationContent>
          <PaginationNext href={"#"}>Next</PaginationNext>
        </Pagination>
        <div className="w-[80px]">{pokemonList?.length}</div>
      </div>
    </div>
  );
}
