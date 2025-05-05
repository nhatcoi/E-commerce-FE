import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Shop from "../pages/Shop.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
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
import BlogDetail from "src/pages/BlogDetail.jsx";
import Orders from "src/features/orders/pages/Orders.jsx";
import OrderDashboard from "src/features/orders/pages/OrdersDashboard.jsx";
import Gallery from "src/features/gallery/Gallery.jsx";

import NotFound from "src/pages/NotFound.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout/DashboardLayout.jsx";
import Dashboard from "src/features/dashboard/Dashboard";
import ProductsDashboard from "src/features/product/pages/ProductsDashboard.jsx";
import ProductDetailDashboard from "src/features/product/pages/ProductDetailDashboard.jsx";
import Categories from "src/features/category/pages/Categories.jsx";
import UsersDashboard from "src/features/users/pages/UsersDashboard.jsx";
import Analytics from "src/features/dashboard/Analytics";
import Settings from "src/features/dashboard/Settings";
import {UserDetailDashboard} from "src/features/users/index.js";

const RouteIndex = () => {
    return (
        <Router>
            <Routes>
                {/* Main routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="product/:slug" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog/:slug" element={<BlogDetail />} />
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

                {/* Admin Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<ProductsDashboard />} />
                    <Route path="products/:productId" element={<ProductDetailDashboard />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="orders" element={<OrderDashboard />} />
                    {/* <Route path="orders/:orderId" element={<OrdersDetailDashboard />} /> */}
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="users" element={<UsersDashboard />} />
                    <Route path="users/:userId" element={<UserDetailDashboard />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
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
