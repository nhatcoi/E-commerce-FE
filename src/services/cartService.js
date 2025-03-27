import { cartApi } from "../api/cartApi";
import CartManager from "./CartManager";
import store from "../store"; // Import store để truy cập trạng thái Redux

const cartService = {
    addToCart: async (productData) => {
        if (!productData || typeof productData !== "object") {
            console.error("Invalid productData:", productData);
            return;
        }

        const { auth } = store.getState();
        console.log(auth, "auth", auth.isAuthenticated);
        if (!auth.isAuthenticated) {
            CartManager.addItemToLocalCart(productData);
        } else {
            return cartApi.addToCart(auth.user.id, productData);
        }
    },

    fetchCartItems: async () => {
        const { auth } = store.getState();
        if (!auth.isAuthenticated) {
            return CartManager.getCart();
        }
        return cartApi.fetchCartItems(auth.user.id);
    },

    updateCartQuantity: async (id, quantity) => {
        return cartApi.updateCartQuantity(id, quantity);
    },

    removeFromCart: async (id) => {
        const { auth } = store.getState();
        if (!auth.isAuthenticated) {
            return CartManager.removeFromCart(id);
        }
        return cartApi.removeFromCart(id);
    },

    clearCart: async () => {
        const { auth } = store.getState();
        if (!auth.isAuthenticated) {
            CartManager.clearCart();
        } else {
            return cartApi.clearCart();
        }
    }
};

export default cartService;
