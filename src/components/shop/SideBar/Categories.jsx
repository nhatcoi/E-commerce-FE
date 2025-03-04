import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Categories = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = React.useState("All Categories");

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <h5 className="pro-sidebar-title">Categories</h5>
            <RadioGroup value={selectedCategory} onChange={handleCategoryChange} className="space-y-2">
                <FormControlLabel
                    value="All Categories"
                    control={<Radio className="mr-2 cursor-pointer" />}
                    label="All Categories"
                    className="flex items-center cursor-pointer"
                />
                {categories.map((category, index) => (
                    <FormControlLabel
                        key={index}
                        value={category.name}
                        control={<Radio className="mr-2 cursor-pointer" />}
                        label={category.name}
                        className="flex items-center cursor-pointer"
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default Categories;