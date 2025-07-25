"use client";

import { Input, Loader } from "@/components";
import { useSearchParamContext } from "@/contexts/search-param-context";
import { api } from "@/convex/_generated/api";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { SearchParamEnum } from "@/lib";
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

export function PanelContent() {
  const t = useTranslations();
  const { currentOffset, currentLimit, currentId } = useSearchParamContext();
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
  }, [currentPage, inputRef]);

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="text-primary border-b-primary flex h-[60px] w-full items-center justify-center border-b-[1px] p-2 font-bold">
        <span className="text-xl font-bold">{t("app-name")}</span>
      </div>
      {/* Header */}

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
                    [SearchParamEnum.OFFSET]: currentOffset,
                    [SearchParamEnum.LIMIT]: currentLimit,
                    [SearchParamEnum.POKE_ID]: p.id,
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
      {/* Body - The Pokemon List */}

      {/* Footer */}
      <div className="border-t-primary flex w-full items-center justify-between gap-1 border-t-[1px] p-2">
        {pokemonList?.length && (
          <LimitPicker maxLimit={pokemonList.length.toString()} />
        )}

        <Pagination className="flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <PaginationPrevious
              href={{
                pathname: currentPathname,
                query: {
                  [SearchParamEnum.OFFSET]: currentOffset - currentLimit,
                  [SearchParamEnum.LIMIT]: currentLimit,
                  [SearchParamEnum.POKE_ID]: currentId,
                },
              }}
              aria-label={t("main-page.sidebar-content.previous-button-srText")}
            />
          )}
          <PaginationContent className="flex items-center gap-3">
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
                      [SearchParamEnum.OFFSET]: (newPage - 1) * currentLimit,
                      [SearchParamEnum.LIMIT]: currentLimit,
                      [SearchParamEnum.POKE_ID]: currentId,
                    },
                  });
                }
              }}
              className="flex w-9 items-center justify-center p-2 text-sm"
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
                  [SearchParamEnum.OFFSET]: currentOffset + currentLimit,
                  [SearchParamEnum.LIMIT]: currentLimit,
                  [SearchParamEnum.POKE_ID]: currentId,
                },
              }}
            />
          )}
        </Pagination>

        <div className="text-muted-foreground flex min-w-[80px] items-center justify-center text-sm">
          {t("main-page.sidebar-content.total-count", {
            count: pokemonList?.length ?? 0,
          })}
        </div>
      </div>
      {/* Footer */}
    </div>
  );
}
