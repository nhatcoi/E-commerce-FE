import React from "react";
import { Row, Col } from "react-bootstrap";
import 'src/css/main/Home.css';
import img2Template from 'src/assets/react.svg';

const Product = ({ products }) => {
    return (
        <div className="container py-4">
            <h2 className="text-center">New Product</h2>
            <p className="text-center text-muted">
                Style 1
            </p>
            <Row>
                {products.map((product) => (
                    <Col xl={3} lg={4} md={6} sm={6} className="mb-4" key={product.id}>
                        <div className="product-wrap-2 mb-25">
                            <div className="product-img">
                                <a href={`/product/${product.id}`}>
                                    <img
                                        className="default-img"
                                        src={product.thumbnail}
                                        alt={product.name}
                                    />
                                    <img
                                        className="hover-img"
                                        src={products[products.indexOf(product) + 1]?.thumbnail}
                                        alt={product.name}
                                    />
                                </a>
                                {/*<div className="product-img-badges">*/}
                                {/*    {product.discount && (*/}
                                {/*        <span className="badge bg-danger">{product.discount}</span>*/}
                                {/*    )}*/}
                                {/*    {product.isNew && <span className="badge bg-info">New</span>}*/}
                                {/*</div>*/}
                                {/*<div className="product-action-2">*/}
                                {/*    <button className="btn btn-primary">Add to Cart</button>*/}
                                {/*    <button className="btn btn-outline-secondary">Details</button>*/}
                                {/*</div>*/}
                            </div>
                            <div className="product-content-2">
                                <a key={product.id} href={`/product/${product.id}`}>{product.name}</a>
                                <div className="product-price">
                                    {/*{product.oldPrice && (*/}
                                    {/*    <span className="old-price">€{product.oldPrice}</span>*/}
                                    {/*)}*/}
                                    <span className="current-price">${product.price}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Product;
