import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { FilterX } from "lucide-react";

// Components
import Sidebar from "src/features/shop/SideBar.jsx";
import ProductGrid from "src/features/product/ProductGrid.jsx";
import { Button } from "src/components/ui/button";
import { Card } from "src/components/ui/card";

// Actions
import { fetchProducts } from "../store/slices/product/productsSlice.js";
import { fetchCategories } from "src/store/slices/categoriesSlice.js";
import { fetchAverageRatings } from "src/store/slices/product/ratingSlice.js";

const Shop = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const { items: products, loading, error, pagination } = useSelector((state) => state.products);

    const getFiltersFromURL = () => {
        return Object.fromEntries(searchParams.entries());
    };

    const [filters, setFilters] = useState(getFiltersFromURL());

    // Fetch data when filters change
    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 6, ...filters }));
    }, [dispatch, filters]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            dispatch(fetchAverageRatings(products));
        }
    }, [dispatch, products]);

    // Update data when URL changes
    useEffect(() => {
        setFilters(getFiltersFromURL());
    }, [searchParams]);

    // Update URL when filters change
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setSearchParams(newFilters);
    };

    // Toggle mobile filters
    const toggleMobileFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    // Clear all filters
    const clearAllFilters = () => {
        setFilters({});
        setSearchParams({});
    };

    // Loading state
    if (loading && products.length === 0) {
        return (
            <div className="flex-1 flex justify-center items-center py-12 bg-gradient-to-br from-background to-muted/30">
                <CircularProgress />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex-1 flex justify-center items-center py-12 bg-gradient-to-br from-background to-muted/30">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold mb-2">Error</p>
                    <p>{error}</p>
                    <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => dispatch(fetchProducts({ page: 0, size: 6 }))}
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-gradient-to-br from-background to-muted/30 py-12"
        >
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h1 
                        className="text-3xl md:text-4xl font-bold mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Shop Our Products
                    </motion.h1>
                    <motion.p 
                        className="text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Browse our collection of high-quality products with free shipping on all orders.
                    </motion.p>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
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

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-6">
                    <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={toggleMobileFilters}
                    >
                        {showMobileFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar - Fixed on desktop, toggleable on mobile */}
                    <motion.div 
                        className={`lg:col-span-3 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <Card className="sticky top-20 border-0 shadow-none">
                            <Sidebar onFilterChange={handleFilterChange} />
                        </Card>
                    </motion.div>

                    {/* Product Grid */}
                    <motion.div 
                        className="lg:col-span-9"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <ProductGrid />
                    </motion.div>
                </div>

                {/* Pagination Info */}
                {pagination && (
                    <div className="text-center text-sm text-muted-foreground mt-8">
                        Showing {products.length} of {pagination.totalItems} products
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Shop;
