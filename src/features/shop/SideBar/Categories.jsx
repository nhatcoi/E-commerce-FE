import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group.jsx";
import { Label } from "src/components/ui/label.jsx";
import { useSelector } from "react-redux";
import { CircularProgress, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Categories = ({ onCategoryChange }) => {
    const { items: categories, loading, error } = useSelector((state) => state.categories);
    const [selectedCategory, setSelectedCategory] = useState("");

    if (loading) return <div className="flex justify-center py-6"><CircularProgress /></div>;
    if (error) return <Typography variant="body1" className="text-red-500">Lỗi: {error}</Typography>;

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        if (onCategoryChange) {
            onCategoryChange(categoryId);
        }
    };

    return (
        <div className="space-y-4">
            <h5 className="pro-sidebar-title">Categories</h5>
            <RadioGroup value={selectedCategory} onValueChange={handleCategoryChange} className="space-y-3">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="all-categories" />
                    <Label htmlFor="all-categories" className="cursor-pointer">
                        All Categories
                    </Label>
                </div>
                {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={category.id} id={`category-${category.id}`} />
                        <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                            {category.name}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default Categories;
