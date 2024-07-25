// components/ProfilePage.tsx
"use client";

import React from 'react';
import LinkDisplayComponent from '@/components/LinkDisplayComponent';
import Image from 'next/image';
import Button from '@/components/ButtonComponent';
import defaultProfileImg from "@/images/R.jpeg";

interface ProfilePageProps {
    profile: {
        firstName: string;
        lastName: string;
        email: string;
        profileImage: string;
    };
    links: { platform: string; url: string }[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, links }) => {
    return (
        <div className="min-h-screen bg-whiteClr flex flex-col items-center">
            <div className=' w-full md:bg-primaryClr-300 rounded-bl-3xl rounded-br-3xl h-[300px] justify-center flex'>
                <div className=' flex flex-row justify-between items-center bg-whiteClr w-[90%] h-[70px] rounded-md px-6 py-3 mt-5 '>
                    <Button size='medium' outline>Back to Editor</Button>
                    <Button size='medium' >Share Link</Button>
                </div>
            </div>
            <div className=' -mt-32 flex flex-col justify-center items-center px-8 py-5 rounded-lg bg-whiteClr shadow-2xl w-[320px] md:w-[349px] '>
                <div className="text-center">
                    <Image
                        src={profile.profileImage || defaultProfileImg}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        width={96}
                        height={96}
                        className="mx-auto rounded-full border-4 border-white shadow-lg"
                    />
                    <h1 className="mt-4 text-xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h1>
                    <p className="text-gray-600 text-sm">{profile.email}</p>
                </div>
                <div className="mt-6 space-y-4 w-[80%]">
                    {links.map((link, index) => (
                        <LinkDisplayComponent
                            key={index}
                            platform={link.platform}
                            url={link.url}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
