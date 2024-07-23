import React, { useState } from 'react';

type ButtonVariant = 'default' | 'active' | 'disabled';

interface ButtonProps {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'full-width';
    outline?: boolean;
    initialVariant?: ButtonVariant;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    children,
    size = 'medium',
    outline = false,
    initialVariant = 'default',
    onClick,
}) => {
    const [variant, setVariant] = useState<ButtonVariant>(initialVariant);

    const baseClasses = 'py-2 px-4 rounded-lg font-semibold transition duration-300 ease-in-out';

    const variantClasses = variant === 'active'
        ? (outline ? 'border border-purple-600 bg-purple-100 text-purple-600' : 'bg-purple-400 text-white')
        : variant === 'disabled'
            ? (outline ? 'border border-purple-300 text-purple-300' : 'bg-purple-300 text-white cursor-not-allowed')
            : (outline ? 'border border-purple-600 text-purple-600' : 'bg-purple-600 text-white');

    const sizeClasses = size === 'small'
        ? 'text-sm'
        : size === 'medium'
            ? 'text-base'
            : 'w-full';

    const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${variant === 'disabled' ? 'opacity-50 cursor-not-allowed' : ''}`;

    const handleClick = () => {
        if (variant !== 'disabled') {
            setVariant(variant === 'default' ? 'active' : 'default');
            if (onClick) onClick();
        }
    };

    return (
        <button
            className={classes}
            onClick={handleClick}
            disabled={variant === 'disabled'}
        >
            {children}
        </button>
    );
};

export default Button;
