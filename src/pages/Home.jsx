// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// import BlogList from '../components/BlogList';
// import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { API, Utils, Alerts } from '../util/utils.js';
import api from "../util/api.js";
import CategoryList from "../components/CategoryList.jsx";
import SearchBar from "src/components/SearchBar.jsx";
import Banner from "../components/Banner.jsx"
import Support from "../components/Support.jsx"
import Product from "../components/Product.jsx"

import banner2 from 'src/assets/img/banner/banner-template.png';
import banner3 from 'src/assets/img/banner/banner-template.png';

const bannerTemplates = [
    banner2,
    banner3
];

const Home = () => {
    // State:
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    // const [blogs, setBlogs] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 0 });

    const loadProducts = async (page = 0) => {
        try {
            const response = await api.get(`/products`, {
                params: {
                    page: page,
                    size: 8,
                },
            });

            const data = response.data; // Axios trả về dữ liệu trong `response.data`
            console.log(data.data);

            setProducts(data.data); // data
            setPagination({
                totalPages: data.pagination.totalPages,
                currentPage: page,
            });
        } catch (error) {
            console.error(error);
            Alerts.handleError('Error loading products.');
        }
    };


    const loadCategories = async () => {
        try {
            const response = await api.get(`/categories`);

            console.log(response);

            const data = response.data;
            console.log(data.data);

            setCategories(data.data);
            setCategories(data.data);
        } catch (error) {
            console.error(error);
            Alerts.handleError('Error loading categories.');
        }
    };

    // const loadBlogs = async () => {
    //     try {
    //         const response = await fetch(API.urls.recentBlogs);
    //         const data = await response.json();
    //         setBlogs(data.data);
    //     } catch (error) {
    //         console.error(error);
    //         Alerts.handleError('Error loading blogs.');
    //     }
    // };

    useEffect(() => {
        loadProducts().then(r => console.log(r));
        loadCategories().then(r => console.log(r));
        // loadBlogs();
    }, []);


    // Hàm thêm sản phẩm vào giỏ hàng
    const handleAddToCart = async (productId) => {
        try {
            await Utils.addToCartHandler(productId);
            Alerts.handleSuccess('Product added to cart successfully.');
        } catch (error) {
            console.error('Error adding to cart:', error);
            Alerts.handleError('Error adding to cart.');
        }
    };

    const handlePageChange = (page) => {
        loadProducts(page).then(r => console.log(r));
    };

    return (
        <div className="home">
            <Banner images={bannerTemplates} />
            <Support/>
            <Product products={products} />
            {/*<SearchBar categories={categories} />*/}
            {/*<CategoryList categories={categories} />*/}
            <ProductList products={products} onAddToCart={handleAddToCart} />

            {/* Pagination */}
            <Pagination
                totalPages={pagination.totalPages}
                currentPage={pagination.currentPage}
                onPageChange={handlePageChange}
            />

            {/* <BlogList blogs={blogs} /> */}
        </div>
    );
};

export default Home;
