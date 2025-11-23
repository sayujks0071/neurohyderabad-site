import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'md',
    hover = true,
    bordered = true,
}) => {
    const baseStyles = 'bg-[var(--color-surface)] rounded-lg overflow-hidden transition-all duration-200';

    const paddingStyles = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverStyles = hover ? 'hover:shadow-md hover:-translate-y-1 hover:border-[var(--color-primary-500)]' : '';
    const borderStyles = bordered ? 'border border-[var(--color-border)] shadow-sm' : 'shadow-none';

    const combinedClasses = `${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${borderStyles} ${className}`;

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};

export default Card;
