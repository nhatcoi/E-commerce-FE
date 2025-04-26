import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group.jsx";
import { Label } from "src/components/ui/label.jsx";
import { CircularProgress, Typography } from "@mui/material";
import { useGetCategoriesQuery } from "src/store/categoryApi.js";

const Categories = ({ onCategoryChange }) => {
    const { data, error, isLoading } = useGetCategoriesQuery();
    const categories = data?.data ?? [];

    const [selectedCategory, setSelectedCategory] = useState("");

    if (isLoading)
        return (
            <div className="flex justify-center py-6">
                <CircularProgress />
            </div>
        );

    if (error)
        return (
            <Typography variant="body1" className="text-red-500">
                Error: {error.message || "Can not load categories"}
            </Typography>
        );

    const categoryOptions = [
        { id: "", label: "All Categories" },
        ...categories.map((category) => ({
            id: category.id.toString(),
            label: category.name,
        })),
    ];

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        onCategoryChange?.(categoryId);
    };

    return (
        <div className="space-y-4">
            <h5 className="pro-sidebar-title">Categories</h5>
            <RadioGroup
                value={selectedCategory}
                onValueChange={handleCategoryChange}
                className="space-y-3"
            >
                {categoryOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={`category-${option.id || "all"}`} />
                        <Label htmlFor={`category-${option.id || "all"}`} className="cursor-pointer">
                            {option.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default Categories;