import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import ProductCard from "../product/ProductCard.jsx";
import { CircularProgress, Typography } from "@mui/material";

const StandOutSection = () => {
    const { items: products, pagination, loading, error } = useSelector((state) => state.products);
    const { averageRatings: ratings, loading: ratingsLoading } = useSelector((state) => state.ratings);

    let displayedProducts = products.slice(0, 8);

    if (loading || ratingsLoading) {
        return <div className="flex justify-center py-6"><CircularProgress /></div>;
    }

    if (error) {
        return <Typography variant="body1" className="text-red-500">Lỗi: {productsError}</Typography>;
    }

    return (
        <div className="container py-4">
            <h2 className="text-center text-2xl font-bold mb-6">New Product</h2>
            <Grid container spacing={2}>
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
