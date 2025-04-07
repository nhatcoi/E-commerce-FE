import React, { useState, useEffect, useCallback, memo } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../../../css/main/main.css";
import "../../../css/main/header.css";
import throttle from "lodash/throttle";
import { useSelector } from "react-redux";
import CartPopover from "src/features/cart/CartPopover.jsx";
import UserPopover from "src/features/auth/UserPopover.jsx";
import Wishlist from "src/features/product/Wishlist.jsx";
import Search from "src/components/Search.jsx";

// Memoized child components to prevent unnecessary re-renders
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

    const { items: collectionOptions, loading: categoriesLoading } = useSelector((state) => state.categories || { items: [], loading: false });
    const cartState = useSelector((state) => state.cart);
    const cartItemsCount = cartState?.totalItems || cartState?.items?.reduce((count, item) => count + item.quantity, 0) || 0;

    // for mobile
    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    // Scroll behavior with direction detection
    const handleScroll = useCallback(
        throttle(() => {
            const currentScrollPos = window.scrollY;
            
            // Set scrolling state (for styling)
            setIsScrolling(currentScrollPos > 50);
            
            // Determine scroll direction
            const isScrollingDown = currentScrollPos > prevScrollPos;
            
            // Update visibility based on scroll direction and position
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

    // Memoize these functions to prevent recreating them on each render
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
            {/* Sidebar menu - always mounted, toggled with CSS */}
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

            {/* Overlay - controlled by CSS classes */}
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            {/* Main header - always mounted, styled differently based on scroll state */}
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
                    
                    {/* Nav links - always mounted */}
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