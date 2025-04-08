import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Shadcn components
import { Card, CardContent, CardFooter } from "src/components/ui/card.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Separator } from "src/components/ui/separator.jsx";

// Icons
import { ArrowRight, Lock, CheckCircle } from "lucide-react";

// Import new Discount component
import Discount from "./Discount.jsx";

const ProceedCheckout = () => {
    const navigate = useNavigate();

    // Cart state
    const cart = useSelector(state => state.cart || { items: [], selectedToPayments: [] });
    const { items, selectedToPayments = [] } = cart; // Provide default empty array

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cartItems = items?.filter(item =>
        Array.isArray(selectedToPayments) && selectedToPayments.includes(item.id)
    ) || [];

    const [animateTotal, setAnimateTotal] = useState(false);
    const [appliedDiscount, setAppliedDiscount] = useState(null);

    // Animate total when cart changes or discount applies
    useEffect(() => {
        if (cartItems.length > 0) {
            setAnimateTotal(true);
            const timer = setTimeout(() => setAnimateTotal(false), 500);
            return () => clearTimeout(timer);
        }
    }, [cartItems, appliedDiscount]);

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const calculateDiscount = () => {
        if (!appliedDiscount) return 0;

        const subtotal = calculateSubtotal();

        if (appliedDiscount.type === "percentage") {
            return (subtotal * appliedDiscount.value) / 100;
        } else if (appliedDiscount.type === "fixed") {
            return appliedDiscount.value;
        }

        return 0;
    };

    const calculateShipping = () => {
        // Free shipping if discount of that type is applied
        if (appliedDiscount && appliedDiscount.type === "shipping") {
            return 0;
        }

        const subtotal = calculateSubtotal();
        return subtotal > 100 ? 0 : 10;
    };

    const calculateTotal = () => {
        return calculateSubtotal() - calculateDiscount() + calculateShipping();
    };

    const handleDiscountApplied = (discount) => {
        setAppliedDiscount(discount);
        setAnimateTotal(true);
    };

    return (
        <div className="sticky top-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
            >
                <Card className="overflow-hidden border-border/40 shadow-sm bg-background/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-medium mb-6 pb-4 border-b border-border/40">
                            Order Summary
                        </h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                            </div>

                            {appliedDiscount && (
                                <div className="flex justify-between items-center text-emerald-600">
                                    <span>Discount ({appliedDiscount.code})</span>
                                    <span className="font-medium">-${calculateDiscount().toFixed(2)}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Shipping</span>
                                {calculateShipping() === 0 ? (
                                    <span className="text-emerald-600 font-medium">Free</span>
                                ) : (
                                    <span className="font-medium">${calculateShipping().toFixed(2)}</span>
                                )}
                            </div>

                            {calculateShipping() === 0 && (
                                <div className="flex items-center gap-1.5 text-sm text-emerald-600">
                                    <CheckCircle className="w-4 h-4" />
                                    {appliedDiscount && appliedDiscount.type === "shipping"
                                        ? "Free shipping discount applied"
                                        : "Free shipping applied"}
                                </div>
                            )}

                            {calculateShipping() > 0 && (
                                <div className="text-sm text-muted-foreground italic">
                                    Add ${(100 - calculateSubtotal()).toFixed(2)} more to get free shipping
                                </div>
                            )}

                            {/* Add Discount component here */}
                            <div className="pt-2">
                                <Discount onDiscountApplied={handleDiscountApplied} />
                            </div>

                            <Separator className="my-4" />

                            <motion.div
                                className="flex justify-between items-center"
                                animate={{ scale: animateTotal ? 1.03 : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="font-medium">Total</span>
                                <span className="text-xl font-semibold text-primary">
                  ${calculateTotal().toFixed(2)}
                </span>
                            </motion.div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 p-6 bg-muted/20 border-t border-border/40">
                        {window.location.pathname !== '/checkout' && (
                            <Button
                                className="w-full hover:bg-primary/90 gap-2 font-medium py-6"
                                onClick={() => navigate('/checkout')}
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        )}

                        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                            <Lock className="w-3.5 h-3.5" /> Secure checkout
                        </div>
                    </CardFooter>
                </Card>

                <div className="flex justify-center space-x-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                         alt="Visa"
                         className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" />

                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                         alt="Mastercard"
                         className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" />

                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                         alt="PayPal"
                         className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" />

                    <img src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg"
                         alt="Stripe"
                         className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" />
                </div>
            </motion.div>
        </div>
    );
};

export default ProceedCheckout;