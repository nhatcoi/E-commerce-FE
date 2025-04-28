import { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { FilterX } from "lucide-react";
import PropTypes from "prop-types";
import Sidebar from "src/features/shop/SideBar.jsx";
import ProductGrid from "src/features/product2/ProductGrid.jsx";
import { Button } from "src/components/ui/button";
import { Card } from "src/components/ui/card";
import { fetchAverageRatings } from "src/store/slices/product/ratingSlice.js";
import { useGetProductsQuery } from 'src/features/product/services/productApi.js';

// Constants
const CONSTANTS = {
    PAGE_SIZE: 8,
    INITIAL_PAGE: 0,
    ANIMATION_DURATION: 0.5,
    MOBILE_FILTER_ANIMATION_DELAY: 0.1,
    GRID_ANIMATION_DELAY: 0.2,
    HEADER_ANIMATION_DELAY: 0.2,
    SUBHEADER_ANIMATION_DELAY: 0.3,
    FILTER_ANIMATION_DURATION: 0.3,
    TOP_STICKY_OFFSET: 20,
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: CONSTANTS.ANIMATION_DURATION } },
};

const Shop = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filters, setFilters] = useState(() => {
        // Initialize filters from URL params
        const params = Object.fromEntries(searchParams.entries());
        return Object.keys(params).length > 0 ? params : {};
    });

    const { data, error, isLoading } = useGetProductsQuery({
        page: CONSTANTS.INITIAL_PAGE,
        size: CONSTANTS.PAGE_SIZE,
        ...filters,
    });

    const productsData = data?.data ?? [];
    const pagination = data?.pagination;

    useEffect(() => {
        setFilters(Object.fromEntries(searchParams.entries()));
    }, [searchParams]);

    useEffect(() => {
        if (productsData.length > 0) {
            dispatch(fetchAverageRatings(productsData));
        }
    }, [dispatch, productsData]);

    const handleFilterChange = (newFilters) => {
        // Remove empty/null values
        const cleanFilters = Object.entries(newFilters).reduce((acc, [key, value]) => {
            if (value && value !== "" && (!Array.isArray(value) || value.length > 0)) {
                acc[key] = value;
            }
            return acc;
        }, {});

        setFilters(cleanFilters);
        setSearchParams(cleanFilters);
    };

    const toggleMobileFilters = () => setShowMobileFilters(prev => !prev);

    const clearAllFilters = () => {
        setFilters({});
        setSearchParams({});
    };

    if (isLoading && !productsData.length) {
        return (
            <div className="flex-1 flex justify-center items-center py-12 bg-gradient-to-br from-background to-muted/30">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex justify-center items-center py-12 bg-gradient-to-br from-background to-muted/30">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold mb-2">Error</p>
                    <p>{error.message || 'An error occurred'}</p>
                    <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 bg-gradient-to-br from-background to-muted/30 py-12"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <motion.h1
                        className="text-3xl md:text-4xl font-bold mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: CONSTANTS.ANIMATION_DURATION, delay: CONSTANTS.HEADER_ANIMATION_DELAY }}
                    >
                        Shop Our Products
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: CONSTANTS.ANIMATION_DURATION, delay: CONSTANTS.SUBHEADER_ANIMATION_DELAY }}
                    >
                        Browse our collection of high-quality products with free shipping on all orders.
                    </motion.p>
                </div>

                {hasActiveFilters && (
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: CONSTANTS.FILTER_ANIMATION_DURATION }}
                    >
                        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Active Filters</span>
                                <span className="bg-primary text-primary-foreground rounded-full text-xs py-0.5 px-2">
                  {Object.keys(filters).length}
                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearAllFilters}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <FilterX className="h-4 w-4 mr-1" />
                                Clear All
                            </Button>
                        </div>
                    </motion.div>
                )}

                <div className="lg:hidden mb-6">
                    <Button variant="outline" className="w-full" onClick={toggleMobileFilters}>
                        {showMobileFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <motion.div
                        className={`lg:col-span-3 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: CONSTANTS.ANIMATION_DURATION, delay: CONSTANTS.MOBILE_FILTER_ANIMATION_DELAY }}
                    >
                        <Card className="sticky top-20 border-0 shadow-none">
                            <Sidebar onFilterChange={handleFilterChange} />
                        </Card>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-9"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: CONSTANTS.ANIMATION_DURATION, delay: CONSTANTS.GRID_ANIMATION_DELAY }}
                    >
                        <ProductGrid filters={filters} pageSize={CONSTANTS.PAGE_SIZE} />
                    </motion.div>
                </div>

                {pagination && (
                    <div className="text-center text-sm text-muted-foreground mt-8">
                        Showing {productsData.length} of {pagination.totalItems} products
                    </div>
                )}
            </div>
        </motion.div>
    );
};

Shop.propTypes = {
    // Add prop types if component receives props in the future
};

export default memo(Shop);