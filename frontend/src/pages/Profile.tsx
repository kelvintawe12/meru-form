import React from 'react';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('nav.profile')}</h2>
      <p>User Profile (Coming Soon)</p>
    </div>
  );
};

export default Profile;