import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  onClick,
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      whileHover={hover ? { y: -2, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-lg border border-gray-100 
        transition-all duration-200 
        ${hover ? 'hover:shadow-xl cursor-pointer' : ''}
        ${paddingClasses[padding]}
        ${onClick ? 'w-full text-left' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default Card;