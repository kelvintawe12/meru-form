import React from 'react';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-green-600 mb-4">{t('sidebar.tips')}</h3>
      <ul className="space-y-2">
        <li>{t('sidebar.tip1')}</li>
        <li>{t('sidebar.tip2')}</li>
        <li>{t('sidebar.tip3')}</li>
      </ul>
      <h3 className="text-lg font-semibold text-green-600 mt-6 mb-4">{t('sidebar.suggestions')}</h3>
      <p>{t('sidebar.suggestion1')}</p>
    </aside>
  );
};

export default Sidebar;