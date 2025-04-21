// src/components/common/Select.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '../../utils/cn';

interface SelectProps {
  name: string;
  label: string;
  options: string[];
  error?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({ name, label, options, error, required }) => {
  const { register } = useFormContext();
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <select
        id={name}
        className={cn('mt-1 w-full border rounded p-2', error ? 'border-red-600' : 'border-gray-300')}
        {...register(name)}
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;