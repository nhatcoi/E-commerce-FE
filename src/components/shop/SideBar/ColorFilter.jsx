import React, { useState } from "react";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const ColorFilter = ({ colors }) => {
    const [selectedColors, setSelectedColors] = useState([]);

    const handleColorChange = (colorName) => {
        if (colorName === "All Colors") {
            if (selectedColors.includes("All Colors")) {
                setSelectedColors([]);
            } else {
                setSelectedColors(["All Colors", ...colors.map((color) => color.name)]);
            }
        } else {
            let updatedColors;
            if (selectedColors.includes(colorName)) {
                updatedColors = selectedColors.filter((color) => color !== colorName);
            } else {
                updatedColors = [...selectedColors.filter((color) => color !== "All Colors"), colorName];
            }
            setSelectedColors(updatedColors);
        }
    };

    return (
        <FormControl component="fieldset">
            <h5 className="pro-sidebar-title">Color</h5>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedColors.includes("All Colors")}
                            onChange={() => handleColorChange("All Colors")}
                            className="cursor-pointer"
                        />
                    }
                    label="All Colors"
                    className="flex items-center cursor-pointer"
                />
                {colors.map((color, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={selectedColors.includes(color.name)}
                                onChange={() => handleColorChange(color.name)}
                                className="cursor-pointer"
                            />
                        }
                        label={color.name}
                        className="flex items-center cursor-pointer"
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};

export default ColorFilter;
