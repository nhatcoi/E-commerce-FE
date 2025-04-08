import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { orderService } from "src/services/orderService";
import { checkoutService } from "src/services/checkoutService";

export const usePaymentForm = ({ onSubmit, shippingData }) => {
    const [selectedMethod, setSelectedMethod] = useState("credit-card");
    const [isLoading, setIsLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const cart = useSelector(state => state.cart || { items: [], selectedToPayments: [] });
    const { items, selectedToPayments = [] } = cart;
    const itemsToPay = items?.filter(item => Array.isArray(selectedToPayments) && selectedToPayments.includes(item.id)) || [];

    useEffect(() => {
        let statusPollInterval;

        if (isLoading) {
            const pollStatus = async () => {
                try {
                    const result = await checkoutService.checkPaymentStatus(orderId);
                    if (result.description === 'PAID' || result.description === 'SUCCEEDED') {
                        setPaymentStatus('succeeded');
                        setIsLoading(false);
                        onSubmit({
                            paymentMethod: selectedMethod,
                            paymentStatus: 'succeeded',
                            orderId
                        });
                        clearInterval(statusPollInterval);
                    } else if (result.status === 'FAILED' || result.status === 'CANCELED') {
                        setPaymentStatus('failed');
                        setIsLoading(false);
                        clearInterval(statusPollInterval);
                    }
                } catch (error) {
                    console.error("Error polling payment status:", error);
                }
            };

            statusPollInterval = setInterval(pollStatus, 3000);
        }

        return () => {
            if (statusPollInterval) clearInterval(statusPollInterval);
        };
    }, [orderId, isLoading, onSubmit, selectedMethod]);

    const handleFormSubmit = async (data) => {
        try {
            setIsLoading(true);
            const orderIntent = await orderService.createOrder(itemsToPay, shippingData);
            if (orderIntent) {
                setOrderId(orderIntent.orderId);
                const stripeResponse = await checkoutService.createCheckout(itemsToPay, orderIntent);
                if (stripeResponse.sessionUrl) {
                    window.open(stripeResponse.sessionUrl, "_blank");
                } else {
                    console.error("Stripe session URL is missing");
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            setIsLoading(false);
        }
    };

    return {
        selectedMethod,
        setSelectedMethod,
        isLoading,
        handleSubmit,
        handleFormSubmit,
        register,
        errors,
        paymentStatus
    };
};
