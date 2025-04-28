import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard.jsx";
import { MenuItem, Select, Grid, Typography, CircularProgress } from "@mui/material";
import { ViewModule, ViewList } from "@mui/icons-material";
import { ToggleGroup, ToggleGroupItem } from "src/components/ui/toggle-group.jsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "src/components/ui/pagination.jsx";
import { useGetProductsQuery } from "src/features/product/services/productApi.js";

// Constants
const CONSTANTS = {
    ITEMS_PER_PAGE: 10,
    DEBOUNCE_DELAY: 300,
    MIN_SEARCH_WIDTH: "200px",
    SORT_OPTIONS: [
        { label: "Default", value: "default" },
        { label: "Price (Low-High)", value: "price_asc" },
        { label: "Price (High-Low)", value: "price_desc" },
        { label: "Newest", value: "created_desc" },
        { label: "Oldest", value: "created_asc" },
    ],
    VIEW_TYPES: {
        GRID: "grid",
        LIST: "list"
    }
};

// PropTypes for child components
const sortSelectPropTypes = {
    sortOption: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const viewTogglePropTypes = {
    viewType: PropTypes.oneOf([CONSTANTS.VIEW_TYPES.GRID, CONSTANTS.VIEW_TYPES.LIST]).isRequired,
    onChange: PropTypes.func.isRequired
};

const productListPropTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    ratings: PropTypes.object.isRequired,
    viewType: PropTypes.oneOf([CONSTANTS.VIEW_TYPES.GRID, CONSTANTS.VIEW_TYPES.LIST]).isRequired
};

const paginationSectionPropTypes = {
    pagination: PropTypes.shape({
        totalPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        totalItems: PropTypes.number.isRequired
    }),
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

function SortSelect({ sortOption, onChange }) {
    return (
        <Select value={sortOption} onChange={onChange} className="bg-white shadow-md rounded-md">
            {CONSTANTS.SORT_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
        </Select>
    );
}
SortSelect.propTypes = sortSelectPropTypes;

function ViewTypeToggle({ viewType, onChange }) {
    return (
        <ToggleGroup type="single" value={viewType} onValueChange={val => val && onChange(val)}>
            <ToggleGroupItem value={CONSTANTS.VIEW_TYPES.GRID}><ViewModule className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value={CONSTANTS.VIEW_TYPES.LIST}><ViewList className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
    );
}
ViewTypeToggle.propTypes = viewTogglePropTypes;

function ProductList({ products, ratings, viewType }) {
    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid 
                    item 
                    xs={12} 
                    sm={viewType === CONSTANTS.VIEW_TYPES.LIST ? 12 : 6} 
                    md={viewType === CONSTANTS.VIEW_TYPES.LIST ? 12 : 4} 
                    lg={viewType === CONSTANTS.VIEW_TYPES.LIST ? 12 : 3} 
                    key={product.id}
                >
                    <ProductCard product={product} rating={ratings[product.id] || 0} />
                </Grid>
            ))}
        </Grid>
    );
}
ProductList.propTypes = productListPropTypes;

function PaginationSection({ pagination, onPageChange, currentPage }) {
    if (!pagination || pagination.totalPages <= 1) return null;
    
    return (
        <div className="flex justify-center mt-6">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                        />
                    </PaginationItem>
                    {[...Array(pagination.totalPages)].map((_, idx) => (
                        <PaginationItem key={idx}>
                            <PaginationLink
                                href="#"
                                isActive={idx === currentPage}
                                onClick={() => onPageChange(idx)}
                                className={idx === currentPage ? "bg-black text-white hover:bg-black/90" : ""}
                            >
                                {idx + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage >= pagination.totalPages - 1}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
PaginationSection.propTypes = paginationSectionPropTypes;

const ProductGrid = ({ filters, pageSize = CONSTANTS.ITEMS_PER_PAGE }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page")) || 0;
    const [sortOption, setSortOption] = useState("default");
    const [viewType, setViewType] = useState(CONSTANTS.VIEW_TYPES.GRID);

    const { data: productData, loading, error } = useGetProductsQuery({
        page: currentPage,
        size: pageSize,
        ...filters,
    });

    const products = productData?.data ?? [];
    const pagination = productData?.pagination;
    const { averageRatings: ratings } = useSelector((state) => state.ratings);

    const sortedProducts = useMemo(() => {
        if (sortOption === "default") return products;
        const [criteria, direction] = sortOption.split("_");
        return [...products].sort((a, b) => {
            const modifier = direction === "asc" ? 1 : -1;
            if (criteria === "price") {
                return (a.price - b.price) * modifier;
            }
            if (criteria === "created") {
                return (new Date(a.createdAt) - new Date(b.createdAt)) * modifier;
            }
            return 0;
        });
    }, [products, sortOption]);

    const handleSortChange = (e) => setSortOption(e.target.value);
    const handleViewTypeChange = (view) => setViewType(view);
    const handlePageChange = (newPage) => {
        if (!pagination || newPage < 0 || newPage >= pagination.totalPages) return;
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
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
            </div>
            <div className="mb-6">
                <ViewTypeToggle viewType={viewType} onChange={handleViewTypeChange} />
            </div>
            <ProductList products={sortedProducts} ratings={ratings} viewType={viewType} />
            <PaginationSection 
                pagination={pagination} 
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </div>
    );
};

ProductGrid.propTypes = {
    filters: PropTypes.object,
    pageSize: PropTypes.number
};

ProductGrid.defaultProps = {
    filters: {},
    pageSize: CONSTANTS.ITEMS_PER_PAGE
};

export default ProductGrid;
