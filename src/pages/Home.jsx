import { useEffect } from 'react';
import { useSelector } from "react-redux";
import CategorySection from "src/features/home/CategorySection.jsx";
import Banner from "src/features/home/Banner.jsx"
import Support from "src/features/home/Support.jsx"
import StandOutSection from "src/features/home/StandOutSection.jsx"
import BlogSection from "src/features/home/BlogSection.jsx"

import banner2 from 'src/assets/img/banner/banner-template.png';
import banner3 from 'src/assets/img/banner/banner-template.png';
import {CircularProgress, Typography} from "@mui/material";
import ServerError from 'src/components/error/ServerError';
import { useGetProductsQuery } from 'src/features/product/services/productApi.js';
import { useGetCategoriesQuery } from 'src/store/categoryApi';

const bannerTemplates = [
    banner2,
    banner3
];

const Home = () => {
    const { 
        data: productsData,
        isLoading: productsLoading,
        error: productsError
    } = useGetProductsQuery({ 
        page: 0, 
        size: 8, 
        sortByNew: true 
    }, {
        // Tránh refetch khi component remount
        refetchOnMountOrArgChange: false,
        // Cache data trong 5 phút
        pollingInterval: 5 * 60 * 1000
    });

    const {
        isLoading: categoriesLoading,
        error: categoriesError
    } = useGetCategoriesQuery(undefined, {
        refetchOnMountOrArgChange: false,
        pollingInterval: 5 * 60 * 1000
    });

    const loading = productsLoading || categoriesLoading;
    const error = productsError || categoriesError;

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
            {error && <ServerError message={error?.data?.message || 'Something went wrong'} />}

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
