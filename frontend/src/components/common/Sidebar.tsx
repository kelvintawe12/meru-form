import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ShoppingCart,
  Users,
  HelpCircle,
  User,
  Package,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Mock data for recent orders
const recentOrders = [
  { id: 1, product: 'Soy Oil (5L)', status: 'In Transit', date: '2025-04-15' },
  { id: 2, product: 'Soy Grains (10kg)', status: 'Delivered', date: '2025-04-10' },
];

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: <Home className="h-5 w-5" /> },
    { to: '/order', label: t('nav.orderForm'), icon: <ShoppingCart className="h-5 w-5" /> },
    { to: '/portal', label: t('nav.clientPortal'), icon: <Users className="h-5 w-5" /> },
    { to: '/help', label: t('nav.help'), icon: <HelpCircle className="h-5 w-5" /> },
    { to: '/profile', label: t('nav.profile'), icon: <User className="h-5 w-5" /> },
  ];

  return (
    <motion.aside
      className={`bg-gradient-to-b from-meru-black to-meru-slate/50 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      } md:block hidden relative`}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Collapse Toggle */}
      <button
        className="absolute -right-3 top-6 bg-meru-red p-1 rounded-full text-meru-white hover:bg-meru-amber transition-colors duration-300"
        onClick={toggleCollapse}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {!isCollapsed && (
        <div className="space-y-6">
          {/* Quick Links */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-lg font-semibold font-montserrat text-meru-red mb-3">
              {t('sidebar.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <motion.li key={link.to} variants={itemVariants}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-montserrat transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-meru-red/20 to-meru-amber/20 text-meru-amber'
                          : 'text-meru-white hover:bg-meru-slate/30'
                      }`
                    }
                  >
                    <span
                      className={`transition-colors ${
                        ({ isActive }) => isActive ? 'text-meru-amber' : 'text-meru-white group-hover:text-meru-amber'
                      }`}
                    >
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Recent Orders */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-lg font-semibold font-montserrat text-meru-red mb-3">
              {t('sidebar.recentOrders')}
            </h3>
            <ul className="space-y-3">
              {recentOrders.map((order) => (
                <motion.li
                  key={order.id}
                  className="group bg-meru-slate/20 p-3 rounded-lg hover:bg-meru-slate/40 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 8px rgba(251, 191, 36, 0.3)' }}
                >
                  <div className="flex items-center gap-2 text-sm text-meru-white">
                    <Package className="h-5 w-5 text-meru-amber" />
                    <div>
                      <p className="font-medium">{order.product}</p>
                      <p className="text-xs text-meru-gray">{order.status} • {order.date}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Product Highlight */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-lg font-semibold font-montserrat text-meru-red mb-3">
              {t('sidebar.productHighlight')}
            </h3>
            <div className="group bg-meru-slate/20 p-4 rounded-lg hover:bg-meru-slate/40 transition-all duration-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Soybean_oil_bottle.jpg"
                alt="Soy Oil"
                className="w-full h-32 object-cover rounded-md mb-2 group-hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-meru-white">{t('sidebar.featuredProduct')}</p>
              <p className="text-xs text-meru-gray mb-2">{t('sidebar.featuredDescription')}</p>
              <NavLink
                to="/order"
                className="inline-block px-4 py-2 bg-gradient-to-r from-meru-red to-meru-amber text-meru-black rounded-full text-sm font-semibold hover:from-meru-red-light hover:to-meru-amber-light transition-all duration-300"
              >
                {t('sidebar.orderNow')}
              </NavLink>
            </div>
          </motion.div>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;