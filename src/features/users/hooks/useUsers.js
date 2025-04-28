import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
    useGetUsersQuery, 
    useDeleteUserMutation 
} from 'src/store/userApi.js';
import { toast } from 'src/components/ui/use-toast';
import { useDebounceSearch } from 'src/hooks/useDebounceSearch.js';

const ITEMS_PER_PAGE = 10;

export const useUsers = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 0;
    const search = searchParams.get("search") || "";
    
    const [filters, setFilters] = useState({
        role: "all",
        status: "all",
        gender: "all",
        birthYear: "all",
        country: ""
    });

    const { data, isLoading } = useGetUsersQuery({ 
        page, 
        size: ITEMS_PER_PAGE,
        search,
        ...filters
    });

    const [deleteUser] = useDeleteUserMutation();
    const users = data?.data || [];
    const pagination = data?.pagination || {};
    const debouncedSearch = useDebounceSearch(setSearchParams);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const applyFilters = () => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value !== "all") {
                    newParams.set(key, value);
                } else {
                    newParams.delete(key);
                }
            });
            newParams.set("page", "0");
            return newParams;
        });
    };

    const clearFilters = () => {
        setFilters({
            role: "all",
            status: "all",
            gender: "all",
            birthYear: "all",
            country: ""
        });
        const newParams = new URLSearchParams();
        newParams.set("page", "0");
        setSearchParams(newParams);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id).unwrap();
            toast({
                title: "Success",
                description: "User deleted successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete user",
                variant: "destructive",
            });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setSearchParams({ page: newPage.toString() });
        }
    };

    return {
        users,
        pagination,
        isLoading,
        filters,
        handleFilterChange,
        applyFilters,
        clearFilters,
        handleDelete,
        handlePageChange,
        debouncedSearch,
        search,
        page
    };
};