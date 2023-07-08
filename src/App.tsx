import { Suspense, useEffect, useLayoutEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getLangFromRoute,
  languagesList,
  removeLangPrefix,
} from "./utils/i18n";
import AppRoutes from "./AppRoutes";
import { HelmetProvider } from "react-helmet-async";

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
      <HelmetProvider>
        <Suspense fallback={<main>Loading...</main>}>
          <AppRoutes />
        </Suspense>
      </HelmetProvider>
    </BrowserRouter>
  );
}
