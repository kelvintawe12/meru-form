import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { Languages } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'rw' : 'en');
  };

  return (
    <nav className="bg-teal-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold">
          Mount Meru SoyCo
        </NavLink>
        <div className="flex gap-4 items-center">
          <NavLink to="/" className="hover:underline">
            {t('nav.home')}
          </NavLink>
          <NavLink to="/order" className="hover:underline">
            {t('nav.orderForm')}
          </NavLink>
          <NavLink to="/portal" className="hover:underline">
            {t('nav.clientPortal')}
          </NavLink>
          <NavLink to="/help" className="hover:underline">
            {t('nav.help')}
          </NavLink>
          <NavLink to="/profile" className="hover:underline">
            {t('nav.profile')}
          </NavLink>
          <button onClick={toggleLanguage} className="flex items-center gap-2">
            <Languages size={20} />
            {language === 'en' ? 'EN' : 'RW'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;