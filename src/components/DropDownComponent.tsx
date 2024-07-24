import React, { useState, useRef, useEffect } from 'react';
import { FaLink, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaYoutube, FaTwitter, FaFacebook, FaTwitch, FaDev, FaCodepen, FaStackOverflow } from 'react-icons/fa6';
import { SiFrontendmentor, SiCodewars, SiFreecodecamp, SiGitlab, SiHashnode } from 'react-icons/si';

interface DropdownProps {
    label: string;
    placeholder?: string;
    items: { icon: JSX.Element; label: string }[];
    selectedItem?: string;
    onSelect: (item: Platform) => void;
}

type Platform =
    | 'Github'
    | 'FrontendMentor'
    | 'Twitter'
    | 'LinkedIn'
    | 'YouTube'
    | 'Facebook'
    | 'Twitch'
    | 'Devto'
    | 'Codewars'
    | 'Codepen'
    | 'freeCodeCamp'
    | 'GitLab'
    | 'Hashnode'
    | 'StackOverflow';

const Dropdown: React.FC<DropdownProps> = ({ label, items, selectedItem, placeholder, onSelect }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        setIsFocused(true);
        setIsOpen(!isOpen);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setIsOpen(false);
    };

    const handleSelect = (item: { icon: JSX.Element; label: string }) => {
        onSelect(item.label as Platform);
        setIsOpen(false);
        setIsFocused(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                handleBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const dropdownClass = `
    flex items-center border rounded-md px-3 py-2 transition-colors w-full cursor-pointer
    ${isFocused ? 'border-primaryClr-300 shadow-custom' : 'border-gray-300'}
    ${selectedItem && !isFocused ? 'border-[#D9D9D9]' : ''}
  `;

    const iconClass = `
    text-lg mr-2
    ${!isFocused ? 'text-gray-400' : 'text-primaryClr-300'}
  `;

    const itemClass = (item: string) => `
    flex items-center p-2 cursor-pointer hover:bg-gray-100
    ${item === selectedItem ? 'text-primaryClr-300' : 'text-gray-700'}
  `;

    const dividerClass = 'h-[1px] bg-gray-300 my-1 mx-2';

    const selectedItemIcon = items.find(item => item.label === selectedItem)?.icon;

    return (
        <div className="relative w-[100%]" ref={dropdownRef}>
            <p className='text-[12px] font-light font-instrumentSans text-secondaryClr-300'>{label}</p>
            <div
                className={dropdownClass}
                onClick={handleFocus}
                tabIndex={0}
            >
                <span className='text-md text-secondaryClr-300'>{selectedItemIcon || <FaLink className={iconClass} />}</span>
                <span className="flex-1 ml-2">{selectedItem || placeholder}</span>
                {isOpen ? <FaChevronUp className="ml-2 text-primaryClr-300" /> : <FaChevronDown className="ml-2 text-primaryClr-300" />}
            </div>
            {isOpen && (
                <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
                    {items.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className={itemClass(item.label)} onClick={() => handleSelect(item)}>
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                            </div>
                            <div className={dividerClass}></div>
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
