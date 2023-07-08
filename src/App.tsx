import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import About from "./pages/About";
import { languages } from "./utils/utils";

export const languagesList = languages.map((e) => e.language);

const removeLangPrefix = (pathname: string): string => {
  for (let lang of languagesList) {
    if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
      return pathname.replace(`/${lang}`, "");
    }
  }
  return pathname;
};

function getLangFromRoute(route: string) {
  if (route.startsWith("/")) {
    const parts = route.split("/");
    return parts[1];
  }
  return undefined;
}

export default function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    const currentPathname = window.location.pathname;
    const newPathname = `/${i18n.language}${removeLangPrefix(currentPathname)}`;
    if (currentPathname !== newPathname) {
      // console.log(getLangFromRoute(newPathname));
      i18n.changeLanguage(getLangFromRoute(currentPathname));
      window.location.reload();
    }
  }, [i18n.language]);

  useEffect(() => {
    const currentPathname = window.location.pathname;
    if (!currentPathname.startsWith(`/${i18n.language}`)) {
      i18n.changeLanguage(getLangFromRoute(currentPathname));
      window.location.replace(currentPathname);
    }
  }, []);

  return (
    <BrowserRouter basename={`/${i18n.language}`}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
      </Routes>
    </BrowserRouter>
  );
}
