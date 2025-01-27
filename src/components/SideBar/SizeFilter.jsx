import React, { useState } from "react";
import { ListGroup, Form } from "react-bootstrap";
import "src/css/main/Shop.css";

// eslint-disable-next-line react/prop-types
const SizeFilter = ({ sizes }) => {
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleSizeChange = (sizeName) => {
        // Nếu "All Sizes" được chọn, chọn tất cả
        if (sizeName === "All Capacities") {
            if (selectedSizes.includes("All Capacities")) {
                setSelectedSizes([]); // Bỏ chọn tất cả
            } else {
                setSelectedSizes(["All Capacities", ...sizes.map((size) => size.name)]);
            }
        } else {
            // Nếu chọn kích thước khác
            let updatedSizes;
            if (selectedSizes.includes(sizeName)) {
                // Bỏ chọn kích thước
                updatedSizes = selectedSizes.filter((size) => size !== sizeName);
            } else {
                // Thêm kích thước
                updatedSizes = [...selectedSizes.filter((size) => size !== "All Sizes"), sizeName];
            }

            // Nếu không còn kích thước nào được chọn, bỏ chọn "All Sizes"
            setSelectedSizes(updatedSizes);
        }
    };

    return (
        <>
            <h5 className="pro-sidebar-title">Capacity</h5>
            <ListGroup>
                {/* Mục All Sizes */}
                <ListGroup.Item style={{ border: "none" }}>
                    <Form.Check
                        type="checkbox"
                        label="All Sizes"
                        id="checkbox-all"
                        checked={selectedSizes.includes("All Capacities")}
                        onChange={() => handleSizeChange("All Capacities")}
                    />
                </ListGroup.Item>

                {/* Các kích thước */}
                {sizes.map((size, index) => (
                    <ListGroup.Item key={index} style={{ border: "none" }}>
                        <Form.Check
                            type="checkbox"
                            label={size.name}
                            id={`checkbox-${index}`}
                            checked={selectedSizes.includes(size.name)}
                            onChange={() => handleSizeChange(size.name)}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default SizeFilter;
