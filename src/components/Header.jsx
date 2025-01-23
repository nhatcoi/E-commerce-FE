import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Import NavLink từ react-router-dom
import "src/css/main/main.css";
import "src/css/main/header.css";

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                setIsScrolling(true); // Thêm class fixed
            } else {
                setIsScrolling(false); // Xóa class fixed
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header-area ${isScrolling ? "scrolling" : ""}`}>
            {/* Sidebar Menu */}
            <div className={`sidebar-menu ${isSidebarOpen ? "active" : ""}`}>
                <button className="close-btn" onClick={toggleSidebar}>
                    <FaTimes />
                </button>
                <div className="sidebar-content">
                    <Nav className="flex-column">
                        <div className="d-flex gap-3">
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

                        {/* Sử dụng NavLink thay vì Nav.Link */}
                        <NavLink to="/" className="nav-link" onClick={toggleSidebar}>
                            Home
                        </NavLink>
                        <NavLink to="/shop" className="nav-link" onClick={toggleSidebar}>
                            Shop
                        </NavLink>
                        <NavLink to="/collection" className="nav-link" onClick={toggleSidebar}>
                            Collection
                        </NavLink>
                        <NavLink to="/pages" className="nav-link" onClick={toggleSidebar}>
                            Pages
                        </NavLink>
                        <NavLink to="/blog" className="nav-link" onClick={toggleSidebar}>
                            Blog
                        </NavLink>
                        <NavLink to="/contact" className="nav-link" onClick={toggleSidebar}>
                            Contact Us
                        </NavLink>
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
                    </Nav>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            {/* Main Navbar */}
            <Navbar
                bg="white"
                expand="lg"
                className={`header-main shadow-sm ${isScrolling ? "fixed" : ""}`}
            >
                <div className="header-wap container-fluid">
                    {!isScrolling && (
                        <>
                            <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-3">
                                JackieShop
                            </Navbar.Brand>

                            <div className="d-flex align-items-center gap-2">
                                <FaSearch className="fs-5" />
                                <button className="menu-toggle" onClick={toggleSidebar}>
                                    <FaBars />
                                </button>
                            </div>

                            <Navbar.Collapse id="navbar-nav">
                                <Nav className="mx-auto">
                                    <NavLink to="/" className="nav-link">
                                        Home
                                    </NavLink>
                                    <NavLink to="/shop" className="nav-link">
                                        Shop
                                    </NavLink>
                                    <NavLink to="/collection" className="nav-link">
                                        Collection
                                    </NavLink>
                                    <NavLink to="/pages" className="nav-link">
                                        Pages
                                    </NavLink>
                                    <NavLink to="/blog" className="nav-link">
                                        Blog
                                    </NavLink>
                                    <NavLink to="/contact" className="nav-link">
                                        Contact Us
                                    </NavLink>
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
                        </>
                    )}

                    {isScrolling && (
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="mx-auto">
                                <NavLink to="/" className="nav-link">
                                    Home
                                </NavLink>
                                <NavLink to="/shop" className="nav-link">
                                    Shop
                                </NavLink>
                                <NavLink to="/collection" className="nav-link">
                                    Collection
                                </NavLink>
                                <NavLink to="/pages" className="nav-link">
                                    Pages
                                </NavLink>
                                <NavLink to="/blog" className="nav-link">
                                    Blog
                                </NavLink>
                                <NavLink to="/contact" className="nav-link">
                                    Contact Us
                                </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    )}
                </div>
            </Navbar>
        </header>
    );
};

export default Header;
