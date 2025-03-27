import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchCartItems } from "../store/slices/cart/cartSlice.js";

// Component imports
import CartInfo from "../features/cart/CartInfo.jsx";
import CartProceedCheckout from "../features/cart/CartProceedCheckout.jsx";

const Cart = () => {
  const dispatch = useDispatch();

  // Cart state
  const cartState = useSelector((state) => state.cart || {});
  const cartItems = cartState.items || [];
  const totalItems = cartState.totalItems || 0;

  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(fetchCartItems());
    }
  }, [dispatch]);

  useEffect(() => {
    // Add a pleasant scroll effect when page loads
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Return loading or empty state directly from CartInfo component
  return (
      <div className="bg-gradient-to-br from-background to-muted/30 min-h-screen py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
          >
            <header className="text-center space-y-2 mb-8">
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Your Cart</h1>
              <p className="text-muted-foreground">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </p>
            </header>

            {/* If CartInfo returns empty or loading state, this grid won't render */}
            {cartItems.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <CartInfo />
                  </div>

                  <div className="lg:col-span-1">
                    <CartProceedCheckout />
                  </div>
                </div>
            )}

            {/* If cart is empty, CartInfo will return the empty state */}
            {cartItems.length === 0 && <CartInfo />}
          </motion.div>
        </div>
      </div>
  );
};

export default Cart;