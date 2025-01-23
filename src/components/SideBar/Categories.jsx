import React from "react";
import { ListGroup } from "react-bootstrap";

const categories = ["Fashion", "Electronics", "Furniture", "Books", "Kids"];

const Categories = () => {
    return (
        <ListGroup>
            {categories.map((category, index) => (
                <ListGroup.Item key={index} action>
                    {category}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default Categories;
