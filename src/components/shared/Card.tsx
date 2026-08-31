import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hoverable' | 'glass' | 'accent';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick,
}) => {
  const baseStyle = 'rounded-xl p-6 transition-all duration-300 relative overflow-hidden';

  const variants = {
    default: 'bg-[#10161D] border border-[#7D8995]/20',
    hoverable:
      'bg-[#10161D] border border-[#3F4826]/20 hover:border-[#3F4826]/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3F4826]/10 cursor-pointer',
    glass: 'glass-panel border border-[#3F4826]/20',
    accent:
      'bg-[#10161D] border border-[#3F4826]/30 shadow-lg shadow-[#3F4826]/5 relative before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#3F4826]',
  };

  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
