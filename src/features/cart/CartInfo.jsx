import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    updateCartQuantity,
    removeFromCart,
    clearCart, 
    toggleSelectItem, 
    fetchCartItems
} from "src/store/slices/product/cart/cartSlice.js";

// Shadcn components
import { Card, CardFooter } from "src/components/ui/card.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Input } from "src/components/ui/input.jsx";
import { LoadingSpinner } from "src/components/ui/loading-spinner.jsx";
import { Error } from "src/components/ui/error.jsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "src/components/ui/tooltip.jsx";

// Icons
import {
    ShoppingBag,
    Minus,
    Plus,
    X,
    ArrowLeft,
    Trash2
} from "lucide-react";
import { Checkbox } from "src/components/ui/checkbox";

const CartInfo = () => {
    const dispatch = useDispatch();

    // Cart state
    const cartState = useSelector((state) => state.cart || {});
    const cartItems = cartState.items || [];
    const selectedToPayments = cartState.selectedToPayments || [];
    const loading = cartState.loading || false;
    const error = cartState.error;

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const handleCheckboxChange = (id) => {
        dispatch(toggleSelectItem(id));
    };

    const handleQuantityChange = (id, value) => {
        const newQuantity = parseInt(value) || 1;
        const timer = setTimeout(() => {
            dispatch(updateCartQuantity({ id, quantity: newQuantity }));
        }, 500);
        return () => clearTimeout(timer);
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    if (loading) {
        return <LoadingSpinner fullScreen text="Preparing your cart..." />;
    }

    if (error) {
        return (
            <Error 
                title="Failed to load cart"
                message={error}
                action={() => dispatch(fetchCartItems())}
            />
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[80vh] p-4 bg-gradient-to-br from-background to-muted/30">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md p-8 text-center bg-background rounded-xl shadow-sm"
                >
                    <div className="mb-6 w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-muted/50">
                        <ShoppingBag className="w-10 h-10 text-muted-foreground/70" />
                    </div>
                    <h2 className="text-2xl font-medium mb-3 text-foreground">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-6">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link to="/shop">
                        <Button variant="outline" className="gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            Start Shopping
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <Card className="overflow-hidden border-border/40 shadow-sm bg-background/80 backdrop-blur-sm">
            <div className="divide-y divide-border/40">
                <AnimatePresence>
                    {cartItems.map((item, index) => (
                        <motion.div
                            key={item.product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="group p-4 md:p-6 flex flex-col md:flex-row gap-4 relative"
                        >
                            <div className="flex items-center">
                                <Checkbox
                                    id={`checkbox-${item.product.id}`}
                                    checked={selectedToPayments.includes(item.id)}
                                    onCheckedChange={() => handleCheckboxChange(item.id)}
                                    aria-label={`Select ${item.product.name}`}
                                />
                            </div>

                            <div className="w-full md:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                <img
                                    src={item.product.thumbnail}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                            </div>

                            <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-1.5">
                                    <Link
                                        to={`/product/${item.product.id}`}
                                        className="text-foreground font-medium hover:text-primary transition-colors"
                                    >
                                        {item.product.name}
                                    </Link>

                                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                        {/* Display selected attributes */}
                                        {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                                            <>
                                                {Object.entries(item.selectedAttributes).map(([name, attr]) => (
                                                    <span 
                                                        key={name} 
                                                        className="text-muted-foreground/70"
                                                    >
                                                        {attr.attributeValue}
                                                    </span>
                                                ))}
                                                <span className="text-muted-foreground/30">•</span>
                                            </>
                                        )}
                                        <span className="text-primary font-medium">
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2">
                                    <div className="flex items-center border rounded-full bg-background">
                                        <button
                                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                                            onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>

                                        <Input
                                            type="number"
                                            min="1"
                                            value={item.quantity || 1}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            className="w-10 h-8 text-center border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />

                                        <button
                                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <div className="text-right font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Remove item</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 p-6 bg-muted/20">
                <Link to="/shop" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full gap-2">
                        <ArrowLeft className="w-4 h-4" /> Continue Shopping
                    </Button>
                </Link>

                <Button
                    variant="destructive"
                    onClick={() => dispatch(clearCart())}
                    className="w-full sm:w-auto gap-2"
                >
                    <Trash2 className="w-4 h-4" /> Clear Cart
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CartInfo;