import {showNotification, showNotificationWithOptions} from "src/components/ui-custom/notifications.js";

class CartManager {
    static getCart() {
        const cart = JSON.parse(localStorage.getItem("guest_cart"));
        return cart && Array.isArray(cart.products) ? cart.products : [];
    }

    static getNextId() {
        let currentId = parseInt(localStorage.getItem("cart_increment_id")) || 1;
        localStorage.setItem("cart_increment_id", currentId + 1);
        return currentId;
    }

    static addItemToLocalCart(productData) {
        if (!productData || !productData.product) {
            console.error("Invalid product data:", productData);
            return;
        }



        let { product, quantity = 1, selectedAttributes } = productData;
        let cart = JSON.parse(localStorage.getItem("guest_cart")) || { products: [] };


        let existingProduct = cart.products.find(item =>
            item.product.id === product.id &&
            JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
        );

        if (quantity > product.quantity_in_stock) {
            return showNotification("Overcoming the product level in the stock!", "error");
        }

        if (existingProduct) {
            showNotificationWithOptions(
                "Products already in the cart. Do you want to add more?",
                "warning",
                () => {
                    let newQuantity = existingProduct.quantity + quantity;
                    if (newQuantity > product.quantity_in_stock) {
                        return showNotification("Overcoming the product level in the stock!", "error");
                    }
                    existingProduct.quantity = newQuantity;
                    localStorage.setItem("guest_cart", JSON.stringify(cart));
                    showNotification("Add to cart successful", "success");
                }
            );
            return;
        }

        // Kiểm tra tồn kho khi thêm mới

        cart.products.push({
            id: this.getNextId(),
            product,
            quantity,
            selectedAttributes,
            price: product.price,
            totalPrice: product.price * quantity,
        });

        localStorage.setItem("guest_cart", JSON.stringify(cart));
        showNotification("Add to cart successful", "success");
    }



    static clearCart() {
        localStorage.removeItem("guest_cart");
        localStorage.removeItem("cart_increment_id"); // Reset ID khi xóa giỏ hàng
    }

    static removeFromCart(itemId) {
        let cart = { products: this.getCart() };
        cart.products = cart.products.filter(item => item.id !== itemId);
        localStorage.setItem("guest_cart", JSON.stringify(cart));
        return cart.products;
    }
}

export default CartManager;
