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
        // Fetch all data in parallel
        Promise.all([
            dispatch(fetchProducts({ page: 0, size: 8, sortByNew: true })),
            dispatch(fetchCategories()),
            dispatch(fetchRecentNews())
        ]);
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            dispatch(fetchAverageRatings(products));
        }
    }, [dispatch, products]);

    // Render the layout structure regardless of loading state
    return (
        <div className="home min-h-screen">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <CircularProgress size={40} />
                        <Typography variant="body2" color="textSecondary">
                            Loading...
                        </Typography>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && <ServerError message={error} />}

            {/* Main Content */}
            <div className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
                {/* Banner Section - Always render with min height */}
                <div className="min-h-[300px]">
                    <Banner images={bannerTemplates} />
                </div>

                {/* Support Section */}
                <div className="min-h-[100px]">
                    <Support/>
                </div>

                {/* StandOut Section */}
                <div className="min-h-[200px]">
                    <StandOutSection/>
                </div>

                {/* Category Section */}
                <div className="min-h-[200px]">
                    <CategorySection/>
                </div>

                {/* Blog Section */}
                <div className="min-h-[200px]">
                    <BlogSection/>
                </div>
            </div>
        </div>
    );
};

export default Home;
