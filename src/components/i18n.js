import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "../assets/locales/en.json";
import translationRu from "../assets/locales/ru.json";

// the translations
const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;