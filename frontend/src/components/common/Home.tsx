import React from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('nav.home')}</h2>
      <p>Welcome to Mount Meru SoyCo Rwanda</p>
    </div>
  );
};

export default Home;