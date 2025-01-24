import React from "react";
import { ListGroup } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const Categories = ({ categories}) => {
    return (
        <ListGroup>
            {categories.map((category, index) => (
                <ListGroup.Item key={index} action>
                    {category.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};


export default Categories;
