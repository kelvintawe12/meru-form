import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface CheckboxProps {
  name: string;
  label: string;
  tooltip?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  tooltip,
  error,
  disabled = false,
  className = '',
  onChange,
  checked,
}) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <input
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        className={cn(
          'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
          disabled && 'cursor-not-allowed opacity-50'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center gap-1 cursor-pointer">
        {label}
        {tooltip && (
          <span
            className="text-gray-400 cursor-help"
            title={tooltip}
            aria-label={t('tooltip')}
          >
            &#9432;
          </span>
        )}
      </label>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
