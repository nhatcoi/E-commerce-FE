import React, { useState } from "react";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const SizeFilter = ({ sizes }) => {
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleSizeChange = (sizeName) => {
        if (sizeName === "All Capacities") {
            if (selectedSizes.includes("All Capacities")) {
                setSelectedSizes([]);
            } else {
                setSelectedSizes(["All Capacities", ...sizes.map((size) => size.name)]);
            }
        } else {
            let updatedSizes;
            if (selectedSizes.includes(sizeName)) {
                updatedSizes = selectedSizes.filter((size) => size !== sizeName);
            } else {
                updatedSizes = [...selectedSizes.filter((size) => size !== "All Capacities"), sizeName];
            }
            setSelectedSizes(updatedSizes);
        }
    };

    return (
        <FormControl component="fieldset">
            <h5 className="pro-sidebar-title">Capacity</h5>
            <FormGroup>
            <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedSizes.includes("All Capacities")}
                            onChange={() => handleSizeChange("All Capacities")}
                            className="cursor-pointer"
                        />
                    }
                    label="All Capacities"
                    className="flex items-center cursor-pointer"
                />
                {sizes.map((size, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={selectedSizes.includes(size.name)}
                                onChange={() => handleSizeChange(size.name)}
                                className="cursor-pointer"
                            />
                        }
                        label={size.name}
                        className="flex items-center cursor-pointer"
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};

export default SizeFilter;
