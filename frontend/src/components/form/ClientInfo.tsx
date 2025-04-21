// src/components/form/ClientInfo.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const ClientInfo: React.FC = () => {
  const { t } = useTranslation('translation');
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">{t('form.clientInfo')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">{t('form.fullName')}</label>
          <input
            {...register('clientInfo.fullName')}
            placeholder={t('form.fullNamePlaceholder')}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            aria-invalid={!!errors.clientInfo?.fullName}
          />
          {errors.clientInfo?.fullName && (
            <p className="text-red-600 text-sm">{t(errors.clientInfo.fullName.message)}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">{t('form.phoneNumber')}</label>
          <input
            {...register('clientInfo.phoneNumber')}
            placeholder={t('form.phoneNumberPlaceholder')}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            aria-invalid={!!errors.clientInfo?.phoneNumber}
          />
          {errors.clientInfo?.phoneNumber && (
            <p className="text-red-600 text-sm">{t(errors.clientInfo.phoneNumber.message)}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">{t('form.email')}</label>
          <input
            {...register('clientInfo.email')}
            placeholder={t('form.emailPlaceholder')}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            aria-invalid={!!errors.clientInfo?.email}
          />
          {errors.clientInfo?.email && (
            <p className="text-red-600 text-sm">{t(errors.clientInfo.email.message)}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">{t('form.clientCategory')}</label>
          <select
            {...register('clientInfo.clientCategory')}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            aria-invalid={!!errors.clientInfo?.clientCategory}
          >
            <option value="">{t('form.select')}</option>
            {Object.keys(t('options.clientCategory', { returnObjects: true })).map((key) => (
              <option key={key} value={key}>
                {t(`options.clientCategory.${key}`)}
              </option>
            ))}
          </select>
          {errors.clientInfo?.clientCategory && (
            <p className="text-red-600 text-sm">{t(errors.clientInfo.clientCategory.message)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;