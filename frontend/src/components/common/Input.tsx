// src/components/common/Input.tsx
import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, name, error, className, ...props }, ref) => {
  const { register } = useFormContext();
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {props.required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={name}
        className={cn(
          'mt-1 w-full border rounded p-2',
          error ? 'border-red-600' : 'border-gray-300',
          className
        )}
        {...(name ? register(name) : {})}
        {...props}
        ref={ref}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
