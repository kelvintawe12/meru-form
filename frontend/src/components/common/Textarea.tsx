// src/components/common/Textarea.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '../../utils/cn';

interface TextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ name, label, placeholder, error }) => {
  const { register } = useFormContext();
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        className={cn('mt-1 w-full border rounded p-2', error ? 'border-red-600' : 'border-gray-300')}
        {...register(name)}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;