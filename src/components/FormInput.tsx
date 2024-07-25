import React, { useState, InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { FaLink } from 'react-icons/fa';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder: string;
    errorMessage?: string;
    showError?: boolean;
    icon?: IconType;
}

const Input: React.FC<InputProps> = ({ label, errorMessage, placeholder, showError, icon: Icon, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!props.value);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setIsFilled(!!e.target.value);
    };

    const inputClass = `
    flex items-center border rounded-md px-3 py-2 transition-colors font-instrumentSans w-full
    ${isFocused ? 'border-primaryClr-300 shadow-custom' : 'border-gray-300'}
    ${showError && errorMessage ? 'border-red-500' : ''}
    ${isFilled && !isFocused && !showError ? 'border-[#D9D9D9]' : ''}
  `;

    const iconClass = `
    text-sm mr-2
    ${`${showError && errorMessage ? 'text-red-500' : 'text-gray-400'} font-instrumentSans `}
  `;

    return (
        <div className="relative bg-white w-full">
            <label htmlFor="" className={showError && errorMessage ? "text-accent-default text-[12px]" : "text-gray text-[12px]"}>{label}</label>
            <label className={inputClass}>
                {Icon && <Icon className={iconClass} size={15} />}
                <input
                    className={`outline-none flex-1 bg-inherit ${showError && errorMessage ? "text-accent-default" : ""}`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    {...props}
                />
                {showError && errorMessage && (
                    <span className="text-red-500 absolute font-instrumentSans flex flex-nowrap text-nowrap text-[12px] right-[6px]">
                        {errorMessage}
                    </span>
                )}
            </label>
        </div>
    );
};

export default Input;
