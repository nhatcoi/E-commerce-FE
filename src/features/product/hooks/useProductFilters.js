import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

const INITIAL_FILTERS = {
    category: "",
    sortBy: "",
    status: "",
    minPrice: "",
    maxPrice: "",
};

export const useProductFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [tempFilters, setTempFilters] = useState(INITIAL_FILTERS);
    
    const page = Number(searchParams.get("page")) || 0;
    const search = searchParams.get("search") || "";

    const debouncedSearch = useMemo(
        () => debounce((value) => {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                value ? newParams.set("search", value) : newParams.delete("search");
                newParams.set("page", "0");
                return newParams;
            });
        }, 300),
        [setSearchParams]
    );

    const handleFilterChange = (key, value) => {
        const validValue = value === "" ? "" : value;
        setTempFilters(prev => ({
            ...prev,
            [key]: validValue
        }));
    };

    const applyFilters = (customFilters) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            const filtersToApply = customFilters || tempFilters;
            
            Object.entries(filtersToApply).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    newParams.set(key, value);
                } else {
                    newParams.delete(key);
                }
            });
            
            // Only reset page to 0 if no custom page is provided
            if (!customFilters || customFilters.page === undefined) {
                newParams.set("page", "0");
            }
            
            return newParams;
        });
    };

    const clearFilters = () => {
        setTempFilters(INITIAL_FILTERS);
        setSearchParams(new URLSearchParams({ page: "0" }));
    };

    const handlePageChange = (newPage) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", newPage.toString());
            return newParams;
        });
    };

    return {
        filters: {
            ...tempFilters,
            page,
            search
        },
        tempFilters,
        handleFilterChange,
        applyFilters,
        clearFilters,
        debouncedSearch,
        handlePageChange
    };
};