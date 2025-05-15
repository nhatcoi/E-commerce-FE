import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { motion } from 'framer-motion';
import { Steps } from "src/components/ui/steps";
import { Card } from "src/components/ui/card";
import { ShoppingBag, Truck, CreditCard, CheckCircle } from "lucide-react";
import OrderSummary from 'src/features/checkout/OrderSummary';
import ShippingForm from 'src/features/checkout/ShippingForm';
import PaymentForm from 'src/features/checkout/PaymentForm';
import OrderConfirmation from 'src/features/checkout/OrderConfirmation';
import ProceedCheckout from "src/features/cart/ProceedCheckout.jsx";
import { getStripeRedirectStatus, clearStripeParams } from 'src/utils/stripeUtils';
import { orderService } from 'src/services/orderService';

const steps = [
    { title: 'Cart Review', icon: ShoppingBag },
    { title: 'Shipping', icon: Truck },
    { title: 'Payment', icon: CreditCard },
    { title: 'Confirmation', icon: CheckCircle }
];

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [shippingData, setShippingData] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);
    
    // Add safety checks when accessing cart state
    const cart = useSelector(state => state.cart || { items: [], selectedToPayments: [] });
    const { items, selectedToPayments = [] } = cart; // Provide default empty array

    // Add safety check for selected items
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selectedItems = items?.filter(item =>
        Array.isArray(selectedToPayments) && selectedToPayments.includes(item.id)
    ) || [];

    // Check for Stripe redirect on component mount
    useEffect(() => {
        const checkStripeRedirect = async () => {
            const stripeStatus = getStripeRedirectStatus();
            
            if (stripeStatus.hasRedirect) {
                setIsLoadingOrder(true);
                
                if (stripeStatus.isSuccess && stripeStatus.orderId) {
                    try {
                        // Fetch order details from backend
                        const orderDetails = await orderService.getOrderById(stripeStatus.orderId);
                        
                        if (orderDetails) {
                            // Set order data for confirmation page
                            setOrderData(orderDetails);
                            
                            // Update payment data
                            setPaymentData({
                                paymentMethod: 'stripe',
                                paymentStatus: 'succeeded',
                                orderId: stripeStatus.orderId
                            });
                            
                            // Move to confirmation step
                            setCurrentStep(3);
                        }
                    } catch (error) {
                        console.error("Error fetching order details:", error);
                    }
                } else if (stripeStatus.isCanceled) {
                    // Handle canceled payment
                    setCurrentStep(2); // Return to payment step
                }
                
                // Clear URL parameters
                clearStripeParams();
                setIsLoadingOrder(false);
            }
        };
        
        checkStripeRedirect();
    }, []);

    // Redirect if no items are selected
    useEffect(() => {
        if (items?.length > 0 && selectedItems.length === 0) {
            // Handle no selected items case
            // Maybe redirect or show message
        }
    }, [items, selectedItems]);

    const handleShippingSubmit = (data) => {
        setShippingData(data);
        setCurrentStep(2);
    };

    const handlePaymentSubmit = (data) => {
        setPaymentData(data);
        
        // If payment was successful and we have orderId, move to confirmation
        if (data.paymentStatus === 'succeeded' && data.orderId) {
            setCurrentStep(3);
        }
    };

    const renderStep = () => {
        // Show loading state when fetching order after Stripe redirect
        if (isLoadingOrder) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
                    <p className="text-muted-foreground text-center max-w-md">
                        Please wait while we verify your payment status...
                    </p>
                </div>
            );
        }
        
        switch (currentStep) {
            case 0:
                return (
                    <OrderSummary
                        items={selectedItems || []}  // Provide default empty array
                        onNext={() => setCurrentStep(1)} 
                    />
                );
            case 1:
                return (
                    <ShippingForm 
                        onSubmit={handleShippingSubmit}
                        initialData={shippingData}
                    />
                );
            case 2:
                return (
                    <PaymentForm 
                        onSubmit={handlePaymentSubmit}
                        shippingData={shippingData}
                    />
                );
            case 3:
                return (
                    <OrderConfirmation orderId={orderData?.id}/>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <Steps 
                    steps={steps} 
                    currentStep={currentStep} 
                    className="mb-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            {renderStep()}
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <ProceedCheckout
                            items={selectedItems || []}  // Provide default empty array
                            shipping={shippingData || {}}  // Provide default empty object
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Checkout;