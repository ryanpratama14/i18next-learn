import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import i18n from "i18next";

import { LanguageItems } from "../types/types";

export const languages: LanguageItems[] = [
  {
    language: "en",
    label: "English",
  },
  {
    language: "ru",
    label: "Russian",
  },
];

export const languagesList = languages.map((e) => e.language);

export const removeLangPrefix = (pathname: string): string => {
  for (let lang of languagesList) {
    if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
      return pathname.replace(`/${lang}`, "");
    }
  }
  return pathname;
};

export const getLangFromRoute = (route: string) => {
  if (route.startsWith("/")) {
    const parts = route.split("/");
    return parts[1];
  }
  return undefined;
};

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
  });

i18n.on("languageChanged", (lng: string) => {
  document.documentElement.lang = lng;
});

i18n.resolvedLanguage;

export default i18n;
