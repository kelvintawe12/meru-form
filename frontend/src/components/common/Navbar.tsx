import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Menu, X, Home, ShoppingCart, User, HelpCircle, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'rw' : 'en');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const mobileMenuVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: { 
        duration: 0.4,
        ease: 'easeInOut',
        staggerChildren: 0.1,
        when: "afterChildren"
      }
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        staggerChildren: 0.1
      }
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
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
      className="bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl sticky top-0 z-50 border-b border-slate-700/50"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <NavLink
            to="/"
            className="group relative flex items-center gap-2"
          >
            <div className="text-2xl sm:text-3xl font-bold font-montserrat bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
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
          <div className="flex items-center gap-6">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-slate-700/30 backdrop-blur-sm'
                        : 'hover:bg-slate-700/20'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`transition-colors ${isActive ? 'text-amber-400' : 'text-slate-300 group-hover:text-amber-300'}`}>
                        {link.icon}
                      </span>
                      <span className={`font-medium ${isActive ? 'text-amber-400' : 'text-slate-300 group-hover:text-white'}`}>
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
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-900 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: language === 'en' ? 0 : 360 }}
                transition={{ duration: 0.5 }}
              >
                <Languages size={20} className="transition-transform group-hover:rotate-12" />
              </motion.div>
              <span className="font-semibold text-sm uppercase tracking-wide">
                {language === 'en' ? 'EN' : 'RW'}
              </span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-300"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-amber-400" />
              ) : (
                <Menu size={24} className="text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div className="flex flex-col gap-2 p-2">
                {navLinks.map((link) => (
                  <motion.div key={link.to} variants={mobileLinkVariants}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-amber-400/10 text-amber-400'
                            : 'text-slate-300 hover:bg-slate-700/30'
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                          {link.icon}
                        </span>
                      )}
                      <span className="font-medium">{link.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;