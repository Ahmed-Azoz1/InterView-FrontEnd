import React, { useState, useEffect, useMemo } from 'react';
import Container from '../components/Container';
import SearchBar from '../components/SearchBar';
import SellButton from '../components/SellButton';
import SortBySelect from '../components/SortBySelect';
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import { Helmet } from 'react-helmet';
import { initialProducts } from '../utils/Data';
import AddProductPopup from './AddProductPopup';





const ProductsPopup = () => {
    
    const [isPopupOpen,setIsPopupOpen] = useState(false)
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

    // // دالة لإضافة منتج جديد
    const addProduct = (newProduct) => {
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
                if (sortBy === 'price-asc') return a.price - b.price;
                if (sortBy === 'price-desc') return b.price - a.price;
                return 0;
            });
        }, [products, search, sortBy]);

    const indexOfLastProduct = (currentPage + 1) * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = useMemo(() => {
        return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    }, [filteredProducts, indexOfFirstProduct, indexOfLastProduct]);

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

                {
                    isPopupOpen ? (<AddProductPopup 
                        isOpen={isPopupOpen} 
                        onClose={() => setIsPopupOpen(false)} 
                        onAddProduct={addProduct}
                        />):(
                        <>
                        </>
                    )
                }

                <div className="flex flex-col xl:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
                    <SearchBar search={search} setSearch={setSearch} />
                    <div className="flex flex-col md:flex-row justify-between xl:justify-end w-full items-center gap-2">
                        <SortBySelect sortBy={sortBy} setSortBy={setSortBy} />
                        <SellButton setIsPopupOpen={setIsPopupOpen}/>
                    </div>
                </div>

                {/* <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-16">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div> */}

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-16">
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </React.Suspense>
                </div>

                <div className="mt-12">
                    <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
                </div>
            </Container>
        </>
    );
};

export default ProductsPopup;
