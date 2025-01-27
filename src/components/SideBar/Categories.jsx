import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import "src/css/main/Shop.css";

// eslint-disable-next-line react/prop-types
const Categories = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = React.useState("All Categories");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <h5 className="pro-sidebar-title">Categories</h5>
            <ListGroup>
                {/* Mục "All Categories" */}
                <ListGroup.Item style={{ border: "none" }}>
                    <Form.Check
                        type="radio"
                        name="categories"
                        label="All Categories"
                        id="radio-all"
                        checked={selectedCategory === "All Categories"}
                        onChange={() => handleCategoryChange("All Categories")}
                    />
                </ListGroup.Item>

                {/* Các danh mục khác */}
                {categories.map((category, index) => (
                    <ListGroup.Item key={index} style={{ border: "none" }}>
                        <Form.Check
                            type="radio"
                            name="categories"
                            label={category.name}
                            id={`radio-${index}`}
                            checked={selectedCategory === category.name}
                            onChange={() => handleCategoryChange(category.name)}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default Categories;
