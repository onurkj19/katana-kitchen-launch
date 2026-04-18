import { createContext, useContext, useState, ReactNode } from "react";
import { Lang, translations } from "./i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: typeof translations.de };
const LangContext = createContext<Ctx | null>(null);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("de");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be inside LangProvider");
  return ctx;
};
