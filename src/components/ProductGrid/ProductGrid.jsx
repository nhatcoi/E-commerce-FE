import React, { useState } from "react";
import ProductCard from "./ProductCard";
import {Row, Dropdown, ButtonGroup, DropdownButton, Button} from "react-bootstrap";
import "src/css/main/Shop.css";

const ProductGrid = ({ products }) => {
    const [sortOption, setSortOption] = useState('price-asc');  // Sort by price ascending as default
    const [viewType, setViewType] = useState('grid');  // Default to grid view

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleViewTypeChange = (view) => {
        setViewType(view);
    };

    // Sort products based on selected option
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'price-asc') {
            return a.price - b.price;
        } else if (sortOption === 'price-desc') {
            return b.price - a.price;
        }
        return 0;
    });

    return (
        <>
            {/* Shop Top Bar */}
            <div className="shop-top-bar mb-35 d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                    {/* Combo box for sorting */}
                    <div className="d-flex align-items-center">
                        <select id="sortPrice" value={sortOption} onChange={handleSortChange} className="form-select">
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>


                </div>
                <div className="d-flex align-items-center">
                    {/* Total products showing */}
                    <p className="mb-0">{sortedProducts.length} Products Showing</p>
                </div>

                {/* Shop Tab (Grid/List View) */}
                <div className="d-flex align-items-center">
                    <ButtonGroup>
                        <Button
                            variant={viewType === 'grid' ? 'primary' : 'outline-primary'}
                            onClick={() => handleViewTypeChange('grid')}
                        >
                            <i className="fa fa-th"></i>
                        </Button>
                        <Button
                            variant={viewType === 'list' ? 'primary' : 'outline-primary'}
                            onClick={() => handleViewTypeChange('list')}
                        >
                            <i className="fa fa-list-ul"></i>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>

            {/* Product Grid */}
            <Row className={`g-4 ${viewType === 'list' ? 'list-view' : 'grid-view'}`}>
                {Array.isArray(sortedProducts) && sortedProducts.map((product) => (
                    <div key={product.id} className={`col-xl-4 col-sm-6 ${viewType === 'list' ? 'col-12' : ''}`}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </Row>
        </>
    );
};

export default ProductGrid;
