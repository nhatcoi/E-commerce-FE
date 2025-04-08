import { motion } from "framer-motion";
import { CheckCircle, Package, Printer, Mail } from "lucide-react";
import { Button } from "src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "src/components/ui/card";
import { Separator } from "src/components/ui/separator";

const OrderConfirmation = ({ orderData }) => {
    const { shipping, payment, cart } = orderData;
    const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const handlePrintOrder = () => {
        window.print();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
        >
            {/* Success Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">Order Confirmed!</h1>
                    <p className="text-muted-foreground">
                        Thank you for your purchase. Your order has been received.
                    </p>
                </div>
            </div>

            {/* Order Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Order Details</CardTitle>
                    <CardDescription>
                        Order Number: {orderNumber}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Shipping Information */}
                    <div className="space-y-2">
                        <h3 className="font-medium">Shipping Address</h3>
                        <div className="text-sm text-muted-foreground">
                            <p>{shipping.fullName}</p>
                            <p>{shipping.address}</p>
                            <p>{`${shipping.city}, ${shipping.district} ${shipping.postcode}`}</p>
                            <p>{shipping.country}</p>
                            <p>Phone: {shipping.phone}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Payment Information */}
                    <div className="space-y-2">
                        <h3 className="font-medium">Payment Method</h3>
                        <div className="text-sm text-muted-foreground">
                            <p>{payment.paymentMethod === 'credit-card' 
                                ? `Credit Card ending in ${payment.paymentDetails.cardNumber.slice(-4)}` 
                                : payment.paymentMethod}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="space-y-4">
                        <h3 className="font-medium">Order Summary</h3>
                        <div className="space-y-2">
                            {cart.items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span className="font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>${cart.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span>${cart.shipping.toFixed(2)}</span>
                            </div>
                            {cart.discount > 0 && (
                                <div className="flex justify-between text-sm text-primary">
                                    <span>Discount</span>
                                    <span>-${cart.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-medium pt-4">
                                <span>Total</span>
                                <span>${cart.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Estimated Delivery */}
            <Card>
                <CardContent className="flex items-center gap-4 py-6">
                    <Package className="w-6 h-6 text-primary" />
                    <div>
                        <p className="font-medium">Estimated Delivery</p>
                        <p className="text-sm text-muted-foreground">
                            {shipping.shippingMethod === 'express' 
                                ? '1-2 business days' 
                                : '3-5 business days'}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                    variant="outline" 
                    className="flex-1 gap-2"
                    onClick={handlePrintOrder}
                >
                    <Printer className="w-4 h-4" />
                    Print Order
                </Button>
                <Button 
                    variant="outline" 
                    className="flex-1 gap-2"
                    onClick={() => window.location.href = '/'}
                >
                    <Mail className="w-4 h-4" />
                    Email Receipt
                </Button>
                <Button 
                    className="flex-1"
                    onClick={() => window.location.href = '/shop'}
                >
                    Continue Shopping
                </Button>
            </div>

            {/* Additional Information */}
            <div className="text-center text-sm text-muted-foreground">
                <p>A confirmation email has been sent to your email address.</p>
                <p>For any questions, please contact our customer support.</p>
            </div>
        </motion.div>
    );
};

export default OrderConfirmation; 