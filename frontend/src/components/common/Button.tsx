// src/components/common/Button.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

type ButtonProps = HTMLMotionProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  loading = false,
  disabled,
  ...props
}) => {
  const baseClass = 'px-4 py-2 rounded font-semibold focus:outline-none flex items-center justify-center gap-2';
  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400',
  };

  return (
    <motion.button
      className={cn(baseClass, variantClass[variant], className, {
        'opacity-50 cursor-not-allowed': disabled || loading,
      })}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" />}
      {children as React.ReactNode}
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" />}
    </motion.button>
  );
};

export default Button;