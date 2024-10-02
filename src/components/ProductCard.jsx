import React,{memo} from 'react'
import { HiOutlineHeart } from 'react-icons/hi2'
import Image from '../assets/image.png'

const ProductCard = ({product}) => {
    return (
        <div className="bg-white rounded-lg w-full max-w-[402px] mx-auto">
            <img 
                loading="lazy"
                src={product.image} 
                alt={product.title} 
                // className="w-full h-[260px] md:h-[326px] object-cover rounded-t-lg"
                className="w-full h-[260px] md:h-[326px] object-cover rounded-t-lg transform transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105"
            />
            <div className="flex justify-between items-center mt-1">
                <div className="flex flex-col">
                    <p className="text-base font-light">{product.title}</p>
                    <h2 className='text-lg font-semibold'>${product.price}</h2>
                </div>
                <div className="flex items-center justify-center border border-gray-200 rounded w-[36px] h-[36px] cursor-pointer">
                    <HiOutlineHeart className="text-[#171717]" size={20} />
                </div>
            </div>
            <div className='flex items-center gap-2 mt-2'>
                <img 
                    loading="lazy"
                    src={Image} 
                    className='w-[20px] h-[20px] rounded-full object-cover' 
                    alt="image" 
                />
                <p className='font-normal text-[10px]'>Josie Parker</p>
            </div>
        </div>

    )
}

export default memo(ProductCard)