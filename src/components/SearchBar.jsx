import React from 'react';
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="flex items-center border rounded w-full max-w-[528.68px] h-[44px] px-2">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-full p-2 border-none rounded-r focus:outline-none"
                placeholder="Search"
            />
            <div className="flex items-center pr-2">
                <IoSearchOutline className="text-gray-500" size={20} />
            </div>
        </div>
    );
};

export default SearchBar