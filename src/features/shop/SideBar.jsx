import React, { useEffect, useState } from "react";
import { CardContent } from "src/components/ui/card.jsx";
import Categories from "./SideBar/Categories.jsx";
import ColorFilter from "src/features/shop/SideBar/ColorFilter.jsx";
import CapacityFilter from "src/features/shop/SideBar/CapacityFilter.jsx";
import TagFilter from "src/features/shop/SideBar/TagFilter.jsx";
import Search from "src/features/shop/SideBar/Search.jsx";

const testColors = [
    { name: "Black" }, { name: "White" }, { name: "Red" }, { name: "Blue" },
    { name: "Green" }, { name: "Yellow" }, { name: "Purple" }, { name: "Pink" },
    { name: "Gray" }, { name: "Silver" }, { name: "Gold" }, { name: "Rose Gold" }
];

const testCapacities = [
    { name: "32GB" }, { name: "64GB" }, { name: "128GB" }, { name: "256GB" },
    { name: "512GB" }, { name: "1TB" }, { name: "2TB" }
];

const testTags = [
    { name: "New Arrival" }, { name: "Best Seller" }, { name: "Featured" },
    { name: "Sale" }, { name: "Limited Edition" }, { name: "Special Offer" },
    { name: "Trending" }, { name: "Popular" }, { name: "Out of Stock" }, { name: "Pre-order" }
];


const Sidebar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({});

    const updateFilter = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters); // Gửi filters lên component cha (Shop)
    };

    return (
        <CardContent className="space-y-4">
            <h5 className="text-lg font-semibold">Filter Products</h5>
            <div className="flex flex-col space-y-4">
                <Search onSearch={(search) => updateFilter("search", search)} />
                <Categories onCategoryChange={(category) => updateFilter("category", category)} />
                <ColorFilter colors={testColors} onColorChange={(color) => updateFilter("color", color)} />
                <CapacityFilter sizes={testCapacities} onCapacityChange={(capacity) => updateFilter("capacity", capacity)} />
                <TagFilter tags={testTags} onTagChange={(tags) => updateFilter("tags", tags)} />
            </div>
        </CardContent>
    );
};

export default Sidebar;
