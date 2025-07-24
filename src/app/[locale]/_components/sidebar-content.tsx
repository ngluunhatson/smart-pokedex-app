"use client";

import { Input, Loader } from "@/components";
import { usePaginationContext } from "@/contexts/pagination-context";
import { api } from "@/convex/_generated/api";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef } from "react";
import { LimitPicker } from "./limit-picker";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { PokemonCard } from "./pokemon-card";

export function SidebarContent() {
  const t = useTranslations();
  const { currentOffset, currentLimit } = usePaginationContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPathname = usePathname();
  const router = useRouter();

  const pokemonList = useQuery(api.pokemons.getAndSortAllPokemons, {
    types: [],
  });

  const pagedPokemonFormList = useMemo(() => {
    if (!pokemonList) {
      return [];
    }
    return pokemonList.slice(currentOffset, currentOffset + currentLimit);
  }, [pokemonList, currentOffset, currentLimit]);

  const currentPage = useMemo(() => {
    return Math.floor(currentOffset / currentLimit) + 1;
  }, [currentLimit, currentOffset]);
  const maxPage = Math.ceil((pokemonList?.length ?? 0) / currentLimit);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = currentPage.toString();
    }
  }, [currentPage]);

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="text-primary border-b-primary flex h-[60px] w-full items-center justify-center border-b-[1px] p-2 font-bold">
        <span className="text-xl font-bold">{t("app-name")}</span>
      </div>

      {/* Body - The Pokemon List */}
      <div className="flex flex-1 flex-col overflow-y-scroll">
        {!pokemonList ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader className="h-8 w-8" />
              <span className="text-muted-foreground text-sm">
                {t("main-page.sidebar-content.loading")}
              </span>
            </div>
          </div>
        ) : (
          pagedPokemonFormList.map((p) => {
            return (
              <Link
                key={p.id}
                href={{
                  pathname: currentPathname,
                  query: {
                    offset: currentOffset,
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
          })
        )}
      </div>

      {/* Footer */}
      <div className="border-t-primary flex w-full items-center justify-between border-t-[1px] p-2">
        {pokemonList?.length && (
          <LimitPicker maxLimit={pokemonList.length.toString()} />
        )}

        <Pagination className="flex items-center justify-center gap-3">
          {currentPage > 1 && (
            <PaginationPrevious
              href={{
                pathname: currentPathname,
                query: {
                  offset: currentOffset - currentLimit,
                  limit: currentLimit,
                },
              }}
              aria-label={t("main-page.sidebar-content.previous-button-srText")}
            />
          )}
          <PaginationContent className="flex gap-3">
            <Input
              type="number"
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "e" || e.key === "E") {
                  e.preventDefault();
                }
              }}
              onBlur={(e) => {
                if (!inputRef.current) {
                  return;
                }
                let newPage = parseInt(e.target.value);

                if (isNaN(newPage)) {
                  newPage = currentPage;
                }

                if (newPage > maxPage) {
                  newPage = maxPage;
                }
                if (newPage < 1) {
                  newPage = 1;
                }
                if (newPage >= 1 && newPage <= maxPage) {
                  router.push({
                    pathname: currentPathname,
                    query: {
                      offset: (newPage - 1) * currentLimit,
                      limit: currentLimit,
                    },
                  });
                }
              }}
              className="flex w-10 items-center justify-center"
            />
            <span>of</span>
            <span>{maxPage}</span>
          </PaginationContent>
          {currentPage < maxPage && (
            <PaginationNext
              aria-label={t("main-page.sidebar-content.next-page")}
              href={{
                pathname: currentPathname,
                query: {
                  offset: currentOffset + currentLimit,
                  limit: currentLimit,
                },
              }}
            />
          )}
        </Pagination>

        <div className="flex min-w-[100px] justify-center">
          {t("main-page.sidebar-content.total-count", {
            count: pokemonList?.length ?? 0,
          })}
        </div>
      </div>
    </div>
  );
}
