import PropTypes from 'prop-types';
import React from "react";

const ProductList = ({ products, onAddToCart }) => {
    return (
        <section className="featured spad">
            <div className="container">
                <h2 className="text-center">New Product</h2>
                <p className="text-center text-muted">
                    Style 2
                </p>
                <div className="row featured__filter product-container">
                    {products.map(product => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mix" key={product.id}>
                            <div className="product__item">
                                <div
                                    className="product__item__pic set-bg"
                                    style={{backgroundImage: `url('${product.thumbnail}')`}}
                                >
                                    <ul className="product__item__pic__hover">
                                        <li>
                                            <a href="#"><i className="fa fa-heart"></i></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-retweet"></i></a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={() => onAddToCart(product.id)}>
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6>
                                        <a href={`/product-details/${product.id}`}>{product.name}</a>
                                    </h6>
                                    <h5>${product.price}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            thumbnail: PropTypes.string.isRequired,
        })
    ).isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
