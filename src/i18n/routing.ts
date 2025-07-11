import { LocaleEnum } from "@/lib";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(LocaleEnum),

  // Used when no locale matches
  defaultLocale: LocaleEnum.EN,
});
