import React from 'react';
import { HiOutlinePlusSmall } from "react-icons/hi2";


const SellButton = () => {
    return (
        <button className="bg-[#D9F99D] text-black rounded px-4 py-2 flex items-center space-x-2 w-full sm:w-auto">
            <HiOutlinePlusSmall className='text-[#171717]' size={20} />
            <span>Sell item</span>
        </button>
    );
};

export default SellButton;