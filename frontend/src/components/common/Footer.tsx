import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-teal-600 text-white p-4">
      <div className="container mx-auto text-center">
        <p>{t('footer.tagline')}</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="mailto:info@mountmerusoyco.rw" className="hover:underline">
            {t('footer.contact')}
          </a>
          <a href="https://x.com/mountmerusoyco" className="hover:underline">
            {t('footer.x')}
          </a>
          <a href="https://wa.me/+250788123456" className="hover:underline">
            {t('footer.whatsapp')}
          </a>
          <a href="/privacy" className="hover:underline">
            {t('footer.privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;