import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../product/ProductCard.jsx";
import { Button, MenuItem, Select, Grid, Typography, CircularProgress } from "@mui/material";
import { ViewModule, ViewList } from "@mui/icons-material";
import { ToggleGroup, ToggleGroupItem } from "src/components/ui/toggle-group.jsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "src/components/ui/pagination.jsx";
import { fetchProducts } from "src/store/slices/product/productsSlice.js";

const ProductGrid = () => {
    const dispatch = useDispatch();
    const { items: products, pagination, loading, error } = useSelector((state) => state.products);
    const { averageRatings: ratings } = useSelector((state) => state.ratings);

    const [sortOption, setSortOption] = useState("default");
    const [viewType, setViewType] = useState("grid");

    useEffect(() => {
        if (!pagination) {
            dispatch(fetchProducts({ page: 0, size: 9 }));
        }
    }, [dispatch, pagination]);

    const handleSortChange = (e) => setSortOption(e.target.value);
    const handleViewTypeChange = (view) => setViewType(view);

    const sortedProducts = sortOption === "default" ? products : [...products].sort((a, b) =>
        sortOption === "price-asc" ? a.price - b.price : b.price - a.price
    );

    const handlePageChange = (newPage) => {
        if (!pagination || newPage < 0 || newPage >= pagination.totalPages) return;
        dispatch(fetchProducts({ page: newPage, size: pagination.pageSize }));
    };

    return (
        <div className="w-full px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <Select value={sortOption} onChange={handleSortChange} className="bg-white shadow-md rounded-md">
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                </Select>

                <Typography variant="body1" className="text-gray-700">
                    {pagination ? `${pagination.totalItems} products found` : "Loading products..."}
                </Typography>

                <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && handleViewTypeChange(value)}>
                    <ToggleGroupItem value="grid">
                        <ViewModule className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list">
                        <ViewList className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            {loading ? (
                <div className="flex justify-center">
                    <CircularProgress />
                </div>
            ) : (
                <Grid container spacing={2}>
                    {sortedProducts.map((product) => {
                        const productRating = ratings[product.id] || 0;
                        return (
                            <Grid item key={product.id} xs={12} sm={viewType === "list" ? 12 : 6} md={viewType === "list" ? 12 : 4}>
                                <ProductCard product={product} rating={productRating} />
                            </Grid>
                        );
                    })}
                </Grid>
            )}

            {/* Phân trang */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 0}
                                />
                            </PaginationItem>

                            {[...Array(pagination.totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={index === pagination.currentPage}
                                        onClick={() => handlePageChange(index)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage >= pagination.totalPages - 1}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
