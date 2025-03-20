import React, { useState } from "react";
import { Checkbox } from "src/components/ui/checkbox.jsx";
import { Label } from "src/components/ui/label.jsx";

// eslint-disable-next-line react/prop-types
const ColorFilter = ({ colors, onColorChange }) => {
    const [selectedColor, setSelectedColor] = useState("");

    const handleColorChange = (colorName) => {
        const newSelectedColor = colorName === selectedColor ? "" : colorName;
        setSelectedColor(newSelectedColor);
        if (onColorChange) {
            onColorChange(newSelectedColor);
        }
    };

    return (
        <div className="space-y-4">
            <h5 className="pro-sidebar-title">Color</h5>
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="all-colors"
                        checked={selectedColor === ""}
                        onCheckedChange={() => handleColorChange("")}
                    />
                    <Label htmlFor="all-colors" className="text-sm leading-none cursor-pointer">
                        All Colors
                    </Label>
                </div>
                {colors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                            id={`color-${index}`}
                            checked={selectedColor === color.name}
                            onCheckedChange={() => handleColorChange(color.name)}
                        />
                        <Label htmlFor={`color-${index}`} className="text-sm leading-none cursor-pointer">
                            {color.name}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorFilter;
