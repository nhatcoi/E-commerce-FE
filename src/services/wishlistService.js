import {
    fetchWishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} from "src/store/slices/product/wishlistSlice.js";
import {toast} from "src/components/ui/use-toast";
import api from "src/config/api.js";

export const wishlistService = {
    loadWishlistItems: async () => {
        try {
            const response = await api.get("/wishlist");
            if (response.data && response.data.statusCode === 200 && response.data.data) {
                return response.data.data;
            }
            return response.data;
        } catch (error) {
            return null;
        }
    },

    // Add item to wishlist
    addItem: async (productId) => {
        try {
            const response = await api.post("/wishlist/add", {productId});

            if (response.data && response.data.statusCode === 200 && response.data.data) {
                return response.data.data;
            }
            const updatedResponse = await api.get("/wishlist");
            if (updatedResponse.data && updatedResponse.data.statusCode === 200 && updatedResponse.data.data) {
                return updatedResponse.data.data;
            }

            return response.data;
        } catch (error) {
            return null;
        }
    },

    removeItem: async (productId) => {
        const response = await api.delete(`/wishlist/remove/${productId}`);

        if (response) {
            return response.data;
        }

        throw new Error(response.data?.message || "Failed to remove item");
    },


    // Clear all wishlist items
    clearWishlist: (dispatch) => {
        dispatch(clearWishlist());
        toast({
            title: "Wishlist Cleared",
            description: "All items have been removed from your wishlist",
            variant: "default"
        });
    }
};

export default wishlistService; 