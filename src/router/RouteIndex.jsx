import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Shop from "../pages/Shop.jsx";
import ProductDetails from "../features/product/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import Orders from "../pages/Orders.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import SystemHome from "../pages/SystemHome.jsx";
import AccountLayout from "src/components/layouts/AccountLayout.jsx";

import Auth from "src/features/Auth.jsx";

import SystemLayout from "src/components/layouts/SystemLayout.jsx";
import AuthLayout from "src/router/AuthLayout.jsx";

const RouteIndex = () => {
    return (
        <Router>
            <Routes>
                {/* Routes chính - MainLayout bọc quanh */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="/product/:productId" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="login" element={<Auth />} />
                </Route>

                {/* Routes tài khoản - Bảo vệ bằng AuthLayout */}
                <Route path="user" element={<AccountLayout />}>
                    <Route element={<AuthLayout />}>
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="my-account" element={<UserProfile />} />
                        <Route path="my-orders" element={<Orders />} />
                        <Route path="wishlist" element={<Wishlist />} />
                    </Route>
                </Route>

                {/* Routes hệ thống */}
                <Route path="system" element={<SystemLayout />}>
                    <Route index element={<SystemHome />} />
                </Route>

                {/* Routes authentication */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default RouteIndex;
