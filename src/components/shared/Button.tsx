import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'cyan' | 'warning' | 'critical' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-display font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-95';

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-md gap-1.5',
    md: 'px-6 py-3 text-sm rounded-lg gap-2',
    lg: 'px-8 py-4 text-base rounded-xl gap-2.5 shadow-lg',
  };

  const variants = {
    primary:
      'bg-gradient-cyan text-white shadow-[#3F4826]/25 hover:shadow-[#3F4826]/40 hover:scale-[1.02] border border-white/20',
    cyan:
      'bg-gradient-cyan text-white shadow-[#3F4826]/25 hover:shadow-[#3F4826]/40 hover:scale-[1.02] border border-white/20',
    warning:
      'bg-gradient-warning text-slate-950 shadow-[#F5B416]/25 hover:shadow-[#F5B416]/40 hover:scale-[1.02]',
    critical:
      'bg-gradient-critical text-white shadow-[#FF7043]/30 hover:shadow-[#FF7043]/50 hover:scale-[1.02]',
    secondary:
      'bg-[#10161D] text-[#F1F4F6] border border-[#3F4826]/30 hover:border-[#3F4826] hover:bg-[#10161D]/80',
    ghost:
      'bg-transparent text-[#7D8995] hover:text-[#F1F4F6] hover:bg-[#10161D]/50 border border-transparent',
  };

  return (
    <button
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
