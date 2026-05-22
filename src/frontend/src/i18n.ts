import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const localeAliases: Record<string, string> = {
  zh: "zh-Hans",
  "zh-CN": "zh-Hans",
  "zh-SG": "zh-Hans",
  "zh-TW": "zh-Hans",
  "zh-Hant": "zh-Hans",
};

export async function loadLanguage(lang: string): Promise<void> {
  if (lang === "en") return;
  const resolved = localeAliases[lang] ?? lang;
  if (i18n.hasResourceBundle(resolved, "translation")) return;
  const messages = await import(`./locales/${resolved}.json`);
  i18n.addResourceBundle(resolved, "translation", messages.default);
}

export default i18n;
