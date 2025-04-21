// src/components/common/RadioGroup.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '../../utils/cn';

interface RadioGroupProps {
  name: string;
  label: string;
  options: string[];
  error?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, label, options, error }) => {
  const { register } = useFormContext();
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        {options.map((option) => (
          <label key={option} className="inline-flex items-center mr-4">
            <input
              type="radio"
              value={option}
              {...register(name)}
              className="form-radio"
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default RadioGroup;