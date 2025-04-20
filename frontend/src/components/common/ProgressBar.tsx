import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FormData } from '../../types/form';

const ProgressBar: React.FC = () => {
  const { t } = useTranslation();
  const { watch, formState: { errors } } = useFormContext<FormData>();
  const formData = watch();

  const calculateProgress = useMemo(() => {
    let filled = 0;
    let total = 0;

    // Required fields based on formSchema
    const requiredFields = {
      clientInfo: ['fullName', 'phoneNumber', 'address', 'clientCategory', 'dateOfRegistration', 'preferredContactMethod', 'clientTier'],
      orderDetails: ['orderDetails'], // At least one entry
      compliance: ['digitalSignature'],
    };

    // Check clientInfo
    requiredFields.clientInfo.forEach((field) => {
      total++;
      if (formData.clientInfo?.[field as keyof FormData['clientInfo']]) filled++;
    });

    // Check orderDetails
    total++;
    if (formData.orderDetails?.length > 0) filled++;

    // Check compliance
    requiredFields.compliance.forEach((field) => {
      total++;
      if (formData.compliance?.[field as keyof FormData['compliance']]) filled++;
    });

    return total > 0 ? Math.round((filled / total) * 100) : 0;
  }, [formData]);

  const missingFields = useMemo(() => {
    const missing: string[] = [];
    if (!formData.clientInfo?.fullName) missing.push(t('form.clientInfo'));
    if (!formData.orderDetails?.length) missing.push(t('form.orderDetails'));
    if (!formData.compliance?.digitalSignature) missing.push(t('form.compliance'));
    return missing;
  }, [formData, t]);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t('form.progress')} ({calculateProgress}%)
      </label>
      <div
        className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden"
        role="progressbar"
        aria-valuenow={calculateProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t('form.progress')}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${calculateProgress}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
      {missingFields.length > 0 && (
        <p className="mt-2 text-sm text-red-600">
          {t('form.missingFields')}: {missingFields.join(', ')}
        </p>
      )}
    </div>
  );
};

export default ProgressBar;