import { motion } from 'framer-motion';
import { Button } from 'src/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from 'src/components/ui/card';
import { Separator } from 'src/components/ui/separator';
import { ShoppingBag } from 'lucide-react';

const OrderSummary = ({ items = [], onNext }) => {
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="mb-4 w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-muted">
                    <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No items selected</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Please select items from your cart to proceed with checkout
                </p>
            </div>
        );
    }

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <CardHeader className="px-0 pt-0">
                <CardTitle>Review Your Order</CardTitle>
            </CardHeader>

            <CardContent className="px-0 space-y-6">
                {/* Items List */}
                <div className="space-y-4">
                    {items.map((item) => (
                        <div 
                            key={item.id} 
                            className="flex items-start gap-4"
                        >
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={item.product?.thumbnail}
                                    alt={item.product?.name || 'Product'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="flex-1">
                                <h4 className="font-medium">
                                    {item.product?.name || 'Product'}
                                </h4>
                                
                                <div className="text-sm text-muted-foreground mt-1">
                                    {item.selectedAttributes && 
                                        Object.entries(item.selectedAttributes).map(([name, attr]) => (
                                            <span key={name} className="mr-2">
                                                {attr.attributeValue}
                                            </span>
                                        ))
                                    }
                                </div>
                                
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm">
                                        Quantity: {item.quantity || 1}
                                    </span>
                                    <span className="font-medium">
                                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Separator />

                {/* Order Summary */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-medium">
                            ${calculateSubtotal().toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Shipping</span>
                        <span>Calculated at next step</span>
                    </div>
                </div>

                <Button 
                    className="w-full mt-6" 
                    onClick={onNext}
                    disabled={items.length === 0}
                >
                    Continue to Shipping
                </Button>
            </CardContent>
        </motion.div>
    );
};

export default OrderSummary; 