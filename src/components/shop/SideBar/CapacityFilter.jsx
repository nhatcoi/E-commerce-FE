import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import { Label } from "src/components/ui/label";

const CapacityFilter = ({ sizes, onCapacityChange }) => {
    const [selectedSize, setSelectedSize] = useState("");

    const handleSizeChange = (value) => {
        setSelectedSize(value);
        if (onCapacityChange) {
            onCapacityChange(value);
        }
    };

    return (
        <div className="space-y-4">
            <h5 className="pro-sidebar-title">Capacity</h5>
            <RadioGroup value={selectedSize} onValueChange={handleSizeChange} className="space-y-3">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="all-capacities" />
                    <Label htmlFor="all-capacities" className="text-sm leading-none cursor-pointer">
                        All Capacities
                    </Label>
                </div>
                {sizes.map((size, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={size.name} id={`capacity-${index}`} />
                        <Label htmlFor={`capacity-${index}`} className="text-sm leading-none cursor-pointer">
                            {size.name}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default CapacityFilter;
