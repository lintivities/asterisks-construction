import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'action';
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseClass = `btn btn-${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={baseClass}>
        <span>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <button className={baseClass} {...props}>
      <span>{children}</span>
      {icon}
    </button>
  );
};

