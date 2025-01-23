import React from "react";
import ProductCard from "./ProductCard";
import { Row, Col } from "react-bootstrap";

// Dữ liệu giả

const ProductGrid = ({ products }) => {
    return (
        <Row>
            {Array.isArray(products) && products.map((product) => (
                <Col key={product.id} lg={4} md={6} sm={12} className="mb-4">
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    );
};


export default ProductGrid;
