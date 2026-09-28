import React from 'react';

export interface BadgeProps {
  variant?: 'dark' | 'light' | 'spec';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'dark',
  children,
  className = ''
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()}>
      {children}
    </span>
  );
};

