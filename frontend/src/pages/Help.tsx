// src/pages/Help.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Help: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('help.title')}</h1>
        <p className="text-gray-600 mb-8">{t('help.subtitle')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('help.contact')}</h2>
          <p>{t('help.immediateHelp')}</p>
          <div className="mt-4 space-y-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              {t('help.startChat')}
            </button>
            <p>{t('help.phoneSupport')}: +250 788 123 456</p>
            <p>{t('help.supportHours')}</p>
            <p>{t('help.visitUs')}: Kigali, Rwanda</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('help.faq')}</h2>
          <p>Coming soon...</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('help.status')}</h2>
          <p>Check your order status in the Client Portal.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('help.emailFormTitle')}</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('help.fullName')}</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder={t('help.fullName')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('help.subject')}</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder={t('help.subjectPlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('help.message')}</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg"
                placeholder={t('help.messagePlaceholder')}
                rows={5}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {t('help.sendMessage')}
            </button>
          </form>
        </section>
      </motion.div>
    </div>
  );
};

export default Help;