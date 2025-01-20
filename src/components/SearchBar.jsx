import React, { useState, useEffect } from 'react';

const HeroSection = ({ categories }) => {

    return (
        <section className="hero hero-normal">
            <div className="container">
                <div className="row">
                    {/* Categories Section */}
                    <div className="col-lg-3">
                        <div className="hero__categories">
                            <div className="hero__categories__all">
                                <i className="fa fa-bars"></i>
                                <span>Categories</span>
                            </div>
                            <ul>
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <a href={`/shop-grid?category=${category.id}`}>
                                            {category.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="col-lg-9">
                        <div className="hero__search">
                            <div className="hero__search__form">
                                <form action="/shop-grid" method="GET">
                                    <div className="hero__search__categories dropdown">
                                        Product
                                        <span className="arrow_carrot-down"></span>
                                    </div>
                                    <label>
                                        <input
                                            className="search-results-title"
                                            type="text"
                                            name="search"
                                            placeholder="Search"
                                        />
                                    </label>
                                    <button type="submit" className="site-btn">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div className="hero__search__phone">
                                <div className="hero__search__phone__icon">
                                    <a href="tel:0376696037">
                                        <i className="fa fa-phone"></i>
                                    </a>
                                </div>
                                <div className="hero__search__phone__text">
                                    <h5>+84 37 6696 037</h5>
                                    <span>support 24/7 time</span>
                                </div>
                            </div>
                        </div>

                        {/* Banner Section */}
                        <div className="home-banner">
                            {/* Add banner content here */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;



