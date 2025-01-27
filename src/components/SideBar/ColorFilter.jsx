import React, { useState } from "react";
import { ListGroup, Form } from "react-bootstrap";
import "src/css/main/Shop.css";

// eslint-disable-next-line react/prop-types
const ColorFilter = ({ colors }) => {
    const [selectedColors, setSelectedColors] = useState([]);

    const handleColorChange = (colorName) => {
        // Nếu "All Colors" được chọn, chọn tất cả
        if (colorName === "All Colors") {
            if (selectedColors.includes("All Colors")) {
                setSelectedColors([]);
            } else {
                setSelectedColors(["All Colors", ...colors.map((color) => color.name)]);
            }
        } else {
            // Nếu chọn màu khác
            let updatedColors;
            if (selectedColors.includes(colorName)) {
                // Bỏ chọn màu
                updatedColors = selectedColors.filter((color) => color !== colorName);
            } else {
                // Thêm màu
                updatedColors = [...selectedColors.filter((color) => color !== "All Colors"), colorName];
            }

            // Nếu không còn màu nào được chọn, bỏ chọn "All Colors"
            setSelectedColors(updatedColors);
        }
    };

    return (
        <>
            <h5 className="pro-sidebar-title">Color</h5>
            <ListGroup>
                {/* Mục All Colors */}
                <ListGroup.Item style={{ border: "none" }}>
                    <Form.Check
                        type="checkbox"
                        label="All Colors"
                        id="checkbox-all"
                        checked={selectedColors.includes("All Colors")}
                        onChange={() => handleColorChange("All Colors")}
                    />
                </ListGroup.Item>

                {/* Các màu */}
                {colors.map((color, index) => (
                    <ListGroup.Item key={index} style={{ border: "none" }}>
                        <Form.Check
                            type="checkbox"
                            label={color.name}
                            id={`checkbox-${index}`}
                            checked={selectedColors.includes(color.name)}
                            onChange={() => handleColorChange(color.name)}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default ColorFilter;
