import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    background?: 'white' | 'gray' | 'blue' | 'none';
    container?: boolean;
    id?: string;
    /** Section heading for accessibility (screen readers) */
    'aria-labelledby'?: string;
}

const Section: React.FC<SectionProps> = ({
    children,
    className = '',
    background = 'white',
    container = true,
    id,
    'aria-labelledby': ariaLabelledBy,
}) => {
    const backgrounds = {
        white: 'bg-[var(--color-surface)]',
        gray: 'bg-[var(--color-background)]',
        blue: 'bg-[var(--color-primary-50)]',
        none: '',
    };

    const containerClass = container ? 'container mx-auto px-[var(--space-4)] md:px-[var(--space-8)] max-w-7xl' : '';

    const paddingClass = 'py-[var(--space-12)] md:py-[var(--space-16)]';

    return (
        <section
            id={id}
            className={`${backgrounds[background]} ${paddingClass} ${className}`}
            aria-labelledby={ariaLabelledBy}
        >
            {container ? (
                <div className={containerClass}>
                    {children}
                </div>
            ) : (
                children
            )}
        </section>
    );
};

export default Section;
