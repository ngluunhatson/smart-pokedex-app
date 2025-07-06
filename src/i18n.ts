import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { LocaleEnum } from "./lib";

// Can be imported from a shared config
const locales = Object.values(LocaleEnum);

export default getRequestConfig(async ({ locale }) => {
  if (!locale) notFound();
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as LocaleEnum)) notFound();

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
