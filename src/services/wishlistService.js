import {wishlistApi} from "src/api/wishlistApi.js";
import {
    fetchWishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} from "src/store/slices/wishlistSlice.js";
import {toast} from "src/components/ui/use-toast";

export const wishlistService = {
    // Load wishlist items
    loadWishlistItems: async (dispatch) => {
        try {
            await dispatch(fetchWishlistItems()).unwrap();
            return true;
        } catch (error) {
            console.error("Failed to load wishlist items:", error);
            return false;
        }
    },

    // Add item to wishlist
    addItem: async (dispatch, productId, showToast = true) => {
        try {
            await dispatch(addToWishlist(productId)).unwrap();
            if (showToast) {
                toast({
                    title: "Added to Wishlist",
                    description: "Item has been added to your wishlist",
                    variant: "success"
                });
            }
            return true;
        } catch (error) {
            console.error("Failed to add item to wishlist:", error);
            if (showToast) {
                toast({
                    title: "Error",
                    description: error?.message || "Failed to add item to wishlist",
                    variant: "destructive"
                });
            }
            return false;
        }
    },

    // Remove item from wishlist
    removeItem: async (dispatch, productId, showToast = true) => {
        try {
            await dispatch(removeFromWishlist(productId)).unwrap();
            if (showToast) {
                toast({
                    title: "Removed from Wishlist",
                    description: "Item has been removed from your wishlist",
                    variant: "default"
                });
            }
            return true;
        } catch (error) {
            console.error("Failed to remove item from wishlist:", error);
            if (showToast) {
                toast({
                    title: "Error",
                    description: error?.message || "Failed to remove item from wishlist",
                    variant: "destructive"
                });
            }
            return false;
        }
    },

    // Toggle wishlist item (add or remove)
    toggleWishlistItem: async (dispatch, product, isInWishlist, showToast = true) => {
        if (isInWishlist) {
            return wishlistService.removeItem(dispatch, product.id, showToast);
        } else {
            return wishlistService.addItem(dispatch, product.id, showToast);
        }
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