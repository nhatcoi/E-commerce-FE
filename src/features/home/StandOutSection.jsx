import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import ProductCard from "../product/ProductCard.jsx";
import { CircularProgress, Typography } from "@mui/material";
import {useGetProductsQuery} from "src/store/productApi.js";
import {fetchAverageRatings} from "src/store/slices/product/ratingSlice.js";
import { standoutData } from 'src/data/home/standout';

const StandOutSection = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(standoutData.filterOptions[0].value);
    const selectedParams = standoutData.filterOptions.find(opt => opt.value === selected)?.params || {};

    const { data: productData, loading, error } = useGetProductsQuery({
        page: 0,
        size: standoutData.display.itemsPerPage,
        ...selectedParams,
    });
    const products = productData?.data ?? [];

    useEffect(() => {
        if (products.length > 0) {
            dispatch(fetchAverageRatings(products));
        }
    }, [dispatch, products]);

    const { averageRatings: ratings, loading: ratingsLoading } = useSelector((state) => state.ratings);

    let displayedProducts = products.slice(0, standoutData.display.itemsPerPage);

    if (loading || ratingsLoading) {
        return (
            <div className="container py-12 mb-20">
                <div className="w-full flex justify-center py-6">
                    <CircularProgress />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-12 mb-20">
                <Typography variant="body1" className="text-red-500">Lỗi: {error}</Typography>
            </div>
        );
    }

    return (
        <div className={`container ${standoutData.sectionStyle.padding}`}>
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="w-32 h-[1px] bg-black"></div>
                    <h2 className="text-3xl font-bold uppercase tracking-wider">{standoutData.title}</h2>
                    <div className="w-32 h-[1px] bg-black"></div>
                </div>

                <div className="flex justify-center gap-12 mt-8">
                  {standoutData.filterOptions.map(opt => (
                    <span
                      key={opt.value}
                      onClick={() => setSelected(opt.value)}
                      className={`text-lg cursor-pointer transition-colors ${selected === opt.value ? "font-bold text-gray-1000" : "text-gray-500 hover:text-gray-1000"}`}
                    >
                      {opt.label}
                    </span>
                  ))}
                </div>
            </div>

            <Grid container spacing={3}>
                {displayedProducts.map((product) => {
                    const productRating = ratings[product.id] || 0;
                    return (
                        <Grid 
                            item 
                            xs={standoutData.display.gridCols.xs} 
                            sm={standoutData.display.gridCols.sm} 
                            md={standoutData.display.gridCols.md} 
                            key={product.id}
                        >
                            <ProductCard product={product} rating={productRating} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default StandOutSection;