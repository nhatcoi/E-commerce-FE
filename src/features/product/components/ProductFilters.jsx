import React from 'react';
import PropTypes from 'prop-types';
import { Input } from "src/components/ui/input.jsx";
import { Button } from "src/components/ui/button.jsx";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
    SheetClose,
} from "src/components/ui/sheet.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select.jsx";
import { FilterIcon, Search as SearchIcon } from "lucide-react";
import {SORT_OPTIONS, STATUS_OPTIONS} from "src/features/product/index.js";



export const ProductFilters = ({
    tempFilters,
    categories,
    onFilterChange,
    onApplyFilters,
    onClearFilters,
    onSearch,
    defaultSearch
}) => {
    return (
        <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        onChange={(e) => onSearch(e.target.value)}
                        defaultValue={defaultSearch}
                        className="pl-9"
                    />
                </div>
            </div>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">
                        <FilterIcon className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                            Refine your product list using the filters below.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                            <label>Category</label>
                            <Select
                                value={tempFilters.category}
                                onValueChange={(value) => onFilterChange("category", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value=" ">All Categories</SelectItem>
                                    {categories?.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label>Sort By</label>
                            <Select
                                value={tempFilters.sortBy}
                                onValueChange={(value) => onFilterChange("sortBy", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select sorting" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SORT_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label>Status</label>
                            <Select
                                value={tempFilters.status}
                                onValueChange={(value) => onFilterChange("status", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label>Price Range</label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={tempFilters.minPrice}
                                    onChange={(e) => onFilterChange("minPrice", e.target.value)}
                                />
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={tempFilters.maxPrice}
                                    onChange={(e) => onFilterChange("maxPrice", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={onClearFilters}
                            >
                                Clear
                            </Button>
                            <SheetClose asChild>
                                <Button
                                    className="flex-1"
                                    onClick={onApplyFilters}
                                >
                                    Apply Filters
                                </Button>
                            </SheetClose>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

ProductFilters.propTypes = {
    tempFilters: PropTypes.object.isRequired,
    categories: PropTypes.array,
    onFilterChange: PropTypes.func.isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    defaultSearch: PropTypes.string
};

export default ProductFilters;