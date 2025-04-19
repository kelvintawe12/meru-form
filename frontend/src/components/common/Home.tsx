import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaLeaf, FaOilCan, FaHandsHelping, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-beige-50 font-montserrat"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section with Splash Image */}
      <section
        className="relative py-32 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/soy-field.jpg')` }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg"
            variants={itemVariants}
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-white max-w-3xl mx-auto mb-8 drop-shadow-md"
            variants={itemVariants}
          >
            {t('home.hero.subtitle')}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/order"
              className="inline-flex items-center px-8 py-4 bg-gold-500 text-green-900 font-semibold rounded-full hover:bg-gold-400 transition-transform transform hover:scale-105 shadow-md"
            >
              {t('home.hero.cta')}
              <FaArrowRight className="ml-3" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-green-800 text-center mb-12"
            variants={itemVariants}
          >
            {t('home.products.title')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-beige-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <FaOilCan className="text-green-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                {t('home.products.oil')}
              </h3>
              <p className="text-gray-600 text-center">
                {t('home.products.oil_desc')}
              </p>
            </motion.div>
            <motion.div
              className="bg-beige-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <FaLeaf className="text-green-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                {t('home.products.grains')}
              </h3>
              <p className="text-gray-600 text-center">
                {t('home.products.grains_desc')}
              </p>
            </motion.div>
            <motion.div
              className="bg-beige-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <FaHandsHelping className="text-green-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                {t('home.products.community')}
              </h3>
              <p className="text-gray-600 text-center">
                {t('home.products.community_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability Section with Splash Image */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/community.jpg')` }}
      >
        <div className="absolute inset-0 bg-green-800 bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2 mb-8 lg:mb-0"
            variants={imageVariants}
          >
            <img
              src="/images/soy-oil.jpg"
              alt={t('home.sustainability.image_alt')}
              className="w-full h-80 object-cover rounded-xl shadow-lg mx-auto"
            />
          </motion.div>
          <motion.div className="lg:w-1/2 lg:pl-12" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              {t('home.sustainability.title')}
            </h2>
            <p className="text-gray-100 mb-6 drop-shadow-md">
              {t('home.sustainability.description')}
            </p>
            <Link
              to="/about"
              className="text-gold-400 font-semibold hover:text-gold-300 inline-flex items-center"
            >
              {t('home.sustainability.learn_more')}
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600 text-white text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          variants={itemVariants}
        >
          {t('home.cta.title')}
        </motion.h2>
        <motion.p
          className="text-lg max-w-2xl mx-auto mb-8"
          variants={itemVariants}
        >
          {t('home.cta.description')}
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="/order"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-md"
          >
            {t('home.cta.button')}
            <FaArrowRight className="ml-3" />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;