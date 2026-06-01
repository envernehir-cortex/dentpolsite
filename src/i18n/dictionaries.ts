import tr from "./locales/tr.json";
import en from "./locales/en.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";

export type Locale = "tr" | "en" | "de" | "fr";

export const defaultLocale: Locale = "tr";

const dictionaries = {
  tr,
  en,
  de,
  fr,
};

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] || dictionaries[defaultLocale];
};

export type Dictionary = typeof tr;
