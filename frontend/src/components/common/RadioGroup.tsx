import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RadioGroupProps {
  name: string;
  label: string;
  options: string[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, label, options }) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {t(label)} {errors[name] && <span className="text-red-600">*</span>}
      </label>
      <div className="mt-2 flex gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              {...register(name)}
              value={option}
              className="mr-2"
            />
            {t(`form.options.${option}`)}
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{t(error)}</p>}
    </div>
  );
};

export default RadioGroup;