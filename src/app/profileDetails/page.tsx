"use client";
import { useEffect, useState } from 'react';
import { useStore } from '../../../store/createLinkStore';
import { getCurrentUser, createProfileDocument, getProfileByUserId, getLinksByUserId, updateProfileDocument } from '@/libs/helpers/initializeAppwrite';
import { Models } from 'appwrite';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { FaImage } from 'react-icons/fa6';
import Input from '@/components/FormInput';
import LinkDisplayComponent from '../../components/LinkDisplayComponent';
import Button from '../../components/ButtonComponent';

const ProfileDetails: React.FC = () => {
    const links = useStore((state) => state.links);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userLinks, setUserLinks] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [profileId, setProfileId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);
                setEmail(user.email);

                if (user) {
                    const profile = await getProfileByUserId(user.$id);
                    if (profile) {
                        setProfileImage(profile.profileImage || null);
                        setFirstName(profile.firstName || "");
                        setLastName(profile.lastName || "");
                        setEmail(profile.email || "");
                        setProfileId(profile.$id);
                    }

                    const links = await getLinksByUserId(user.$id);
                    setUserLinks(links);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error('Please log in to continue');
                router.push("/auth/login");
            }
        };
        fetchUser();
    }, [router]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && profileId) {
                const profileData = {
                    profileImage,
                    firstName,
                    lastName,
                    email,
                };
                await updateProfileDocument(profileId, profileData);
                toast.success('Profile updated successfully!');
            } else {
                const profileData = {
                    profileImage,
                    firstName,
                    lastName,
                    email,
                };
                await createProfileDocument(profileData);
                toast.success('Profile created successfully!');
            }
            setIsEditing(false);
            // setEmail("");
            // setFirstName("");
            // setLastName("");
            // setProfileImage("");
        } catch (error) {
            console.error('Error saving profile data:', error);
            toast.error('Failed to update profile.');
        }
    };

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    return (
        <div className='w-full min-h-screen flex flex-col md:flex-row bg-secondaryClr-100 gap-8 p-4 md:p-8'>
            <Toaster position="top-right" />
            <div className='hidden md:flex flex-col justify-center items-center w-full md:w-[35%] bg-whiteClr rounded-md'>
                <div className="relative w-[300px] h-[600px] border-2 border-secondaryClr-default rounded-[2.5rem] shadow-xl flex justify-center items-center">
                    <div className="absolute top-[12px] left-1/2 w-[148px] h-[18px] bg-white border-2 border-t-0 border-secondaryClr-default rounded-b-[1rem] transform -translate-x-1/2"></div>
                    <div className="w-[272px] h-[572px] p-4 bg-white border-2 border-secondaryClr-default rounded-[2rem] flex flex-col items-center gap-6">
                        <div className='w-[120px] h-[120px] mt-5 rounded-full bg-secondaryClr-100'>
                            {profileImage && <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />}
                        </div>
                        <h1 className='font-semibold font-instrumentSans'>{firstName} {lastName}</h1>
                        <p>{email}</p>
                        <div className='w-full h-[50%] flex flex-col justify-center items-center overflow-y-auto'>
                            {userLinks.map((link, index) => (
                                <LinkDisplayComponent key={index} platform={link.platform} url={link.url} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-[65%] bg-whiteClr rounded-md p-4 md:p-[40px] flex flex-col'>
                <div>
                    <h1 className='text-2xl md:text-[32px] font-instrumentSans font-semibold text-secondaryClr-black'>
                        {isEditing ? 'Edit Profile Details' : 'Profile Details'}
                    </h1>
                    <p className='text-sm md:text-base text-secondaryClr-default font-instrumentSans font-normal'>
                        {isEditing ? 'Update your details to keep your profile current.' : 'Add your details to create a personal touch to your profile.'}
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSave}>
                    <div className='flex flex-col md:flex-row gap-3 items-center rounded-lg bg-secondaryClr-100 p-5 mt-6'>
                        <h3 className='text-secondaryClr-default text-[12px] mb-2 md:mb-0'>Profile picture</h3>
                        <div className='relative flex flex-col gap-3 items-center justify-center bg-primaryClr-100 rounded-lg w-[200px] h-[200px] text-primaryClr-300'>
                            {profileImage ? (
                                <>
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-lg" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg text-white">
                                        <FaImage size={25} />
                                        <h1 className="ml-2">Change Image</h1>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <FaImage size={25} />
                                    <h1>+ Upload Image</h1>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <h3 className='text-secondaryClr-default text-[12px] max-w-[233px] mt-2 md:mt-0'>Image must be below 1024x1024px. Use PNG or JPG format.</h3>
                    </div>
                    <div className='flex flex-col gap-8 bg-secondaryClr-100 rounded-lg p-5 mt-6'>
                        <div className='flex flex-col md:flex-row justify-between items-start'>
                            <h1 className='text-secondaryClr-default text-[16px]'>First Name*</h1>
                            <div className='w-full md:w-[60%]'>
                                <Input
                                    value={firstName}
                                    onChange={handleChange(setFirstName)}
                                    placeholder="e.g. John"
                                    errorMessage={""}
                                    showError
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-start'>
                            <h1 className='text-secondaryClr-default text-[16px]'>Last Name*</h1>
                            <div className='w-full md:w-[60%]'>
                                <Input
                                    value={lastName}
                                    onChange={handleChange(setLastName)}
                                    placeholder="e.g. Appleseed"
                                    errorMessage={""}
                                    showError
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-start'>
                            <h1 className='text-secondaryClr-default text-[16px]'>Email</h1>
                            <div className='w-full md:w-[60%]'>
                                <Input
                                    value={email}
                                    onChange={handleChange(setEmail)}
                                    placeholder="e.g. email@example.com"
                                    errorMessage={""}
                                    showError
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end items-center mt-4'>
                        {isEditing ? <Button size='small' type='submit'> Save </Button> : <></>}
                        {!isEditing && (
                            <Button size='small' type='button' onClick={() => setIsEditing(true)}>Edit</Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileDetails;
