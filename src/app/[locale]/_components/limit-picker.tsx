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
import { usePaginationContext } from "@/contexts/pagination-context";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function LimitPicker({ maxLimit }: { maxLimit: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("main-page.sidebar-content");
  const { currentLimit } = usePaginationContext();

  const limitOptionArray = ["50", "100", "150", "200", maxLimit];
  if (!limitOptionArray.includes(currentLimit.toString())) {
    limitOptionArray.push(currentLimit.toString());
  }

  return (
    <Select
      value={currentLimit.toString()}
      onValueChange={(newLimit) => {
        router.push({ pathname, query: { offset: "0", limit: newLimit } });
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
