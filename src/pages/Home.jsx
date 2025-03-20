import React, { useState, useEffect } from 'react';
import { API, Utils, Alerts } from '../utils/utils.js';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from '../store/slices/categoriesSlice';
import { fetchProducts } from '../store/slices/product/productsSlice';
import { fetchRecentNews } from '../store/slices/blogsSlice';
import api from "../config/api.js";
import CategorySection from "src/features/home/CategorySection.jsx";
import Banner from "src/features/home/Banner.jsx"
import Support from "src/features/home/Support.jsx"
import StandOutSection from "src/features/home/StandOutSection.jsx"
import BlogSection from "src/features/home/BlogSection.jsx"

import banner2 from 'src/assets/img/banner/banner-template.png';
import banner3 from 'src/assets/img/banner/banner-template.png';
import {CircularProgress, Typography} from "@mui/material";
import {fetchAverageRatings} from "src/store/slices/product/ratingSlice.js";

const bannerTemplates = [
    banner2,
    banner3
];

const Home = () => {
    // State:
    const dispatch = useDispatch();
    const { items: products, pagination, loading, error } = useSelector((state) => state.products);
    const { items: ratings,  } = useSelector((state) => state.ratings);
    const { items: categories,  } = useSelector((state) => state.categories);
    const { items: recentNews,  } = useSelector((state) => state.blogs);


    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 8, sortByNew: true }));
        dispatch(fetchCategories());
        dispatch(fetchRecentNews());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            dispatch(fetchAverageRatings(products));
        }
    }, [dispatch, products]);

    console.log("Home", ratings);

    if (loading) return <div className="flex justify-center py-6"><CircularProgress /></div>;
    if (error) return <Typography variant="body1" className="text-red-500">Lỗi: {error}</Typography>;



    return (
        <div className="home">
            <Banner images={bannerTemplates} />
            <Support/>
            <StandOutSection/>
            <CategorySection/>
            <BlogSection/>
        </div>
    );
};

export default Home;
