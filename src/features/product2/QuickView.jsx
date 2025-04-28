import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Badge } from "src/components/ui/badge.jsx";
import { CheckCircle2, Heart, Loader2, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import {cn, generateSlug} from "src/lib/utils.js";
import { clearCurrentProduct } from "src/store/slices/product/productsSlice.js";
import { useProductAttributes, useProductActions, renderRatingStars } from "./product-hooks.jsx";
import {useGetProductByIdQuery} from "src/features/product/services/productApi.js";

// eslint-disable-next-line react/prop-types
const QuickView = ({ productId, trigger }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const { data, isLoading: loading, error } = useGetProductByIdQuery(productId, {
        skip: !isOpen, // Skip the query when dialog is closed
    });

    const product = data?.data;

    // Custom hooks
    const {
        selectedAttributes,
        handleSelectAttribute,
        getFinalPrice,
        getAttributeGroups
    } = useProductAttributes(product);

    const {
        isInWishlist,
        handleAddToCart,
        handleWishlistAction,
    } = useProductActions(productId);

    const finalPrice = getFinalPrice();

    useEffect(() => {
        if (isOpen) {
            setActiveImage(0);
        }
        return () => {
            if (!isOpen) {
                dispatch(clearCurrentProduct());
            }
        };
    }, [isOpen, productId, dispatch]);
    
    const handleOpenChange = (open) => {
        setIsOpen(open);
    };

    // Render attribute groups
    const renderAttributeGroups = () => {
        const attributeGroups = getAttributeGroups();

        return Object.entries(attributeGroups).map(([groupName, attributes]) => (
            <div key={groupName} className="space-y-2">
                <div className="font-medium text-sm">{groupName}</div>
                <div className="flex flex-wrap gap-2">
                    {attributes.map((attr, index) => (
                        <Button
                            key={index}
                            variant={selectedAttributes[groupName]?.attributeValue === attr.attributeValue ? "default" : "outline"}
                            onClick={() => handleSelectAttribute(attr)}
                            className={cn(
                                "px-3 py-1 h-auto text-xs relative",
                                attr.stockQuantity <= 0 && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={attr.stockQuantity <= 0}
                        >
                            {attr.attributeValue}
                            {attr.price !== product.price && (
                                <span className="ml-1 text-xs">
                  {attr.price > product.price ? '+' : ''}
                                    ${Math.abs(attr.price + product.price).toFixed(2)}
                </span>
                            )}
                            {attr.stockQuantity <= 0 && (
                                <span className="absolute -top-1 -right-1 text-red-500">
                  <CheckCircle2 size={12}/>
                </span>
                            )}
                        </Button>
                    ))}
                </div>
            </div>
        ));
    };

    // Render dialog content based on state
    const renderDialogContent = () => {
        if (error) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-red-100 p-4 mb-4">
                        <CheckCircle2 className="h-8 w-8 text-red-500"/>
                    </div>
                    <p className="text-red-500 text-lg font-medium">Error loading product details</p>
                    <Button variant="outline" onClick={() => handleOpenChange(false)} className="mt-6">
                        Close
                    </Button>
                </div>
            );
        }

        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4"/>
                    <p className="text-muted-foreground">Loading product details...</p>
                </div>
            );
        }

        if (!product) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground"/>
                    </div>
                    <p className="text-muted-foreground text-lg">No product details available</p>
                    <Button variant="outline" onClick={() => handleOpenChange(false)} className="mt-6">
                        Close
                    </Button>
                </div>
            );
        }

        const maxStock = product.quantity_in_stock;

        return (
            <>
                <div className="grid grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <img
                                src={product.productImages?.[activeImage] || product.thumbnail}
                                alt={product.name}
                                className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        {product.productImages && product.productImages.length > 0 && (
                            <div className="grid grid-cols-4 gap-3">
                                {product.productImages.map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveImage(index)}
                                        className={cn(
                                            "aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-md",
                                            activeImage === index
                                                ? "border-primary ring-2 ring-primary/20 scale-105"
                                                : "border-border hover:border-primary/50"
                                        )}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold tracking-tight">{product.name}</h3>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center bg-primary/5 px-3 py-1 rounded-full">
                                    {renderRatingStars(product.avgRating)}
                                    <span className="ml-2 text-sm font-medium text-primary">
                    ({product.avgRating?.toFixed(1) || "N/A"})
                    </span>
                                </div>
                                <Badge
                                    variant={product.quantity_in_stock > 0 ? "default" : "destructive"}
                                    className="font-normal px-3 py-1"
                                >
                                    {product.quantity_in_stock > 0 ? "In Stock" : "Out of Stock"}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold text-primary">
                                    ${finalPrice.toFixed(2)}
                                </div>
                                {finalPrice !== product.price && (
                                    <span className="text-sm text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                    </span>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "rounded-full hover:bg-primary/10 transition-colors",
                                    isInWishlist && "text-red-500 hover:text-red-600"
                                )}
                                onClick={(e) => handleWishlistAction(e, product)}
                            >
                                <Heart className={cn("h-5 w-5", isInWishlist && "fill-current")}/>
                            </Button>
                        </div>

                        {/* Product Attributes */}
                        <div className="space-y-4">
                            {renderAttributeGroups()}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 pt-2">
                            <Button
                                className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-[1.02]"
                                disabled={maxStock <= 0}
                                onClick={() => handleAddToCart(product, selectedAttributes)}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5"/>
                                Add to Cart
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/product/${generateSlug(product.name)}`)}
                                className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-[1.02]"
                            >
                                <ShoppingBag className="mr-2 h-5 w-5"/>
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-6">
                <DialogHeader className="pb-4">
                    <DialogTitle className="text-2xl font-bold tracking-tight">Quick View</DialogTitle>
                </DialogHeader>
                {renderDialogContent()}
            </DialogContent>
        </Dialog>
    );
};

export default QuickView;