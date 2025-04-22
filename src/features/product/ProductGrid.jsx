import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard.jsx";
import { MenuItem, Select, Grid, Typography, CircularProgress } from "@mui/material";
import { ViewModule, ViewList } from "@mui/icons-material";
import { ToggleGroup, ToggleGroupItem } from "src/components/ui/toggle-group.jsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "src/components/ui/pagination.jsx";
import { useGetProductsQuery } from "src/store/productApi.js";

const SORT_OPTIONS = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
];

function SortSelect({ sortOption, onChange }) {
    return (
        <Select value={sortOption} onChange={onChange} className="bg-white shadow-md rounded-md">
            {SORT_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
        </Select>
    );
}

function ViewTypeToggle({ viewType, onChange }) {
    return (
        <ToggleGroup type="single" value={viewType} onValueChange={val => val && onChange(val)}>
            <ToggleGroupItem value="grid"><ViewModule className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="list"><ViewList className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
    );
}

function ProductList({ products, ratings, viewType }) {
    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={viewType === "list" ? 12 : 6} md={viewType === "list" ? 12 : 4}>
                    <ProductCard product={product} rating={ratings[product.id] || 0} />
                </Grid>
            ))}
        </Grid>
    );
}

function PaginationSection({ pagination, onPageChange }) {
    if (!pagination || pagination.totalPages <= 1) return null;
    return (
        <div className="flex justify-center mt-6">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 0}
                        />
                    </PaginationItem>
                    {[...Array(pagination.totalPages)].map((_, idx) => (
                        <PaginationItem key={idx}>
                            <PaginationLink
                                href="#"
                                isActive={idx === pagination.currentPage}
                                onClick={() => onPageChange(idx)}
                            >
                                {idx + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages - 1}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

const ProductGrid = ({ filters, pageSize }) => {
    const [page, setPage] = useState(0);
    const [sortOption, setSortOption] = useState("default");
    const [viewType, setViewType] = useState("grid");

    const { data: productData, loading, error } = useGetProductsQuery({
        page,
        size: pageSize,
        ...filters,
    });
    const products = productData?.data ?? [];

    const pagination = productData?.pagination;
    const { averageRatings: ratings } = useSelector((state) => state.ratings);

    const sortedProducts = useMemo(() => {
        if (sortOption === "default") return products;
        return [...products].sort((a, b) =>
            sortOption === "price-asc" ? a.price - b.price : b.price - a.price
        );
    }, [products, sortOption]);

    const handleSortChange = (e) => setSortOption(e.target.value);
    const handleViewTypeChange = (view) => setViewType(view);

    const handlePageChange = (newPage) => {
        if (!pagination || newPage < 0 || newPage >= pagination.totalPages) return;
        setPage(newPage); // 👈 cập nhật page để RTK query tự fetch
    };

    if (error) return (
        <div className="w-full text-center p-8">
            <Typography variant="h6" color="error">
                Error loading products: {error?.data?.message || 'Unknown error'}
            </Typography>
        </div>
    );
    if (loading) return (
        <div className="w-full h-[300px] flex items-center justify-center">
            <CircularProgress />
        </div>
    );

    return (
        <div className="w-full px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <SortSelect sortOption={sortOption} onChange={handleSortChange} />
                <Typography variant="body1" className="text-gray-700">
                    {pagination ? `${pagination.totalItems} products found` : "Loading products..."}
                </Typography>
                <ViewTypeToggle viewType={viewType} onChange={handleViewTypeChange} />
            </div>
            <ProductList products={sortedProducts} ratings={ratings} viewType={viewType} />
            <PaginationSection pagination={pagination} onPageChange={handlePageChange} />
        </div>
    );
};

export default ProductGrid;
