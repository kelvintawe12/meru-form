import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <img src="/logo.png" alt="Mount Meru SoyCo" className="h-8 mb-2" />
          <p>{t('footer.tagline')}</p>
        </div>
        <div>
          <h3 className="font-semibold">{t('footer.contact')}</h3>
          <p>Kigali, Rwanda</p>
          <p>+250788123456</p>
          <p>info@mountmerusoyco.rw</p>
        </div>
        <div>
          <h3 className="font-semibold">{t('footer.links')}</h3>
          <a href="https://x.com/mountmerusoyco">{t('footer.x')}</a>
          <a href="https://wa.me/+250788123456">{t('footer.whatsapp')}</a>
          <a href="/privacy">{t('footer.privacy')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;