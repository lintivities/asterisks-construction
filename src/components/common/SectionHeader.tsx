import React from 'react';

export interface SectionHeaderProps {
  tag?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  description,
  align = 'center',
  className = ''
}) => {
  return (
    <div className={`section-header ${align} ${className}`.trim()}>
      {tag && <span className="section-tag">{tag}</span>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
};

