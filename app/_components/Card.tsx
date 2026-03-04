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
    const baseStyles = 'relative surface-glass overflow-hidden transition-all duration-300';

    const paddingStyles = {
        none: '',
        sm: 'p-[var(--space-4)]',
        md: 'p-[var(--space-8)]',
        lg: 'p-[var(--space-10)]',
    };

    const hoverStyles = hover ? 'hover:shadow-[var(--shadow-xl)] motion-safe:hover:-translate-y-1' : '';

    const borderStyles = bordered ? 'shadow-[var(--shadow-lg)]' : 'shadow-none';

    const combinedClasses = `${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${borderStyles} ${className}`;

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};

export default Card;
