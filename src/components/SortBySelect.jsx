import React, { useState } from 'react';
import { HiOutlineChevronDown ,HiChevronUp } from 'react-icons/hi2';

const SortBySelect = ({ sortBy, setSortBy }) => {

    const [isOpen, setIsOpen] = useState(false); 
    const handleToggle = () => {
        setIsOpen(!isOpen); 
    };

    const handleSelectChange = (e) => {
        setSortBy(e.target.value);
        const options = e.target.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                options[i].style.fontWeight = '600'; 
            } else {
                options[i].style.fontWeight = 'normal'; 
            }
        }
    };

    return (
        <div className="relative flex items-center space-x-2">
            <span className="font-semibold text-gray-700">Sort by</span>
            
            <div className="relative w-[220.45px]">
                <select
                    onChange={handleSelectChange}
                    onClick={handleToggle}
                    value={sortBy}
                    className="block w-full border rounded p-2 appearance-none focus:outline-none"
                    style={{ height: '44px' }}
                >
                    <option value="name-asc">A-Z</option>
                    <option value="name-desc">Z-A</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
                {/* icon */}
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-400 ease-in-out`}>
                    {isOpen ? (
                        <HiChevronUp className="text-gray-500" size={20} />
                    ) : (
                        <HiOutlineChevronDown className="text-gray-500" size={20} />
                    )}
                </div>
            </div>
        </div>


    );
};

export default SortBySelect;
