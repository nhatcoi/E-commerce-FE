import React, { useState, useEffect, useCallback } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "src/css/main/main.css";
import "src/css/main/header.css";
import throttle from "lodash/throttle";
import { DropdownMenuCheckboxes } from "src/components/ui-custom/DropdownMenuCheckboxes";
import {useSelector} from "react-redux";

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const { items: collectionOptions, loading, error } = useSelector((state) => state.categories);



    // for mobile
    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleScroll = useCallback(
        throttle(() => {
            setIsScrolling(window.scrollY > 50);
        }, 100),
        []
    );

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // navbar hold when scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);



    const navItems = [
        { to: "/", label: "Home" },
        { to: "/shop", label: "Shop" },
        !isMobile && {
            to: "/collection",
            element: (
                <DropdownMenuCheckboxes
                    key="collection"
                    label={<span className="nav-link">Collection</span>}
                    options={collectionOptions}
                />
            )
        },
        { to: "/pages", label: "Pages" },
        { to: "/blog", label: "Blog" },
        { to: "/contact", label: "Contact Us" }
    ].filter(Boolean);


    const renderNavLinks = () => (
        <>
            {navItems.map((item, index) =>
                item.element ? (
                    <div key={index} className="nav-item">{item.element}</div>
                ) : (
                    <NavLink key={index} to={item.to} className="nav-link">
                        {item.label}
                    </NavLink>
                )
            )}
        </>
    );

    return (
        <header className={`header-area ${isScrolling ? "scrolling" : ""}`}>
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
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark text-white" style={{ fontSize: "0.75rem" }}>
                                    0
                                </span>
                            </div>
                        </div>
                        {renderNavLinks()}
                    </Nav>
                </div>
            </div>

            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            <Navbar bg="white" expand="lg" className={`header-main shadow-sm ${isScrolling ? "fixed" : ""}`}>
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
                        </>
                    )}
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mx-auto">{renderNavLinks()}</Nav>
                        {!isScrolling && (
                            <div className="d-flex gap-3">
                                <FaSearch className="fs-5" />
                                <FaUser className="fs-5" />
                                <FaHeart className="fs-5" />
                                <div className="position-relative">
                                    <FaShoppingCart className="fs-5" />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark text-white" style={{ fontSize: "0.75rem" }}>
                                        0
                                    </span>
                                </div>
                            </div>
                        )}
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    );
};

export default Header;
