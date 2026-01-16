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
    const baseStyles = 'relative bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-300';

    const paddingStyles = {
        none: '',
        sm: 'p-4',
        md: 'p-8',
        lg: 'p-10',
    };

    const hoverStyles = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';

    const borderStyles = bordered ? 'border border-white/20 shadow-xl' : 'shadow-none';

    const combinedClasses = `${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${borderStyles} ${className}`;

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};

export default Card;
