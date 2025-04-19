import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface CheckboxProps {
  name: string;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label }) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          {...register(name)}
          className="mr-2"
        />
        {t(label)}
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{t(error)}</p>}
    </div>
  );
};

export default Checkbox;