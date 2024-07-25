import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/createLinkStore';
import Button from './ButtonComponent';
import CraftImage from "@/images/Group 273.svg";
import LinkFormComponent from './LinkFormComponent';
import LinkDisplayComponent from './LinkDisplayComponent';
import { getCurrentUser, createMultipleDocuments } from '@/libs/helpers/initializeAppwrite';
import { Models } from 'appwrite';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const MainHomeSection: React.FC = () => {
    const links = useStore((state) => state.links);
    const addLink = useStore((state) => state.addLink);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error('Please log in to continue');
                router.push("/auth/login");
            }
        };
        fetchUser();
    }, [router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user) {
            toast.error('Please log in to submit links.');
            router.push("/auth/login");
            return;
        }

        toast.promise(
            createMultipleDocuments(links),
            {
                loading: 'Submitting links...',
                success: (result) => {
                    console.log('Links submitted successfully:', result);
                    return 'Links submitted successfully!';
                },
                error: (err) => {
                    console.error('Error submitting links:', err);
                    return err instanceof Error ? err.message : 'An unknown error occurred';
                },
            }
        );
    };

    return (
        <div className='w-full min-h-screen flex flex-col md:flex-row bg-secondaryClr-100 gap-8 p-4 md:p-8'>
            <Toaster position="top-right" />
            <div className='flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto'>
                <div className='hidden md:flex h-screen w-full md:w-[40%] bg-whiteClr flex-col rounded-md items-center justify-center'>
                    <div className="relative mx-auto border-secondaryClr-default border-[2px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl flex justify-center items-center">
                        <div className="w-[148px] h-[18px] border-2 border-t-0 border-secondaryClr-default top-[12px] rounded-b-[1rem] left-1/2 z-10 bg-white -translate-x-1/2 absolute"></div>
                        <div className="rounded-[2rem] overflow-hidden w-[272px] border-2 border-secondaryClr-default gap-6 h-[572px] bg-white flex flex-col justify-start items-center p-4">
                            <div className='w-[120px] h-[120px] rounded-full bg-secondaryClr-100 mt-5'></div>
                            <div className='w-[200px] h-[20px] rounded-full bg-secondaryClr-100'></div>
                            <div className='w-[100px] h-[20px] rounded-full bg-secondaryClr-100'></div>
                            <div className='w-full flex flex-col h-[50%] overflow-y-auto'>
                                {links.map((link, index) => (
                                    <LinkDisplayComponent key={index} platform={link.platform} url={link.url} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-full w-full md:w-[60%] bg-whiteClr flex flex-col rounded-md p-4 md:p-[40px]'>
                    <div>
                        <h1 className='text-2xl md:text-[32px] font-instrumentSans font-semibold text-secondaryClr-black'>Customize your links</h1>
                        <p className='text-sm md:text-base text-secondaryClr-default font-instrumentSans font-normal'>Add/edit/remove links below and then share all your profiles with the world!</p>
                        <div className='mt-6'>
                            <Button size="full-width" outline onClick={addLink}>+ Add new link</Button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {links.length === 0 ? (
                            <div className='flex flex-col justify-center items-center w-full bg-secondaryClr-100 mt-7 gap-10 p-4 md:p-[50px] rounded-lg'>
                                <Image src={CraftImage} alt="CraftImage" />
                                <div className='flex flex-col justify-center items-center text-center max-w-[488px] gap-5'>
                                    <h2 className='text-xl md:text-[32px] font-instrumentSans font-semibold text-secondaryClr-black'>Let's get you started</h2>
                                    <p className='text-sm md:text-base text-secondaryClr-default font-instrumentSans font-normal text-center'>Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
                                </div>
                            </div>
                        ) : (
                            links.map((link, index) => (
                                <LinkFormComponent key={index} index={index} />
                            ))
                        )}
                        <div className='flex justify-end items-center px-2 py-3 mt-4 fixed bottom-0 h-[60px] bg-white w-[60%] right-8 border-t border-secondaryClr-200'>
                            <Button size='small' type='submit'>Save</Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default MainHomeSection;