import React from 'react';
import { useTranslation } from 'react-i18next';

const Help: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('nav.help')}</h2>
      <p>Help Center (Coming Soon)</p>
    </div>
  );
};

export default Help;