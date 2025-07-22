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
import { usePathname, useRouter } from "@/i18n/navigation";
import { SearchParamEnum } from "@/lib";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export function LimitPicker({ maxLimit }: { maxLimit: string }) {
  const pathname = usePathname();

  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("main-page.sidebar-content");

  const currentLimit = searchParams.get(SearchParamEnum.LIMIT) || "100";
  const limitOptionArray = ["50", "100", "150", "200", maxLimit];
  if (!limitOptionArray.includes(currentLimit)) {
    limitOptionArray.push(currentLimit);
  }
  return (
    <Select
      defaultValue={currentLimit}
      onValueChange={(p) => {
        router.push({ pathname, query: { offset: "0", limit: p } });
      }}
    >
      <SelectTrigger className="max-w-[80px] min-w-[80px]">
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
