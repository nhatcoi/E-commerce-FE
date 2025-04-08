import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Shop from "../pages/Shop.jsx";
import ProductDetails from "../features/product/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import SystemHome from "../pages/SystemHome.jsx";
import SupportPage from "src/pages/SupportPage.jsx";
import Auth from "src/pages/Auth.jsx";
import SystemLayout from "src/components/layouts/SystemLayout.jsx";
import Contact from "src/pages/Contact.jsx";
import Blog from "src/pages/Blog.jsx";
import NotFound from "src/pages/NotFound.jsx";
import Orders from "src/pages/Orders.jsx";

const RouteIndex = () => {
    return (
        <Router>
            <Routes>
                {/* Main routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="product/:productId" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="support" element={<SupportPage />} />

                    {/* User  */}
                    <Route path="user">
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="my-orders" element={<Orders />} />
                        <Route path="wishlist" element={<Wishlist />} />
                    </Route>
                </Route>

                {/* System */}
                <Route path="system" element={<SystemLayout />}>
                    <Route index element={<SystemHome />} />
                </Route>

                {/* Auth */}
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default RouteIndex;
