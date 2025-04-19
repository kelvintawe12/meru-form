import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormData } from '../types/form';

const ProgressBar: React.FC = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const formData = watch() as FormData;

  const calculateProgress = (): number => {
    let filled = 0;
    let total = 0;

    const countFields = (obj: any) => {
      Object.values(obj).forEach((value) => {
        if (Array.isArray(value)) {
          value.forEach((item) => countFields(item));
        } else if (value && typeof value === 'object') {
          countFields(value);
        } else {
          total++;
          if (value !== '' && value !== undefined && value !== null) filled++;
        }
      });
    };

    countFields(formData);
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  };

  const progress = calculateProgress();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">
        {t('form.progress')} ({progress}%)
      </label>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;