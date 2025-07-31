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
import { SearchParamsEnum } from "@/lib";
import { appLoadingSlice } from "@/stores/app-loading/slice";
import { useAppSelector } from "@/stores/with-types";
import { useTranslations } from "next-intl";

export function LimitPicker({ maxLimit }: { maxLimit: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("main-page.sidebar-content");

  const { limit, pokeName } = useAppContext();
  const isAppLoading = useAppSelector(
    appLoadingSlice.selectors.selectIsLoading,
  );

  const limitOptionArray = ["50", "100", "150", "200", maxLimit];
  if (!limitOptionArray.includes(limit.toString())) {
    limitOptionArray.push(limit.toString());
  }

  return (
    <Select
      disabled={isAppLoading}
      value={limit.toString()}
      onValueChange={(newLimit) => {
        router.push({
          pathname,
          query: {
            [SearchParamsEnum.OFFSET]: "0",
            [SearchParamsEnum.LIMIT]: newLimit,
            [SearchParamsEnum.POKE_NAME]: pokeName ?? undefined,
          },
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
