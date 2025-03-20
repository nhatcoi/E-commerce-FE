import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { CircularProgress, Typography } from "@mui/material";
import Sidebar from "src/features/shop/SideBar.jsx";
import ProductGrid from "src/features/shop/ProductGrid.jsx";
import { fetchProducts } from "../store/slices/product/productsSlice.js";
import { fetchCategories } from "src/store/slices/categoriesSlice.js";
import { fetchAverageRatings } from "src/store/slices/product/ratingSlice.js";

const Shop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const { items: products, loading, error } = useSelector((state) => state.products);

    const getFiltersFromURL = () => {
        return Object.fromEntries(searchParams.entries());
    };


    const [filters, setFilters] = useState(getFiltersFromURL());

    // Fetch dữ liệu khi filters thay đổi
    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 6, ...filters }));
    }, [dispatch, filters]);

    // Fetch danh mục
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Fetch rating
    useEffect(() => {
        if (products.length > 0) {
            dispatch(fetchAverageRatings(products));
        }
    }, [dispatch, products]);

    // Cập nhật filters khi URL thay đổi
    useEffect(() => {
        setFilters(getFiltersFromURL());
    }, [searchParams]);

    // Cập nhật URL khi filters thay đổi
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setSearchParams(newFilters); // Cập nhật URL
    };

    console.log("Filters:", filters);

    if (loading && products.length === 0) return <div className="flex justify-center py-6"><CircularProgress /></div>;
    if (error) return <Typography variant="body1" className="text-red-500">Lỗi: {error}</Typography>;

    return (
        <Container className="shop-page">
            <Row>
                <Col lg={3} className="sidebar order-2 order-lg-1 mb-4">
                    <Sidebar onFilterChange={handleFilterChange} />
                </Col>
                <Col lg={9} className="product_grid order-1 order-lg-2">
                    <ProductGrid />
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
