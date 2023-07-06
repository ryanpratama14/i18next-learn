import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function About(): React.JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <main className="min-h-screen flex flex-col gap-2 items-center justify-center">
      <p>Result: {t("about")}</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </main>
  );
}
