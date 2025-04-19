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
  X,
  Menu
} from 'lucide-react';

const recentOrders = [
  { id: 1, product: 'Soy Oil (5L)', status: 'In Transit', date: '2025-04-15' },
  { id: 2, product: 'Soy Grains (10kg)', status: 'Delivered', date: '2025-04-10' },
];

const FloatingSidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);
  const closePopup = () => setIsOpen(false);

  const popupVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: { 
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.02, backgroundColor: 'rgba(251, 191, 36, 0.05)' }
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
      {/* Floating Action Button */}
      <motion.button
        onClick={togglePopup}
        className="fixed bottom-8 right-8 z-50 p-4 bg-meru-red rounded-full shadow-xl hover:bg-meru-amber transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </motion.button>

      {/* Popup Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm">
            {/* Popup Content */}
            <motion.div
              className="fixed bottom-24 right-8 w-80 max-h-[70vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6 overflow-y-auto">
                {/* Quick Links */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {t('sidebar.quickLinks')}
                  </h3>
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <motion.li
                        key={link.to}
                        variants={itemVariants}
                        whileHover="hover"
                      >
                        <NavLink
                          to={link.to}
                          onClick={closePopup}
                          className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-xl transition-colors ${
                              isActive
                                ? 'bg-meru-red/10 text-meru-red'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`
                          }
                        >
                          {link.icon}
                          <span className="text-sm font-medium">{link.label}</span>
                        </NavLink>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Recent Orders */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {t('sidebar.recentOrders')}
                  </h3>
                  <ul className="space-y-3">
                    {recentOrders.map((order) => (
                      <motion.li
                        key={order.id}
                        variants={itemVariants}
                        className="p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-meru-red/10 rounded-lg">
                            <Package className="h-5 w-5 text-meru-red" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{order.product}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-amber-100 text-amber-600'
                              }`}>
                                {order.status}
                              </span>
                              <span className="text-xs text-gray-500">{order.date}</span>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Product Highlight */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {t('sidebar.productHighlight')}
                  </h3>
                  <div className="group relative overflow-hidden rounded-xl bg-gray-100 p-4">
                    <div className="aspect-square w-full mb-3 rounded-lg overflow-hidden">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Soybean_oil_bottle.jpg"
                        alt="Soy Oil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                      {t('sidebar.featuredProduct')}
                    </p>
                    <p className="text-xs text-gray-600 mb-4">
                      {t('sidebar.featuredDescription')}
                    </p>
                    <NavLink
                      to="/order"
                      onClick={closePopup}
                      className="inline-block w-full text-center py-2.5 bg-meru-red text-white rounded-lg text-sm font-bold hover:bg-meru-amber transition-colors"
                    >
                      {t('sidebar.orderNow')}
                    </NavLink>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingSidebar;