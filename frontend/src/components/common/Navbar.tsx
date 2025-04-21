import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { Languages, Menu, X, Home, ShoppingCart, User, HelpCircle, Users } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'rw' : 'en';
    i18n.changeLanguage(newLang);
    changeLanguage(newLang);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  };

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.4, ease: 'easeInOut', staggerChildren: 0.1 } },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: <Home className="h-5 w-5" /> },
    { to: '/order', label: t('nav.orderForm'), icon: <ShoppingCart className="h-5 w-5" /> },
    { to: '/portal', label: t('nav.clientPortal'), icon: <Users className="h-5 w-5" /> },
    { to: '/help', label: t('nav.help'), icon: <HelpCircle className="h-5 w-5" /> },
    { to: '/profile', label: t('nav.profile'), icon: <User className="h-5 w-5" /> },
  ];

  return (
    <motion.nav
      className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg sticky top-0 z-50 border-b border-gray-600/50"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <NavLink to="/" className="group relative flex items-center gap-2">
            <div className="text-3xl font-bold font-montserrat bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Mount Meru SoyCo
            </div>
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </NavLink>

          {/* Desktop Navigation and Controls */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive ? 'bg-amber-400/20' : 'hover:bg-gray-600/20'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`transition-colors ${isActive ? 'text-amber-400' : 'text-gray-200 group-hover:text-amber-300'}`}>
                        {link.icon}
                      </span>
                      <span className={`font-medium ${isActive ? 'text-amber-400' : 'text-gray-200 group-hover:text-white'}`}>
                        {link.label}
                      </span>
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 -z-10 bg-amber-400/10 rounded-lg"
                          layoutId="activeBg"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-gray-900 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: i18n.language === 'en' ? '0 0 10px rgba(251, 191, 36, 0.5)' : '0 0 10px rgba(255, 85, 0, 0.5)' }}
              aria-label={t('nav.toggleLanguage')}
            >
              <motion.div
                animate={{ rotate: i18n.language === 'en' ? 0 : 360 }}
                transition={{ duration: 0.5 }}
              >
                <Languages size={20} />
              </motion.div>
              <span className="font-semibold text-sm uppercase tracking-wide">
                {i18n.language === 'en' ? 'EN' : 'RW'}
              </span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-600/30 transition-colors duration-300"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {isMobileMenuOpen ? <X size={24} className="text-amber-400" /> : <Menu size={24} className="text-gray-200" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 bg-gray-700/80 backdrop-blur-sm rounded-xl overflow-hidden p-4"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <motion.div key={link.to} variants={mobileLinkVariants}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive ? 'bg-amber-400/20 text-amber-400' : 'text-gray-200 hover:bg-gray-600/30'
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-gray-200">{link.icon}</span>
                      <span className="font-medium">{link.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;