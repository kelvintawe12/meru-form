import React, { createContext, useContext, useEffect } from 'react';
import i18n from '../utils/i18n';

// Define the context shape
interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
}

// Create context with a fallback value
export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: (lang: string) => { i18n.changeLanguage(lang); },
});

// Custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Provider component
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with localStorage or i18n.language or fallback to 'en'
  const [currentLanguage, setCurrentLanguage] = React.useState<string>(
    localStorage.getItem('portalLang') || i18n.language || 'en'
  );

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem('portalLang', lang); // Persist to localStorage
  };

  // Sync with i18n changes
  useEffect(() => {
    const handleLanguageChange = (lang: string) => {
      setCurrentLanguage(lang);
      localStorage.setItem('portalLang', lang);
    };

    // Listen for i18n language changes
    i18n.on('languageChanged', handleLanguageChange);

    // Cleanup listener on unmount
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};