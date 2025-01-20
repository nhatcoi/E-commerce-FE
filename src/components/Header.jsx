import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import 'src/css/main/main.css';
import 'src/css/main/header.css';

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className="header-area">
            {/* Sidebar Menu */}
            <div className={`sidebar-menu ${isSidebarOpen ? "active" : ""}`}>
                <button className="close-btn" onClick={toggleSidebar}>
                    <FaTimes />
                </button>
                <div className="sidebar-content">
                    <Nav className="flex-column">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/shop">Shop</Nav.Link>
                        <Nav.Link href="/collection">Collection</Nav.Link>
                        <Nav.Link href="/pages">Pages</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                    </Nav>
                    <div className="language-currency">
                        <select className="form-select">
                            <option>English</option>
                            <option>Vietnamese</option>
                        </select>
                        <select className="form-select">
                            <option>USD</option>
                            <option>VND</option>
                        </select>
                    </div>
                    <div className="contact-info">
                        <p>(037) 6696 037</p>
                        <p>jackie06@gmail.com</p>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            {/* Top bar */}
            <div className="header-top-bar bg-light border-bottom">
                <div className="header-wap container-fluid d-flex justify-content-between align-items-center">
                    <div className="header-wap-left d-flex gap-3">
                        <select className="form-select border-0" style={{ width: "auto", background: "none" }}>
                            <option>English</option>
                            <option>Vietnamese</option>
                        </select>
                        <select className="form-select border-0" style={{ width: "auto", background: "none" }}>
                            <option>USD</option>
                            <option>VND</option>
                        </select>
                        <div className="call-us">Call Us 0376696037</div>
                    </div>
                    <div className="header-wap-right text-danger">Free delivery on order over €200.00</div>
                </div>
            </div>

            {/* Main Navbar */}
            <Navbar bg="white" expand="lg" className="header-main shadow-sm">
                <div className="header-wap container-fluid">
                    <Navbar.Brand href="/" className="fw-bold fs-3">
                        JackieShop
                    </Navbar.Brand>

                    <button className="menu-toggle" onClick={toggleSidebar}>
                        <FaBars />
                    </button>

                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/shop">Shop</Nav.Link>
                            <Nav.Link href="/collection">Collection</Nav.Link>
                            <Nav.Link href="/pages">Pages</Nav.Link>
                            <Nav.Link href="/blog">Blog</Nav.Link>
                            <Nav.Link href="/contact">Contact Us</Nav.Link>
                        </Nav>

                        <div className="d-flex gap-3">
                            <FaSearch className="fs-5" />
                            <FaUser className="fs-5" />
                            <FaHeart className="fs-5" />
                            <div className="position-relative">
                                <FaShoppingCart className="fs-5" />
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark text-white"
                                    style={{ fontSize: "0.75rem" }}
                                >
                  0
                </span>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    );
};

export default Header;
