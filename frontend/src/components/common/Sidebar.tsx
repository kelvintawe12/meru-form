import React from 'react';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <aside className="w-64 bg-white p-4 rounded-lg shadow-md ml-4 hidden md:block">
      <h3 className="text-lg font-semibold mb-2">{t('sidebar.tips')}</h3>
      <ul className="list-disc pl-4">
        <li>{t('sidebar.tip1')}</li>
        <li>{t('sidebar.tip2')}</li>
        <li>{t('sidebar.tip3')}</li>
      </ul>
      <h3 className="text-lg font-semibold mt-4 mb-2">{t('sidebar.suggestions')}</h3>
      <ul className="list-disc pl-4">
        <li>{t('sidebar.suggestion1')}</li>
      </ul>
    </aside>
  );
};

export default Sidebar;