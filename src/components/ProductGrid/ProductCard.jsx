import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import "src/css/main/Shop.css";

const ProductCard = ({ product }) => {
    return (
        <Card className="h-100 product-card">
            <div className="product-card-img-wrapper position-relative">
                <Card.Img variant="top" src={product.thumbnail} alt={product.name} className="product-card-img" />
                <div className="product-card-actions">
                    <Button variant="light" className="product-action">
                        <i className="fa-regular fa-heart"></i>
                    </Button>
                    <Button variant="light" className="product-action">Select Option</Button>
                    <Button variant="light" className="product-action">
                        <i className="fa-solid fa-eye"></i>
                    </Button>
                </div>
            </div>
            <Card.Body className="product-card-body">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.price && (
                        <span className="text-danger fw-bold">{product.price} €</span>
                    )}
                    {product.discount && (
                        <span className="text-muted text-decoration-line-through ms-2">
                            {product.originalPrice} €
                        </span>
                    )}
                </Card.Text>
                {product.isNew && <Badge bg="success">New</Badge>}
                {product.discount && <Badge bg="danger" className="ms-2">-{product.discount}%</Badge>}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
