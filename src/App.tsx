import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
      i18n.changeLanguage(getLangFromRoute(currentPathname));
      window.location.reload();
    }
  }, [i18n.language]);

  useEffect(() => {
    const currentPathname = window.location.pathname;
    const langFromRoute = getLangFromRoute(currentPathname);
    if (!langFromRoute || !languagesList.includes(langFromRoute)) {
      window.location.replace(`/${i18n.language}${currentPathname}`);
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace(`/${i18n.language}`);
    }
  }, []);

  return (
    <BrowserRouter basename={`/${i18n.language}`}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Navigate to="/" />} path="*" />
        <Route element={<About />} path="/about" />
      </Routes>
    </BrowserRouter>
  );
}
