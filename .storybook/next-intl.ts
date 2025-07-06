import en from "../locales/en.json";
import vi from "../locales/vi.json";

const messagesByLocale: Record<string, any> = { en, vi };

const nextIntl = {
  defaultLocale: "en",
  messagesByLocale,
};

export default nextIntl;
