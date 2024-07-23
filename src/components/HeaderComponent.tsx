import React from 'react'
import LogoImge from "@/images/devlinkLogo.png"
import Image from 'next/image'
import { FaLink } from "react-icons/fa6";
import { PiUserCircle } from "react-icons/pi";
import Button from './ButtonComponent';



const HeaderComponent = () => {
    return (
        <div className=' w-full flex flex-row justify-center items-center  mx-auto bg-secondaryClr-100 h-[124px]'>
            <div className='w-[90%] flex flex-row justify-between items-center rounded-lg h-[50%] bg-whiteClr px-10'>
                <div><Image src={LogoImge} alt="LogoImge" className=' w-[146px]' /></div>
                <div className=' flex flex-row gap-3'>
                    <button className=' rounded-md flex flex-row gap-2 text-[16px] font-instrumentSans font-semibold text-primaryClr-300 bg-primaryClr-100 items-center justify-center px-5 py-2  '>
                        <FaLink size={20} />
                        <span>Link</span>
                    </button>
                    <button className=' flex flex-row gap-2 text-[16px] transition-all active:text-primaryClr-300 font-instrumentSans font-semibold text-secondaryClr-300  items-center justify-center px-5 py-2  '>
                        <PiUserCircle size={20} />
                        <span>Profile Details</span>
                    </button>
                </div>
                <div><Button size='small' outline > Preview </Button></div>
            </div>
        </div>
    )
}

export default HeaderComponent