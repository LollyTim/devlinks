import React, { useState } from 'react';
import { FaGithub, FaLink, FaLinkedin, FaYoutube, FaTwitter, FaFacebook, FaTwitch, FaDev, FaCodepen, FaStackOverflow } from 'react-icons/fa6';
import { SiFrontendmentor, SiCodewars, SiFreecodecamp, SiGitlab, SiHashnode } from 'react-icons/si';
import { LuEqual } from "react-icons/lu";
import Dropdown from './DropDownComponent';
import Input from './FormInput';
import { useStore } from '../../store/createLinkStore';
import { databases } from '@/libs/helpers/initializeAppwrite';
import toast from 'react-hot-toast';

interface LinkFormComponentProps {
    index: number;
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

interface ErrorState {
    platform: string;
    url: string;
}

const LinkFormComponent: React.FC<LinkFormComponentProps> = ({ index }) => {
    const link = useStore((state) => state.links[index]);
    const updateLink = useStore((state) => state.updateLink);
    const removeLink = useStore((state) => state.removeLink);
    const [errors, setErrors] = useState<ErrorState>({ platform: '', url: '' });

    const handleSelect = (item: Platform) => {
        updateLink(index, { ...link, platform: item });
        setErrors(prev => ({ ...prev, platform: '' }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = event.target.value;
        updateLink(index, { ...link, url: newUrl });
        validateUrl(newUrl);
    };

    const validateUrl = (url: string): boolean => {
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!url) {
            setErrors(prev => ({ ...prev, url: "Can't be empty" }));
            return false;
        } else if (!urlPattern.test(url)) {
            setErrors(prev => ({ ...prev, url: "Please check the URL" }));
            return false;
        } else {
            setErrors(prev => ({ ...prev, url: '' }));
            return true;
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        let newErrors = { platform: '', url: '' };

        if (!link.platform) {
            newErrors.platform = "Please select a platform";
            isValid = false;
        }

        if (!link.url) {
            newErrors.url = "Can't be empty";
            isValid = false;
        } else if (!validateUrl(link.url)) {
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
                'unique()',
                link
            );
            console.log('Document created successfully', response);
            toast.success('Link added successfully!');
        } catch (error) {
            console.error('Error creating document', error);
            if (error instanceof Error) {
                toast.error(`Error: ${error.message}`);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    const items: { icon: JSX.Element; label: Platform }[] = [
        { icon: <FaGithub />, label: "Github" },
        { icon: <SiFrontendmentor />, label: "FrontendMentor" },
        { icon: <FaTwitter />, label: "Twitter" },
        { icon: <FaLinkedin />, label: "LinkedIn" },
        { icon: <FaYoutube />, label: "YouTube" },
        { icon: <FaFacebook />, label: "Facebook" },
        { icon: <FaTwitch />, label: "Twitch" },
        { icon: <FaDev />, label: "Devto" },
        { icon: <SiCodewars />, label: "Codewars" },
        { icon: <FaCodepen />, label: "Codepen" },
        { icon: <SiFreecodecamp />, label: "freeCodeCamp" },
        { icon: <SiGitlab />, label: "GitLab" },
        { icon: <SiHashnode />, label: "Hashnode" },
        { icon: <FaStackOverflow />, label: "StackOverflow" },
    ];

    return (
        <form className='w-full bg-secondaryClr-100 flex flex-col gap-3 rounded-lg justify-center items-center px-5 py-4 mt-6' onSubmit={handleSubmit}>
            <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-row gap-1 text-secondaryClr-default items-center'>
                    <LuEqual size={16} />
                    <h3 className="text-[16px] text-secondaryClr-default font-medium font-instrumentSans">Link #{index + 1}</h3>
                </div>
                <button type='button' className='flex text-[12px] text-[#888888]' onClick={() => removeLink(index)}>Remove</button>
            </div>
            <div className='w-full flex flex-col gap-3'>
                <Dropdown
                    label="Platform"
                    placeholder="Select a platform"
                    items={items}
                    selectedItem={link.platform as Platform}
                    onSelect={handleSelect}
                />
                <Input
                    label="Link"
                    value={link.url}
                    onChange={handleChange}
                    placeholder="e.g. https://www.domain.com/username"
                    errorMessage={errors.url}
                    showError={!!errors.url}
                    icon={FaLink}
                />
            </div>
        </form>
    );
};

export default LinkFormComponent;