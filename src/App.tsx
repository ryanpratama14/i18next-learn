import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { removeLangPrefix } from "./utils/i18n";
import About from "./pages/About";

export default function App(): React.JSX.Element {
  const {
    i18n: { language },
  } = useTranslation();

  useLayoutEffect(() => {
    const currentPathname = window.location.pathname;
    const newPathname = `/${language}${removeLangPrefix(currentPathname)}`;
    if (currentPathname !== newPathname) {
      window.location.replace(newPathname);
    }
  }, [language]);

  return (
    <BrowserRouter basename={`/${language}`}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
      </Routes>
    </BrowserRouter>
  );
}
