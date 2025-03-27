import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCartItems, removeFromCart } from "src/store/slices/cart/cartSlice.js";

// Shadcn components
import { Button } from "src/components/ui/button.jsx";
import { ScrollArea } from "src/components/ui/scroll-area.jsx";
import { Badge } from "src/components/ui/badge.jsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "src/components/ui/sheet.jsx";

// Icons
import {
  ShoppingCart,
  Trash2,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

const CartPopover = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: cartItems = [], loading } = useSelector((state) => state.cart || {});

  const [open, setOpen] = useState(false);

  // Calculate total items using useMemo for better performance
  const totalItems = useMemo(() => {
    return cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
  }, [cartItems]);

  // Fetch cart items on mount and when cart is opened
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // Fetch cart items when cart is opened
  useEffect(() => {
    if (open) {
      dispatch(fetchCartItems());
    }
  }, [open, dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const toggleCart = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleViewCart = () => {
    setOpen(false);
    navigate("/cart");
  };

  return (
    <>
      {/* Cart Icon Button */}
      <Button
        variant="ghost"
        size="icon"
        className="cart-trigger-btn relative p-0 bg-transparent hover:bg-transparent"
        onClick={toggleCart}
        aria-label="Shopping cart"
      >
        <ShoppingCart className="w-5 h-5 text-foreground" />
        {totalItems > 0 && (
          <Badge
            variant="destructive"
            className="cart-badge absolute -top-1 -right-2 min-w-[1.25rem] h-5 flex items-center justify-center px-1 text-[0.65rem] font-medium"
          >
            {totalItems}
          </Badge>
        )}
      </Button>

      {/* Cart Sheet/Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:w-[380px] p-0 border-l border-border/60 backdrop-blur-md bg-background/95">
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="px-4 py-3 border-b border-border/30">
              <div className="flex items-center justify-between">
                <SheetTitle className="flex items-center gap-2 text-lg font-medium">
                  <ShoppingCart className="w-4 h-4 text-primary/70" />
                  Cart
                </SheetTitle>
                <SheetClose className="rounded-full w-7 h-7 flex items-center justify-center transition-colors hover:bg-muted">
                  <span className="sr-only">Close</span>
                </SheetClose>
              </div>
            </SheetHeader>

            {/* Cart Items */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="px-4 py-3">
                  <AnimatePresence initial={false}>
                    {cartItems.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                          <ShoppingBag className="w-8 h-8 text-muted-foreground/60" />
                        </div>
                        <h4 className="text-base font-medium mb-2">Your cart is empty</h4>
                        <p className="text-sm text-muted-foreground mb-6">
                          Add items to begin your journey
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setOpen(false);
                            navigate('/shop');
                          }}
                          className="gap-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Browse Products
                        </Button>
                      </motion.div>
                    ) : (
                      <div className="space-y-3">
                        {cartItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              x: 20,
                              transition: { duration: 0.2 }
                            }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.05,
                              type: "spring",
                              stiffness: 500,
                              damping: 30
                            }}
                            className="group relative flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            {/* Product Image */}
                            <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border border-border/30">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <h6 className="text-sm font-medium truncate pr-6 group-hover:text-primary transition-colors">
                                {item.product.name}
                              </h6>
                              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
                                <span>${item.product.price.toFixed(2)}</span>
                                <span>×</span>
                                <span>{item.quantity}</span>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="mt-auto border-t border-border/30">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">Subtotal</span>
                    <span className="text-base font-semibold text-primary">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleViewCart}
                      className="w-full justify-between bg-muted hover:bg-muted/80 text-foreground"
                    >
                      View Cart
                      <ChevronRight className="w-4 h-4" />
                    </Button>

                    <Button
                      onClick={() => {
                        setOpen(false);
                        navigate('/checkout');
                      }}
                      className="w-full"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartPopover;