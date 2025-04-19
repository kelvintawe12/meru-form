import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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

const recentOrders = [
  { id: 1, product: 'Soy Oil (5L)', status: 'In Transit', date: '2025-04-15' },
  { id: 2, product: 'Soy Grains (10kg)', status: 'Delivered', date: '2025-04-10' },
];

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const closeSidebar = () => setIsCollapsed(true);

  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 8 },
    visible: { opacity: 1, x: 0 },
    hover: { background: 'rgba(251, 191, 36, 0.08)', scale: 1.02 }
  };

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: <Home className="h-5 w-5" /> },
    { to: '/order', label: t('nav.orderForm'), icon: <ShoppingCart className="h-5 w-5" /> },
    { to: '/portal', label: t('nav.clientPortal'), icon: <Users className="h-5 w-5" /> },
    { to: '/help', label: t('nav.help'), icon: <HelpCircle className="h-5 w-5" /> },
    { to: '/profile', label: t('nav.profile'), icon: <User className="h-5 w-5" /> },
  ];

  return (
    <>
      <motion.aside
        className={`fixed right-0 h-screen bg-gradient-to-b from-meru-black to-meru-slate/80 backdrop-blur-lg p-6 shadow-2xl transition-all duration-300 z-50 ${
          isCollapsed ? 'w-20' : 'w-80'
        }`}
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <button
          className="absolute -left-3 top-6 bg-meru-red p-2 rounded-full text-meru-white hover:bg-meru-amber transition-all shadow-lg hover:shadow-meru-amber/20"
          onClick={toggleCollapse}
        >
          {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {!isCollapsed && (
          <motion.div className="space-y-8" variants={sectionVariants}>
            {/* Quick Links */}
            <motion.div variants={sectionVariants}>
              <h3 className="text-lg font-bold text-meru-amber mb-4 uppercase tracking-wide">
                {t('sidebar.quickLinks')}
              </h3>
              <ul className="space-y-1.5">
                {navLinks.map((link) => (
                  <motion.li 
                    key={link.to} 
                    variants={itemVariants} 
                    whileHover="hover"
                  >
                    <NavLink
                      to={link.to}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors duration-200 ${
                          isActive
                            ? 'bg-meru-red/10 text-meru-amber border-r-4 border-meru-amber'
                            : 'text-meru-white/90 hover:text-meru-amber'
                        }`
                      }
                    >
                      <span className="shrink-0">{link.icon}</span>
                      <span className="text-sm font-medium">{link.label}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Recent Orders */}
            <motion.div variants={sectionVariants}>
              <h3 className="text-lg font-bold text-meru-amber mb-4 uppercase tracking-wide">
                {t('sidebar.recentOrders')}
              </h3>
              <ul className="space-y-3">
                {recentOrders.map((order) => (
                  <motion.li
                    key={order.id}
                    className="p-3 rounded-xl bg-meru-slate/20 backdrop-blur-sm"
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-meru-slate/30 rounded-lg">
                        <Package className="h-5 w-5 text-meru-amber" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-meru-white">{order.product}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Delivered' 
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-xs text-meru-gray">{order.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Product Highlight */}
            <motion.div variants={sectionVariants}>
              <h3 className="text-lg font-bold text-meru-amber mb-4 uppercase tracking-wide">
                {t('sidebar.productHighlight')}
              </h3>
              <motion.div 
                className="group relative overflow-hidden rounded-xl bg-meru-slate/20 backdrop-blur-sm p-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-square w-full mb-3 rounded-lg overflow-hidden">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Soybean_oil_bottle.jpg"
                    alt="Soy Oil"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-sm font-semibold text-meru-white mb-1">
                  {t('sidebar.featuredProduct')}
                </p>
                <p className="text-xs text-meru-gray/80 mb-4">
                  {t('sidebar.featuredDescription')}
                </p>
                <NavLink
                  to="/order"
                  onClick={closeSidebar}
                  className="inline-block w-full text-center py-2.5 bg-gradient-to-r from-meru-red to-meru-amber text-meru-black rounded-lg text-sm font-bold hover:bg-gradient-to-l transition-all duration-300"
                >
                  {t('sidebar.orderNow')}
                </NavLink>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.aside>

      {/* Main Content Wrapper */}
      <div
        className={`transition-margin duration-300 ${
          isCollapsed ? 'mr-20' : 'mr-80'
        }`}
      >
        {/* Your page content goes here */}
      </div>
    </>
  );
};

export default Sidebar;