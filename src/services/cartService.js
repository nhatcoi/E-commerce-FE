import { cartApi } from "../api/cartApi.js";
import CartManager from "./CartManager.js";
import store from "../store/index.js";
import {toast} from "src/components/ui/use-toast.js"; // Import store để truy cập trạng thái Redux

const cartService = {
    addToCart: async (productData) => {
        if (!productData?.product?.id || !productData?.quantity) {
            console.error("Invalid productData:", productData);
            toast({
                title: "Lỗi",
                description: "Dữ liệu sản phẩm không hợp lệ!",
                variant: "destructive",
            });
            return;
        }

        console.log("productData addToCart", productData);

        const { auth } = store.getState();
        if (!auth?.isAuthenticated) {
            CartManager.addItemToLocalCart(productData);
            toast({
                title: "Thêm vào giỏ hàng",
                description: "Sản phẩm đã được thêm vào giỏ hàng cục bộ!",
                variant: "success",
            });
            return;
        }

        const cartRequest = {
            productId: productData.product.id,
            quantity: productData.quantity,
            selectedAttributeId: Object.values(productData.selectedAttributes || {}).map(attr => attr.id)
        };

        console.log("Sending cart request:", cartRequest);

        try {
            await cartApi.addToCart(cartRequest);
            toast({
                title: "Thành công",
                description: "Sản phẩm đã được thêm vào giỏ hàng!",
                variant: "success",
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast({
                title: "Lỗi",
                description: "Không thể thêm sản phẩm vào giỏ hàng!",
                variant: "destructive",
            });
        }
    },

    fetchCartItems: async () => {
        try {
            const { auth } = store.getState();
            console.log("Auth state:", auth);  // Debug log
            if (!auth.isAuthenticated) {
                const localCart = CartManager.getCart();
                console.log("Returning local cart:", localCart);  // Debug log
                return localCart;
            }

            const cartResponse = await cartApi.fetchCartItems(auth.user.id);
            console.log("cartResponse.data.data", cartResponse.data);
            return cartResponse.data.data;
        } catch (error) {
            console.error("Error fetching cart items:", error);
            return [];
        }
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
