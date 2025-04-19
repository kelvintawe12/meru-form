import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface DatePickerProps {
  name: string;
  label: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, label }) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {t(label)} {errors[name] && <span className="text-red-600">*</span>}
      </label>
      <input
        type="date"
        id={name}
        {...register(name)}
        className={`mt-1 w-full ${error ? 'border-red-600' : 'border-gray-300'}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{t(error)}</p>}
    </div>
  );
};

export default DatePicker;