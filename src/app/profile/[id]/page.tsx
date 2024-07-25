import React from 'react';
import { getProfileByUserId, getLinksByUserId } from '@/libs/helpers/initializeAppwrite';
import ProfilePage from '@/components/ProfilePage';

interface ProfilePageProps {
    params: {
        id: string;
    };
}

const ProfilePageWrapper = async ({ params }: ProfilePageProps) => {
    const { id } = params;

    if (!id) {
        return <div>Error: No user ID provided</div>;
    }

    let profile = null;
    let links: any[] = [];
    let error = null;

    try {
        const profileData = await getProfileByUserId(id);

        if (profileData) {
            profile = {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
                profileImage: profileData.profileImage,
            };

            const linksData = await getLinksByUserId(id);
            links = linksData.map((link: any) => ({
                platform: link.platform,
                url: link.url,
            }));
        } else {
            error = "Profile not found";
        }
    } catch (e) {
        error = "An error occurred while fetching the profile data.";
        console.error("Detailed error:", e);
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profile) {
        return <div>Profile not found</div>;
    }

    return <ProfilePage profile={profile} links={links} />;
};

export default ProfilePageWrapper;
