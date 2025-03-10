import React, { useState } from "react";
import { Checkbox } from "src/components/ui/checkbox";
import { Label } from "src/components/ui/label";

const ColorFilter = ({ colors }) => {
    const [selectedColors, setSelectedColors] = useState([]);

    const handleColorChange = (checked, colorName) => {
        if (colorName === "All Colors") {
            if (checked) {
                setSelectedColors(["All Colors", ...colors.map((color) => color.name)]);
            } else {
                setSelectedColors([]);
            }
        } else {
            let updatedColors;
            if (checked) {
                updatedColors = [...selectedColors.filter((color) => color !== "All Colors"), colorName];
            } else {
                updatedColors = selectedColors.filter((color) => color !== colorName);
            }
            setSelectedColors(updatedColors);
        }
    };

    return (
        <div className="space-y-4">
            <h5 className="pro-sidebar-title">Color</h5>
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="all-colors"
                        checked={selectedColors.includes("All Colors")}
                        onCheckedChange={(checked) => handleColorChange(checked, "All Colors")}
                    />
                    <Label
                        htmlFor="all-colors"
                        className="text-sm leading-none cursor-pointer"
                    >
                        All Colors
                    </Label>
                </div>
                {colors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                            id={`color-${index}`}
                            checked={selectedColors.includes(color.name)}
                            onCheckedChange={(checked) => handleColorChange(checked, color.name)}
                        />
                        <Label
                            htmlFor={`color-${index}`}
                            className="text-sm leading-none cursor-pointer"
                        >
                            {color.name}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorFilter;
