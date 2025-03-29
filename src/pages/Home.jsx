import {useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from '../store/slices/categoriesSlice.js';
import { fetchProducts } from '../store/slices/product/productsSlice.js';
import { fetchRecentNews } from '../store/slices/blogsSlice.js';
import CategorySection from "src/features/home/CategorySection.jsx";
import Banner from "src/features/home/Banner.jsx"
import Support from "src/features/home/Support.jsx"
import StandOutSection from "src/features/home/StandOutSection.jsx"
import BlogSection from "src/features/home/BlogSection.jsx"

import banner2 from 'src/assets/img/banner/banner-template.png';
import banner3 from 'src/assets/img/banner/banner-template.png';
import {CircularProgress, Typography} from "@mui/material";
import {fetchAverageRatings} from "src/store/slices/product/ratingSlice.js";
import ServerError from 'src/components/error/ServerError';

const bannerTemplates = [
    banner2,
    banner3
];

const Home = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);


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

    if (loading) return <div className="flex justify-center py-6"><CircularProgress /></div>;
    if (error) return <ServerError message={error} />;



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
