import React, { createContext, useContext, useState, ReactNode } from 'react';
import i18n from '';

interface LanguageContextType {
  language: 'en' | 'rw';
  setLanguage: (lang: 'en' | 'rw') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'rw'>('en');

  const handleSetLanguage = (lang: 'en' | 'rw') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};