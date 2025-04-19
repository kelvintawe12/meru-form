import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  disabled,
  loading,
  icon: Icon,
}) => {
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };

  return (
    <motion.button
      className={`flex items-center gap-2 ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {loading && <span className="animate-spin">⌀</span>}
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  );
};

export default Button;