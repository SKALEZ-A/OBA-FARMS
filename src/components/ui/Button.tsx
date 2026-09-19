import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'quiet';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-body font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]';
  
  const variantStyles = {
    primary: 'bg-leaf-700 text-white hover:bg-leaf-900 focus:ring-palm-600',
    secondary: 'bg-transparent border-2 border-leaf-700 text-leaf-700 hover:bg-leaf-100 focus:ring-palm-600',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#128C7E] focus:ring-palm-600',
    quiet: 'text-leaf-900 opacity-60 hover:opacity-100 underline focus:ring-palm-600',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className} button-press`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}