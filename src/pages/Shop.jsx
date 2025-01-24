import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar/SideBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Pagination from "../components/Pagination";
import api from "src/util/api.js";
import { Alerts } from "src/util/utils.js";

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

            const data = response.data; // Axios trả về dữ liệu trong `response.data`
            console.log(data.data);

            setProducts(data.data); // data
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

            console.log(response);

            const data = response.data;
            console.log(data.data);

            setCategories(data.data);
        } catch (error) {
            console.error(error);
            Alerts.handleError('Error loading categories.');
        }
    };

    useEffect(() => {
        loadProducts().then(r => console.log(r));
        loadCategories().then(r => console.log(r));
    }, []);

    const handlePageChange = (page) => {
        loadProducts(page).then(r => console.log(r));
    };

    return (
        <Container className="shop-page">
            <Row>
                <Col lg={3} md={4} sm={12} className="mb-4">
                    <Sidebar categories={categoriesGrid} />
                </Col>
                <Col lg={9} md={8} sm={12}>
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
