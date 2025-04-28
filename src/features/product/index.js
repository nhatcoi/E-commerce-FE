// Components
export { default as Products } from './pages/ProductsDashboard.jsx';
export { default as ProductForm } from './components/ProductForm';
export { default as ProductsTable } from './components/ProductsTable';
export { default as ProductFilters } from './components/ProductFilters';

// Hooks
export { useProductFilters } from './hooks/useProductFilters';
export { useProductActions } from './hooks/useProductActions';

// Constants
export const ITEMS_PER_PAGE = 10;
export const TABLE_COLUMNS = ["Name", "ID", "Price", "Stock", "Category", "Status", "Created At", "Actions"];
export const SORT_OPTIONS = [
    { label: "Default", value: "default" },
    { label: "Name (A-Z)", value: "name_asc" },
    { label: "Name (Z-A)", value: "name_desc" },
    { label: "Price (Low-High)", value: "price_asc" },
    { label: "Price (High-Low)", value: "price_desc" },
    { label: "Stock (Low-High)", value: "stock_asc" },
    { label: "Stock (High-Low)", value: "stock_desc" },
    { label: "Newest", value: "created_desc" },
    { label: "Oldest", value: "created_asc" },
];

export const STATUS_OPTIONS = [
    { label: "All Status", value: " " },
    { label: "In Stock", value: "in_stock" },
    { label: "Out of Stock", value: "out_of_stock" },
];


// import { Products, ProductsTable, useProductFilters } from 'src/features/product';