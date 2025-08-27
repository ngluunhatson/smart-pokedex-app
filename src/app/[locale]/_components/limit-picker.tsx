"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { useAppContext } from "@/hooks";
import { usePathname, useRouter } from "@/i18n/navigation";
import { buildQueryObject, SearchParamsEnum } from "@/lib";
import { appStateSelector } from "@/stores/app-state/slice";
import { useAppSelector } from "@/stores/with-types";
import { useTranslations } from "next-intl";

export function LimitPicker({ maxLimit }: { maxLimit: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("main-page.sidebar-content");

  const { limit, pokemonId } = useAppContext();
  const isAppUpdating = useAppSelector(appStateSelector.selectIsUpdating);

  const limitOptionArray = ["50", "100", "150", "200", maxLimit];
  if (!limitOptionArray.includes(limit.toString())) {
    limitOptionArray.push(limit.toString());
  }

  return (
    <Select
      disabled={isAppUpdating}
      value={limit.toString()}
      onValueChange={(newLimit) => {
        router.push({
          pathname,
          query: buildQueryObject({
            [SearchParamsEnum.OFFSET]: 0,
            [SearchParamsEnum.LIMIT]: newLimit,
            [SearchParamsEnum.POKEMON_ID]: pokemonId ?? undefined,
          }),
        });
      }}
    >
      <SelectTrigger>
        <SelectValue aria-label={t("limit-picker-srText")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("limit-per-page")}</SelectLabel>
          {limitOptionArray.map((p) => {
            return (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
