import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, options, error, ...props }, ref) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <select
        ref={ref}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${error ? 'border-red-600 focus:ring-red-600' : 'focus:ring-blue-500'}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

export default Select;
