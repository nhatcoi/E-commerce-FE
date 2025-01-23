
import React from "react";
import { Card, Badge } from "react-bootstrap";

const ProductCard = ({ product }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={product.thumbnail} alt={product.name} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {/*<span className="text-danger fw-bold">{product.price} €</span>*/}
                    {/*{product.discount && (*/}
                    {/*            <span className="text-muted text-decoration-line-through ms-2">*/}
                    {/*        {product.originalPrice} €*/}
                    {/*</span>*/}
                    {/*)}*/}
                </Card.Text>
                {/*{product.isNew && <Badge bg="success">New</Badge>}*/}
                {/*{product.discount && <Badge bg="danger" className="ms-2">-{product.discount}%</Badge>}*/}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
