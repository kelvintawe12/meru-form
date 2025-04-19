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
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <NavLink
          to="/"
          className="text-2xl font-bold font-sans tracking-tight hover:text-secondary-100 transition-colors duration-200"
        >
          Mount Meru SoyCo
        </NavLink>

        {/* Navigation Links and Language Toggle */}
        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <div className="hidden md:flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-sans text-sm uppercase tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
                }`
              }
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                `font-sans text-sm uppercase tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
                }`
              }
            >
              {t('nav.orderForm')}
            </NavLink>
            <NavLink
              to="/portal"
              className={({ isActive }) =>
                `font-sans text-sm uppercase tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
                }`
              }
            >
              {t('nav.clientPortal')}
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `font-sans text-sm uppercase tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
                }`
              }
            >
              {t('nav.help')}
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `font-sans text-sm uppercase tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
                }`
              }
            >
              {t('nav.profile')}
            </NavLink>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-primary-dark px-3 py-1 rounded-md hover:bg-secondary-300 hover:text-primary transition-all duration-200"
          >
            <Languages size={18} />
            <span className="font-sans text-sm uppercase">{language === 'en' ? 'EN' : 'RW'}</span>
          </button>

          {/* Mobile Menu Toggle (Hamburger) */}
          <button className="md:hidden text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by Default) */}
      <div className="md:hidden hidden flex-col gap-2 px-4 pb-4 bg-primary-dark">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-sans text-sm uppercase tracking-wide py-2 ${
              isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
            }`
          }
        >
          {t('nav.home')}
        </NavLink>
        <NavLink
          to="/order"
          className={({ isActive }) =>
            `font-sans text-sm uppercase tracking-wide py-2 ${
              isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
            }`
          }
        >
          {t('nav.orderForm')}
        </NavLink>
        <NavLink
          to="/portal"
          className={({ isActive }) =>
            `font-sans text-sm uppercase tracking-wide py-2 ${
              isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
            }`
          }
        >
          {t('nav.clientPortal')}
        </NavLink>
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `font-sans text-sm uppercase tracking-wide py-2 ${
              isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
            }`
          }
        >
          {t('nav.help')}
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `font-sans text-sm uppercase tracking-wide py-2 ${
              isActive ? 'text-secondary-100 font-semibold' : 'text-white hover:text-secondary-100'
            }`
          }
        >
          {t('nav.profile')}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;