import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "src/components/ui/card";
import { Separator } from "src/components/ui/separator";
import { Tag, ShieldCheck } from "lucide-react";

const OrderSummarySidebar = ({ items = [], shipping = {} }) => {
    const [promoCode, setPromoCode] = useState("");

    const calculateSubtotal = () => {
        if (!Array.isArray(items)) return 0;
        return items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shippingCost = shipping?.cost || 0;
        const discount = 0; // Add discount logic if needed
        return (subtotal + shippingCost - discount).toFixed(2);
    };

    const handleApplyPromo = (e) => {
        e.preventDefault();
        // Handle promo code logic here
        console.log("Applying promo code:", promoCode);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <Card className="sticky top-4">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    {/* Items List */}
                    <div className="space-y-4">
                        {Array.isArray(items) && items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="flex-1">
                                    {item.product?.name || 'Product'} × {item.quantity || 1}
                                </span>
                                <span className="font-medium">
                                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>${(shipping?.cost || 0).toFixed(2)}</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                    </div>

                    {/* Promo Code */}
                    <form onSubmit={handleApplyPromo} className="space-y-2">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Promo code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit" variant="outline">
                                Apply
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex-col space-y-4">
                    {/* Security Badge */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg w-full">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Secure Checkout</span>
                    </div>

                    {/* Accepted Payment Methods */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground w-full">
                        <Tag className="w-4 h-4" />
                        <span>We accept all major credit cards</span>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default OrderSummarySidebar; 