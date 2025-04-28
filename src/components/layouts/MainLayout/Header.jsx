import React, { useState, useEffect, useCallback, memo } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "src/styles/component/main.css";
import "src/styles/component/Header.css";
import throttle from "lodash/throttle";
import { useSelector } from "react-redux";
import CartPopover from "src/features/cart/CartPopover.jsx";
import UserPopover from "src/features/auth/UserPopover.jsx";
import Wishlist from "src/features/product2/Wishlist.jsx";
import Search from "src/features/product2/Search.jsx";

const MemoizedSearch = memo(Search);
const MemoizedWishlist = memo(Wishlist);
const MemoizedUserPopover = memo(UserPopover);
const MemoizedCartPopover = memo(CartPopover);

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const cartState = useSelector((state) => state.cart);

    // for mobile
    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    // Scroll behavior with direction detection
    const handleScroll = useCallback(
        throttle(() => {
            const currentScrollPos = window.scrollY;
            setIsScrolling(currentScrollPos > 50);
            const isScrollingDown = currentScrollPos > prevScrollPos;
            if (currentScrollPos > 100) {
                setVisible(!isScrollingDown);
            } else {
                setVisible(true);
            }
            
            setPrevScrollPos(currentScrollPos);
        }, 100),
        [prevScrollPos]
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
        { to: "/blog", label: "Blog" },
        { to: "/contact", label: "Contact Us" }
    ].filter(Boolean);

    const renderNavLinks = useCallback(() => (
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
    ), [navItems]);

    const renderIconBar = useCallback(() => (
        <div className="d-flex gap-3 align-items-center">
            <MemoizedSearch />
            <MemoizedWishlist />
            <MemoizedUserPopover />
            <MemoizedCartPopover />
        </div>
    ), []);

    return (
        <header className={`header-area ${isScrolling ? "scrolling" : ""}`}>
            {/* Sidebar menu */}
            <div className={`sidebar-menu ${isSidebarOpen ? "active" : ""}`}>
                <button className="close-btn" onClick={toggleSidebar}>
                    <FaTimes />
                </button>
                <div className="sidebar-content">
                    <Nav className="flex-column">
                        {renderIconBar()}
                        {renderNavLinks()}
                    </Nav>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            {/* Main header */}
            <Navbar 
                bg="white" 
                expand="lg" 
                className={`header-main ${isScrolling ? "fixed" : ""} ${!visible ? "header-hidden" : ""}`}
            >
                <div className="header-wap container-fluid">
                    {/* Brand and mobile controls - conditionally rendered but parent element always exists */}
                    <div className={isScrolling ? "d-none" : ""}>
                        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-3">
                            JackieShop
                        </Navbar.Brand>
                    </div>
                    
                    <div className={isScrolling ? "d-none" : "d-flex align-items-center gap-2"}>
                        <MemoizedSearch />
                        <button className="menu-toggle" onClick={toggleSidebar}>
                            <FaBars />
                        </button>
                    </div>
                    
                    {/* Nav links */}
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mx-auto">{renderNavLinks()}</Nav>
                        <div className={isScrolling ? "d-none" : ""}>
                            {renderIconBar()}
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    );
};

export default memo(Header);