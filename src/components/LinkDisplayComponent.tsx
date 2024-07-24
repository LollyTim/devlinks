import React from 'react';
import { FaGithub, FaLink, FaLinkedin, FaYoutube, FaTwitter, FaFacebook, FaTwitch, FaDev, FaCodepen, FaStackOverflow } from 'react-icons/fa6';
import { SiFrontendmentor, SiCodewars, SiFreecodecamp, SiGitlab, SiHashnode } from 'react-icons/si';
import { LuEqual } from "react-icons/lu";

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

const platformStyles: Record<Platform, { background: string; color: string; icon: JSX.Element }> = {
    Github: { background: 'black', color: 'white', icon: <FaGithub /> },
    FrontendMentor: { background: 'white', color: 'black', icon: <SiFrontendmentor /> },
    Twitter: { background: '#1DA1F2', color: 'white', icon: <FaTwitter /> },
    LinkedIn: { background: '#0077B5', color: 'white', icon: <FaLinkedin /> },
    YouTube: { background: '#FF0000', color: 'white', icon: <FaYoutube /> },
    Facebook: { background: '#1877F2', color: 'white', icon: <FaFacebook /> },
    Twitch: { background: '#9146FF', color: 'white', icon: <FaTwitch /> },
    Devto: { background: 'black', color: 'white', icon: <FaDev /> },
    Codewars: { background: '#A43200', color: 'white', icon: <SiCodewars /> },
    Codepen: { background: 'black', color: 'white', icon: <FaCodepen /> },
    freeCodeCamp: { background: '#006400', color: 'white', icon: <SiFreecodecamp /> },
    GitLab: { background: '#FC6D26', color: 'white', icon: <SiGitlab /> },
    Hashnode: { background: '#2962FF', color: 'white', icon: <SiHashnode /> },
    StackOverflow: { background: '#F48024', color: 'white', icon: <FaStackOverflow /> },
};

interface LinkDisplayProps {
    platform: string;
    url: string;
}

const LinkDisplayComponent: React.FC<LinkDisplayProps> = ({ platform, url }) => {
    const style = platformStyles[platform as Platform] || { background: 'gray', color: 'white', icon: <FaLink /> };

    return (
        <div className="w-full px-4 py-2 mb-2 rounded-md flex items-center" style={{ background: style.background, color: style.color }}>
            {style.icon}
            <span className="ml-2">{platform}</span>
        </div>
    );
};

export default LinkDisplayComponent;
