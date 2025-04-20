import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface TextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({ name, label, placeholder, maxLength }) => {
  const { t } = useTranslation();
  const { register, formState: { errors }, watch } = useFormContext();
  const error = typeof errors[name]?.message === 'string' ? errors[name]?.message : undefined;
  const value = watch(name) || '';
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {t(label)} {error && <span className="text-red-600">*</span>}
      </label>
      <textarea
        id={name}
        {...register(name)}
        placeholder={placeholder ? t(placeholder) : undefined}
        maxLength={maxLength}
        className={`mt-1 block w-full border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
          error ? 'border-red-600' : 'border-gray-300'
        }`}
        rows={4}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <div className="flex justify-between mt-1">
        {error && (
          <AnimatePresence>
            <motion.p
              id={`${name}-error`}
              className="text-sm text-red-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {t(error)}
            </motion.p>
          </AnimatePresence>
        )}
        {maxLength && (
          <p className="text-sm text-gray-500">
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;