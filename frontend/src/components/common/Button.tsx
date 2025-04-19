import React from 'react';
import { LucideIcon } from 'lucide-react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'px-4 py-2 rounded font-semibold focus:outline-none flex items-center justify-center gap-2';
  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button 
      className={`${baseClass} ${variantClass[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
};

export default Button;