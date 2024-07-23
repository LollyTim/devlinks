import React from 'react'

const MainHomeSection = () => {
    return (
        <div className=' w-full h-screen flex flex-row bg-secondaryClr-100 gap-8 '>
            <div className=' flex flex-row gap-8 w-[90%] mx-auto '>
                <div className=' h-full w-[40%] bg-whiteClr flex flex-col rounded-md '></div>
                <div className=' h-full w-[60%] bg-whiteClr flex flex-col rounded-md '></div>
            </div>
        </div>
    )
}

export default MainHomeSection