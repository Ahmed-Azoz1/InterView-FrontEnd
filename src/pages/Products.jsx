import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import SearchBar from '../components/SearchBar';
import SellButton from '../components/SellButton';
import SortBySelect from '../components/SortBySelect';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import productImage1 from '../assets/1.png';
import productImage2 from '../assets/2.png';
import productImage3 from '../assets/3.png';
import productImage4 from '../assets/4.png';

const Products = () => {
    const initialProducts = [
        { id: 1, title: 'Product Name', image: productImage1, price: 100, category: 'فئة 1' },
        { id: 2, title: 'Product Name', image: productImage2, price: 200, category: 'فئة 1' },
        { id: 3, title: 'Product Name', image: productImage3, price: 150, category: 'فئة 2' },
        { id: 4, title: 'Product Name', image: productImage4, price: 250, category: 'فئة 2' },
        { id: 5, title: 'Product Name', image: productImage2, price: 250, category: 'فئة 2' },
        { id: 6, title: 'Product Name', image: productImage1, price: 250, category: 'فئة 2' },
        { id: 7, title: 'Product Name', image: productImage3, price: 300, category: 'فئة 2' },
        { id: 8, title: 'Product Name', image: productImage2, price: 300, category: 'فئة 2' },
        { id: 9, title: 'Product Name', image: productImage1, price: 400, category: 'فئة 2' },
        { id: 10, title: 'Product Name', image: productImage1, price: 250, category: 'فئة 2' },
        { id: 11, title: 'Product Name', image: productImage4, price: 250, category: 'فئة 2' },
        { id: 12, title: 'Product Name', image: productImage3, price: 250, category: 'فئة 2' },
        { id: 13, title: 'Product Name', image: productImage2, price: 250, category: 'فئة 2' },
    ];

    const [products, setProducts] = useState(() => {
        try {
            const storedProducts = localStorage.getItem('products');
            return storedProducts ? JSON.parse(storedProducts) : initialProducts;
        } catch (error) {
            console.error('حدث خطأ أثناء قراءة المنتجات من localStorage:', error);
            return initialProducts; 
        }
    });

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 4;


    // تحديث localStorage كلما تغيرت قائمة المنتجات
    useEffect(() => {
        try {
            localStorage.setItem('products', JSON.stringify(products));
        } catch (error) {
            console.error('حدث خطأ أثناء تحديث localStorage:', error);
        }
    }, [products]);

    // دالة لإضافة منتج جديد
    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const filteredProducts = products
        .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return 0;
        });

    const indexOfLastProduct = (currentPage + 1) * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <>
            <Helmet>
                <title>Products Page</title>
                <meta name="description" content="Description of the product page" />
                <meta name="keywords" content="products, ecommerce, buy online" />
            </Helmet>
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
                    <SearchBar search={search} setSearch={setSearch} />
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                        <SortBySelect sortBy={sortBy} setSortBy={setSortBy} />
                        <Link to={'/addProduct'} className="w-full sm:w-auto">
                            <SellButton />
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-16">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-12">
                    <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
                </div>
            </Container>
        </>
    );
};

export default Products;
