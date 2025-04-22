import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Heart, ShoppingBag, Trash2, ArrowLeft} from "lucide-react";
import {Button} from "src/components/ui/button";
import {Card, CardContent} from "src/components/ui/card";
import {Separator} from "src/components/ui/separator";
import {ScrollArea} from "src/components/ui/scroll-area";
import {fetchWishlistItems, removeFromWishlist, clearWishlist} from "src/store/slices/product/wishlistSlice.js";
import {toast} from "src/components/ui/use-toast";

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {items, loading, error} = useSelector((state) => state.wishlist);
    const {user, isAuthenticated} = useSelector((state) => state.auth2);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                navigate("/login", {
                    state: {
                        from: "/wishlist",
                        message: "Please login to view your wishlist"
                    }
                });
                return;
            }
            dispatch(fetchWishlistItems());
        }, 1000);
        return () => clearTimeout(timer);
    }, [isAuthenticated, dispatch, navigate]);


    const handleRemoveItem = async (productId) => {
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

    const handleClearWishlist = async () => {
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

    const handleNavigateToProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    // If not authenticated, the redirect happens in useEffect
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-4 w-4"/>
                    </Button>
                    <h1 className="text-2xl font-bold">My Wishlist</h1>
                </div>
                {items.length > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearWishlist}
                        className="text-sm"
                    >
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Clear All
                    </Button>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-60">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : error ? (
                <Card className="p-6 text-center">
                    <div className="text-red-500 mb-4">
                        <Heart className="h-12 w-12 mx-auto mb-2"/>
                        <p className="text-lg font-medium">Error loading your wishlist</p>
                    </div>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button variant="outline" onClick={() => dispatch(fetchWishlistItems())}>
                        Try Again
                    </Button>
                </Card>
            ) : items.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground"/>
                        <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                        <p className="text-muted-foreground mb-6">Items you add to your wishlist will appear here</p>
                        <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div
                                className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground mb-4 px-4">
                                <div className="col-span-6 md:col-span-7">Product</div>
                                <div className="col-span-2 text-right">Price</div>
                                <div className="col-span-4 md:col-span-3 text-right">Actions</div>
                            </div>

                            <Separator className="mb-4"/>

                            <ScrollArea className="max-h-[70vh]">
                                {items.map((item) => (
                                    <div key={item.id} className="mb-4">
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            <div className="col-span-6 md:col-span-7">
                                                <div
                                                    className="flex items-center gap-4 cursor-pointer"
                                                    onClick={() => handleNavigateToProduct(item.productId)}
                                                >
                                                    <div className="h-20 w-20 rounded-md overflow-hidden bg-secondary">
                                                        <img
                                                            src={item.thumbnail || "/placeholder.png"}
                                                            alt={item.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">{item.name}</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-2 text-right font-medium">
                                                ${item.price?.toFixed(2)}
                                            </div>

                                            <div className="col-span-4 md:col-span-3 flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        // Add to cart logic would go here
                                                    }}
                                                >
                                                    <ShoppingBag className="h-4 w-4 mr-2"/>
                                                    <span className="hidden sm:inline">Add to Cart</span>
                                                </Button>

                                                <Button
                                                    variant="dark"
                                                    size="icon"
                                                    className="h-9 w-9"
                                                    onClick={() => handleRemoveItem(item.productId)}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </div>
                                        <Separator className="mt-4"/>
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => navigate("/shop")}>
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Continue Shopping
                </Button>
                {items.length > 0 && (
                    <Button onClick={() => navigate("/cart")}>
                        <ShoppingBag className="mr-2 h-4 w-4"/>
                        View Cart
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Wishlist;