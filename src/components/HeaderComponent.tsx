import React, { useState, useEffect } from 'react';
import LogoImge from "@/images/devlinkLogo.png";
import LogoImgeMobile from "@/images/Group 251.svg";
import Image from 'next/image';
import { FaLink } from "react-icons/fa6";
import { PiUserCircle } from "react-icons/pi";
import Button from './ButtonComponent';
import { BsEye } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { getCurrentUser } from '@/libs/helpers/initializeAppwrite';

const HeaderComponent = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();
    const currentPath = usePathname();


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);

        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setUserId(user.$id);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePreviewClick = () => {
        if (userId) {
            router.push(`/profile/${userId}`);
        } else {
            console.error('User ID not available');
        }
    };

    const getButtonClasses = (path: string) => {
        const isActive = currentPath === path;
        return `rounded-md flex flex-row gap-2 text-[16px] font-instrumentSans font-semibold items-center justify-center px-5 py-2 transition-all ${isActive ? 'text-primaryClr-300 bg-primaryClr-100' : 'text-secondaryClr-default'
            }`;
    };

    return (
        <div className='w-full flex flex-row justify-center items-center mx-auto bg-secondaryClr-100 h-[124px]'>
            <div className='w-[90%] flex flex-row justify-between items-center rounded-lg h-[50%] bg-whiteClr px-10'>
                <div>
                    <Image src={isMobile ? LogoImgeMobile : LogoImge} alt="LogoImge" className={isMobile ? "w-[40px]" : "w-[146px]"} />
                </div>
                <div className='flex flex-row gap-3'>
                    {isMobile ? (
                        <>
                            <button onClick={() => router.push(`/`)} className={getButtonClasses(`/`)}>
                                <FaLink size={20} />
                            </button>
                            <button onClick={() => router.push(`/profileDetails`)} className={getButtonClasses(`/profileDetails`)}>
                                <PiUserCircle size={20} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => router.push(`/`)} className={getButtonClasses(`/`)}>
                                <FaLink size={20} />
                                <span>Link</span>
                            </button>
                            <button onClick={() => router.push(`/profileDetails`)} className={getButtonClasses(`/profileDetails`)}>
                                <PiUserCircle size={20} />
                                <span>Profile Details</span>
                            </button>
                        </>
                    )}
                </div>
                <div>
                    {isMobile ? (
                        <button onClick={handlePreviewClick} className={getButtonClasses(`/profile/${userId}`)}>
                            <BsEye size={20} />
                        </button>
                    ) : (
                        <Button size='small' outline onClick={handlePreviewClick}>Preview</Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;
