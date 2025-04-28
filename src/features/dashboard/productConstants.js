export const ITEMS_PER_PAGE = 10;
export const DEBOUNCE_DELAY = 300;
export const MIN_SEARCH_WIDTH = "200px";
export const EXPORT_FILE_PREFIX = "products-export";
export const TABLE_COLUMNS = ["Name", "Price", "Stock", "Category", "Status", "Created At", "Actions"];
export const SORT_OPTIONS = [
    { label: "Name (A-Z)", value: "name_asc" },
    // ... other options
];
export const STATUS_OPTIONS = [
    { label: "All Status", value: "all" },
    { label: "In Stock", value: "in_stock" },
    { label: "Out of Stock", value: "out_of_stock" },
];
export const INITIAL_FILTERS = {
    category: "",
    sortBy: "",
    status: "",
    minPrice: "",
    maxPrice: "",
};