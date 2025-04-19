import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: 'url(/assets/images/farmland.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4">{t('hero.title')}</h1>
        <p className="text-lg mb-6">{t('hero.subtitle')}</p>
        <Link to="/order-form">
          <Button variant="primary">{t('hero.cta')}</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;