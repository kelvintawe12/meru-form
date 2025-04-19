import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ name, label, type = 'text', placeholder }) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {t(label)} {errors[name] && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        id={name}
        {...register(name)}
        placeholder={placeholder ? t(placeholder) : undefined}
        className={`mt-1 w-full ${error ? 'border-red-600' : 'border-gray-300'}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{t(error)}</p>}
    </div>
  );
};

export default Input;