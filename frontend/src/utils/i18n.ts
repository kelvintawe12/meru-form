import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import rw from '../locales/rw.json';

// Configure once
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
      order: ['htmlTag', 'navigator', 'querystring', 'cookie', 'localStorage'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: true, // Default XSS protection
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
      console.log('i18n initialized successfully');
    }
  })
  .catch(console.error);

export default i18n;