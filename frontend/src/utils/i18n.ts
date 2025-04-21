import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import rw from '../locales/rw.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      rw: { translation: rw },
    },
    lng: 'en',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'navigator', 'querystring'],
      caches: ['localStorage'],
      lookupLocalStorage: 'portalLang', // Explicitly use portalLang key
    },
    interpolation: {
      escapeValue: true,
    },
    debug: process.env.NODE_ENV === 'development',
    react: {
      useSuspense: true,
    },
    missingKeyHandler: (lngs, namespace, key) => {
      console.warn(`Missing ${namespace}:${key} in ${lngs.join(', ')}`);
    },
    keySeparator: '.',
    nsSeparator: ':',
  })
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('i18n initialized successfully with language:', i18n.language);
    }
  })
  .catch(console.error);

export default i18n;