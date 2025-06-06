import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const items = [
  { id: 1, image: '/assets/images/groundnut-oil.jpg', title: 'Groundnut Oil', description: 'High quality groundnut oil', discount: '10% off' },
  { id: 2, image: '/assets/images/gas.jpg', title: 'Gas', description: 'Reliable and safe gas supply', discount: '15% off' },
  { id: 3, image: '/assets/images/soap.jpg', title: 'Soap', description: 'Natural and fragrant soap', discount: '20% off' },
  { id: 4, image: '/assets/images/chippy.jpg', title: 'Chippy', description: 'Delicious and crispy chippy', discount: '5% off' },
];

const Carousel: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-green-600 mb-4">{t('carousel.title')}</h2>
      <div className="flex overflow-x-auto gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="flex-shrink-0 w-64 bg-white rounded-lg shadow-lg p-4"
            whileHover={{ scale: 1.05 }}
          >
            <img src={item.image} alt={t(item.title)} className="w-full h-32 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{t(item.title)}</h3>
            <p>{t(item.description)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;