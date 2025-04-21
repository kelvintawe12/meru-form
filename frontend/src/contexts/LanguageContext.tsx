import React, { createContext, useContext } from 'react';
import i18n from '../utils/i18n';

// Named exports for context and hook
export const LanguageContext = createContext({
  currentLanguage: 'en',
  changeLanguage: (lang: string) => { i18n.changeLanguage(lang); }
});

// Custom hook with named export
export const useLanguage = () => useContext(LanguageContext);

// Provider component with named export
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = React.useState(i18n.language);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

function useState(language: string): [any, any] {
  throw new Error('Function not implemented.');
}
