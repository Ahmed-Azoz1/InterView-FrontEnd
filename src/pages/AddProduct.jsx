import React, { useRef, useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; 

const Addtest2 = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate(); 

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files);
        const newPhotos = [];
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                newPhotos.push(reader.result); 
                if (newPhotos.length === files.length) {
                    setPhotos(newPhotos); 
                }
            };
            reader.readAsDataURL(file); 
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (photos.length === 0) {
            toast.error('يرجى تحميل صورة واحدة على الأقل!');
            return;
        }
        const productData = {
            id: Date.now(),
            title,
            description,
            category,
            price,
            image: photos[0], 
        };
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = [...storedProducts, productData];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        toast.success('تم إضافة المنتج بنجاح!');
        setTitle('');
        setDescription('');
        setCategory('');
        setPrice('');
        setPhotos([]);
        navigate('/');
    };

    const fileInputRef = useRef(null);
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-3/4 mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className='flex justify-between items-center'>
                <h2 className="text-2xl font-bold mb-4">Sell an item</h2>
                <Link to={'/'}>
                    <IoCloseOutline size={20}/>
                </Link>
            </div>

            <div className="mb-4 flex flex-col">
                <label className="text-gray-700 mb-2">Upload photos</label>
                <div className="relative w-full flex justify-center items-center border h-52 border-gray-300 rounded-lg"> 
                    <input
                        type="file"
                        onChange={handlePhotoUpload}
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        id="file-upload" 
                        ref={fileInputRef} 
                    />
                    <button 
                        className="border border-[#D9F99D] text-black text-base font-normal rounded px-8 py-2 z-10" 
                        onClick={handleUploadClick}
                        type="button"
                    >
                        Upload
                    </button>

                    {/* عرض الصور المحملة */}
                    {photos.length > 0 && (
                        <div className="mt-2 flex flex-wrap justify-center">
                            {photos.map((photo, index) => (
                                <img 
                                    key={index} 
                                    src={photo} 
                                    alt={`Uploaded ${index + 1}`} 
                                    className="h-20 w-20 object-cover m-1 border rounded"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Describe your item</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border resize-none rounded"
                    required
                    rows={6}
                ></textarea>
            </div>

            <div className="relative mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <div className="relative">
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full border rounded p-2 appearance-none focus:outline-none"
                        style={{ height: '44px' }}
                    >
                        <option value="" disabled>Select</option>
                        <option value="category1">Select 1</option>
                        <option value="category2">Select 2</option>
                        <option value="category3">Select 3</option>
                    </select>
                    {/* icon */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <HiOutlineChevronDown className="text-gray-500" size={20} />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Item Price</label>
                <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 pl-8 border rounded text-right"
                        placeholder="00.00"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-[#D9F99D] text-[#171717] font-normal text-base p-2 rounded hover:bg-[#D9F99D] transition"
            >
                Upload item
            </button>
        </form>
    );
};

export default Addtest2;
