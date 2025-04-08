import { checkoutApi } from '../api/checkoutApi.js';


export const checkoutService = {
    createCheckout: async (itemsToPay, orderIntent) => {
        try {
            console.log("1", itemsToPay);

            const checkoutRequest = {
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
                orderMetadata: orderIntent
            };

            console.log("checkoutRequest", checkoutRequest);

            const response = await checkoutApi.createCheckout(checkoutRequest);

            console.log("response", response);
            return response.data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    },

    checkPaymentStatus: async (orderId) => {
        try {
            const response = await checkoutApi.getPaymentStatus(orderId);
            return response.data;
        } catch (error) {
            console.error("Error checking payment status:", error);
            throw error;
        }
    },
    
    pollPaymentStatus: async (orderId, maxAttempts = 30, interval = 2000) => {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            
            const checkStatus = async () => {
                try {
                    attempts++;
                    const statusResponse = await checkoutService.checkPaymentStatus(orderId);
                    
                    if (statusResponse.status === 'succeeded' || statusResponse.status === 'complete') {
                        resolve(statusResponse);
                        return;
                    } else if (statusResponse.status === 'failed' || statusResponse.status === 'canceled') {
                        reject(new Error(`Payment ${statusResponse.status}`));
                        return;
                    }
                    
                    // Continue polling if max attempts not reached
                    if (attempts < maxAttempts) {
                        setTimeout(checkStatus, interval);
                    } else {
                        reject(new Error('Payment status check timed out'));
                    }
                } catch (error) {
                    if (attempts < maxAttempts) {
                        setTimeout(checkStatus, interval);
                    } else {
                        reject(error);
                    }
                }
            };
            
            checkStatus();
        });
    }
}