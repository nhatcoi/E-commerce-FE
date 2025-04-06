import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Heart, X, ShoppingBag, Trash2} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "src/components/ui/popover";
import {Button} from "src/components/ui/button";
import {Badge} from "src/components/ui/badge";
import {ScrollArea} from "src/components/ui/scroll-area";
import {Separator} from "src/components/ui/separator";
import { toast } from "src/components/ui/use-toast";
import {
    fetchWishlistItems,
    removeFromWishlist,
    clearWishlist
} from "src/store/slices/wishlistSlice";

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const {items, loading, error} = useSelector((state) => state.wishlist);
    const {isAuthenticated} = useSelector((state) => state.auth);

    // Fetch wishlist items when the component mounts and when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchWishlistItems());
        }
    }, [isAuthenticated, dispatch]);

    // Refresh wishlist items when the popover is opened
    useEffect(() => {
        if (open && isAuthenticated) {
            dispatch(fetchWishlistItems());
        }
    }, [open, isAuthenticated, dispatch]);

    const handleRemoveItem = async (e, productId) => {
        e.stopPropagation();
        try {
            await dispatch(removeFromWishlist(productId)).unwrap();
            toast({
                title: "Removed from Wishlist",
                description: "Item has been removed from your wishlist",
                variant: "default"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error || "Failed to remove item from wishlist",
                variant: "destructive"
            });
        }
    };

    const handleClearWishlist = async (e) => {
        e.stopPropagation();
        try {
            await dispatch(clearWishlist()).unwrap();
            toast({
                title: "Wishlist Cleared",
                description: "All items have been removed from your wishlist",
                variant: "default"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error || "Failed to clear wishlist",
                variant: "destructive"
            });
        }
    };

    const handleNavigateToWishlist = () => {
        setOpen(false);
        navigate("/wishlist");
    };

    const handleNavigateToProduct = (productId) => {
        setOpen(false);
        navigate(`/product/${productId}`);
    };

    const handleLogin = () => {
        setOpen(false);
        navigate("/login", {
            state: {
                from: window.location.pathname,
                message: "Please login to view your wishlist"
            }
        });
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5"/>
                    {isAuthenticated && items.length > 0 && (
                        <Badge
                            className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.2rem] h-5 flex items-center justify-center">
                            {items.length}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-medium text-lg">My Wishlist</h3>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                        <X className="h-4 w-4"/>
                    </Button>
                </div>

                {!isAuthenticated ? (
                    <div className="py-6 text-center p-4">
                        <Heart className="mx-auto h-10 w-10 text-muted-foreground mb-2"/>
                        <p className="text-sm text-muted-foreground mb-4">
                            Please login to view your wishlist
                        </p>
                        <Button variant="default" onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                ) : loading ? (
                    <div className="py-10 text-center p-4">
                        <div
                            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                    </div>
                ) : error ? (
                    <div className="py-6 text-center p-4">
                        <p className="text-sm text-red-500 mb-4">
                            {error}
                        </p>
                        <Button variant="outline" onClick={() => dispatch(fetchWishlistItems())}>
                            Try Again
                        </Button>
                    </div>
                ) : items.length === 0 ? (
                    <div className="py-6 text-center p-4">
                        <Heart className="mx-auto h-10 w-10 text-muted-foreground mb-2"/>
                        <p className="text-sm text-muted-foreground mb-4">
                            Your wishlist is empty
                        </p>
                        <Button variant="outline" onClick={() => navigate("/shop")}>
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="max-h-[350px] overflow-hidden flex flex-col">
                            <ScrollArea className="flex-1 overflow-y-auto">
                                <div className="p-2">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 py-2 hover:bg-accent p-2 rounded-md cursor-pointer border-b border-border last:border-0"
                                            onClick={() => handleNavigateToProduct(item.productId)}
                                        >
                                            <div className="h-16 w-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                                                <img
                                                    src={item.thumbnail || "/placeholder.png"}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                                <p className="font-medium">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={(e) => handleRemoveItem(e, item.productId)}
                                                >
                                                    <X className="h-4 w-4"/>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Add to cart logic would be implemented here
                                                    }}
                                                >
                                                    <ShoppingBag className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                        <div className="flex items-center justify-between p-4 border-t bg-muted/30">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearWishlist}
                                className="text-xs"
                            >
                                <Trash2 className="h-3 w-3 mr-1"/>
                                Clear All
                            </Button>

                            <Button
                                variant="default"
                                size="sm"
                                onClick={handleNavigateToWishlist}
                                className="text-xs"
                            >
                                View Wishlist
                            </Button>
                        </div>
                    </>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default Wishlist;
