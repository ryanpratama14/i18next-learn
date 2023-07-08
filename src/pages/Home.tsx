import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { languages, removeLangPrefix } from "../utils/i18n";

export default function Home(): React.JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLng = (lng: string): void => {
    i18n.changeLanguage(lng);
    const currentPathname = window.location.pathname;
    const newPathname = `/${lng}${removeLangPrefix(currentPathname)}`;
    if (currentPathname !== newPathname) {
      window.location.replace(newPathname);
    }
  };

  return (
    <main className="min-h-screen flex flex-col gap-2 justify-center items-center">
      <section className="flex gap-2 items-center">
        <h2>Pick Language</h2>
        {languages.map((lang) => {
          return (
            <button
              key={lang.language}
              onClick={() => changeLng(lang.language)}
            >
              {lang.label}
            </button>
          );
        })}
      </section>
      <p>Result: {t("gagah")}</p>
      <button onClick={() => navigate("/about")}>To About Page</button>
    </main>
  );
}
