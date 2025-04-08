import { orderApi } from '../api/orderApi.js';


export const orderService = {
    createOrder: async (itemsToPay, shippingData) => {
        try {
            console.log("1", itemsToPay);
            console.log("2", shippingData);

            const orderRequest = {
                products: itemsToPay.map(item => ({
                    id: item.product.id,
                    name: item.product.name,
                    price: item.price,
                    amount: Math.round(item.price * 100),
                    quantity: item.quantity,
                    currency: item.currency || "USD",
                    attributes: item.selectedAttributes
                        ? item.selectedAttributes
                            .map(attr => `${attr.attributeName}: ${attr.attributeValue}`)
                            .join("; ")
                        : ""
                })),
                orderInfo: {
                    fullName: shippingData.fullName,
                    email: shippingData.email,
                    phoneNumber: shippingData.phoneNumber,
                    district: shippingData.district,
                    country: shippingData.country,
                    city: shippingData.city,
                    addressLine: shippingData.addressLine,
                    postcode: shippingData.postcode,
                    totalPrice: itemsToPay.reduce((sum, item) => sum + (item.price * item.quantity), 0)
                },
                discountCode: shippingData.discountCode || "",
                paymentMethod: shippingData.paymentMethod || "",
                totalPrice: itemsToPay.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };

            console.log("orderRequest", orderRequest);

            const response = await orderApi.createOrder(orderRequest);
            return response.data.data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    },

    getOrders : async (page) => {

    },

    getOrderById: async (id) => {
        try {
            const response = await orderApi.getOrderById(id);
            return response.data;
        } catch (error) {
            console.error("Error fetching order by ID:", error);
            throw error;
        }
    },



    cancelOrder: async (id) => {
        try {
            const response = await orderApi.cancelOrder(id);
            return response.data;
        } catch (error) {
            console.error("Error cancelling order:", error);
            throw error;
        }
    },
}