import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import ProductCard from "../product/ProductCard.jsx";
import { CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const StandOutSection = () => {
    const { items: products, loading, error } = useSelector((state) => state.products);
    const { averageRatings: ratings, loading: ratingsLoading } = useSelector((state) => state.ratings);

    let displayedProducts = products.slice(0, 8);

    if (loading || ratingsLoading) {
        return <div className="flex justify-center py-6"><CircularProgress /></div>;
    }

    if (error) {
        return <Typography variant="body1" className="text-red-500">Lỗi: {error}</Typography>;
    }

    return (
        <div className="container py-12 mb-20">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="w-32 h-[1px] bg-black"></div>
                    <h2 className="text-3xl font-bold uppercase tracking-wider">Daily Deals!</h2>
                    <div className="w-32 h-[1px] bg-black"></div>
                </div>
                
                <div className="flex justify-center gap-12 mt-8">
                    <Link 
                        to="/new-arrivals" 
                        className="text-lg hover:text-black transition-colors"
                    >
                        New Arrivals
                    </Link>
                    <Link 
                        to="/best-sellers" 
                        className="text-lg hover:text-black transition-colors"
                    >
                        Best Sellers
                    </Link>
                    <Link 
                        to="/sale" 
                        className="text-lg hover:text-black transition-colors"
                    >
                        Sale Items
                    </Link>
                </div>
            </div>

            <Grid container spacing={3}>
                {displayedProducts.map((product) => {
                    const productRating = ratings[product.id] || 0;
                    return (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <ProductCard product={product} rating={productRating} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default StandOutSection;