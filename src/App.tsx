import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import About from "./pages/About";
import {
  getLangFromRoute,
  languagesList,
  removeLangPrefix,
} from "./utils/i18n";

export default function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    const currentPathname = window.location.pathname;
    const newPathname = `/${i18n.language}${removeLangPrefix(currentPathname)}`;
    if (currentPathname !== newPathname) {
      i18n.changeLanguage(getLangFromRoute(currentPathname));
      window.location.reload();
    }
  }, []);

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
