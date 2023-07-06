import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import i18next from "i18next";
import { languages } from "./utils";

export const languagesList = languages.map((e) => e.language);

export const removeLangPrefix = (pathname: string): string => {
  for (let lang of languagesList) {
    if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
      return pathname.replace(`/${lang}`, "");
    }
  }
  return pathname;
};

i18next
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
      order: ["cookie"],
      caches: ["cookie"],
    },
  });

i18next.on("languageChanged", (lng: string) => {
  document.documentElement.lang = lng;
});

i18next.resolvedLanguage;

export default i18next;
