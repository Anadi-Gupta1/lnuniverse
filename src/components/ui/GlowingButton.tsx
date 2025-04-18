
import React from 'react';
import { cn } from '@/lib/utils';

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'blue' | 'green';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const GlowingButton = ({
  variant = 'blue',
  size = 'md',
  className,
  children,
  ...props
}: GlowingButtonProps) => {
  return (
    <button
      className={cn(
        'relative font-poppins font-medium rounded-full transition-all duration-300 hover:scale-105 overflow-hidden',
        variant === 'blue' 
          ? 'bg-gradient-blue text-white animate-glow' 
          : 'bg-gradient-green text-white animate-glow-green',
        size === 'sm' ? 'py-2 px-4 text-sm' : size === 'md' ? 'py-3 px-6 text-base' : 'py-4 px-8 text-lg',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default GlowingButton;
