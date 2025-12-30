import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    background?: 'white' | 'gray' | 'blue' | 'none';
    container?: boolean;
    id?: string;
}

const Section: React.FC<SectionProps> = ({
    children,
    className = '',
    background = 'white',
    container = true,
    id,
}) => {
    const backgrounds = {
        white: 'bg-white',
        gray: 'bg-[var(--color-background)]', // Using the variable from globals.css which is usually a light gray/off-white
        blue: 'bg-[var(--color-primary-50)]',
        none: '',
    };

    const containerClass = container ? 'container mx-auto px-4 md:px-8 max-w-7xl' : '';

    // Use a consistent padding class, e.g., py-16 from Tailwind or a custom class if defined
    // globals.css defines .section with padding, but we can also use utility classes for flexibility
    const paddingClass = 'py-12 md:py-16';

    return (
        <section id={id} className={`${backgrounds[background]} ${paddingClass} ${className}`}>
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
