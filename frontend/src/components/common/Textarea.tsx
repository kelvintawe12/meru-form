import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <textarea
        ref={ref}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${error ? 'border-red-600 focus:ring-red-600' : 'focus:ring-blue-500'}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

export default Textarea;
