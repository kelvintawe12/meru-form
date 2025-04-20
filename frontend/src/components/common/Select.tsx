import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface SelectProps {
  name: string;
  label: string;
  options: string[];
  disabled?: boolean;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ name, label, options, disabled, placeholder }) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext();
  const error = typeof errors[name]?.message === 'string' ? errors[name]?.message : undefined;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {t(label)} {error && <span className="text-red-600">*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        disabled={disabled}
        className={`mt-1 block w-full border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 ${
          error ? 'border-red-600' : 'border-gray-300'
        }`}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {t(placeholder)}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {t(`options.${option}`)}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {t(error)}
        </p>
      )}
    </div>
  );
};

export default Select;