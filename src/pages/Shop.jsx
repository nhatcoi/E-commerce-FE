// Shop.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar/SideBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Pagination from "../components/Pagination";
import api from "src/util/api.js";
import { Alerts } from "src/util/utils.js";
import "src/css/main/Shop.css";

const Shop = () => {
    const [productsGrid, setProducts] = useState([]);
    const [categoriesGrid, setCategories] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 0 });

    const loadProducts = async (page = 0) => {
        try {
            const response = await api.get(`/products`, {
                params: {
                    page: page,
                    size: 8,
                },
            });

            const data = response.data;
            setProducts(data.data);
            setPagination({
                totalPages: data.pagination.totalPages,
                currentPage: page,
            });
        } catch (error) {
            console.error(error);
            Alerts.handleError('Error loading products.');
        }
    };

    const loadCategories = async () => {
        try {
            const response = await api.get(`/categories`);
            const data = response.data;
            setCategories(data.data);
        } catch (error) {
            console.error(error);
            Alerts.handleError('Error loading categories.');
        }
    };

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    const handlePageChange = (page) => {
        loadProducts(page);
    };

    return (
        <Container className="shop-page">
            <Row>
                {/* Sidebar */}
                <Col lg={3} className="sidebar order-2 order-lg-1 mb-4">
                    <Sidebar categories={categoriesGrid} />
                </Col>
                {/* Product Grid */}
                <Col lg={9} className="product_grid order-1 order-lg-2">
                    <ProductGrid products={productsGrid} />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-4">
                    <Pagination
                        totalPages={pagination.totalPages}
                        currentPage={pagination.currentPage}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;