import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { Menu, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <nav className="bg-teal-600 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Mount Meru SoyCo" className="h-8" />
          <span className="font-bold text-xl">Mount Meru SoyCo Rwanda</span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/order-form">{t('nav.orderForm')}</Link>
          <Link to="/client-portal">{t('nav.clientPortal')}</Link>
          <Link to="/help">{t('nav.help')}</Link>
          <select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value as 'en' | 'rw')}
            className="bg-teal-700 text-white rounded p-1"
          >
            <option value="en">English</option>
            <option value="rw">Kinyarwanda</option>
          </select>
          <button className="flex items-center gap-1">
            <User size={20} />
            {t('nav.profile')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;