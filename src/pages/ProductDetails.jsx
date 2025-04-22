import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Button } from "src/components/ui/button.jsx";
import { Card } from "src/components/ui/card.jsx";
import { Badge } from "src/components/ui/badge.jsx";
import { Separator } from "src/components/ui/separator.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs.jsx";
import { Skeleton } from "src/components/ui/skeleton.jsx";
import {
    Minus,
    Plus,
    ShoppingCart,
    Heart,
    ArrowLeft,
    CheckCircle2,
    Star,
    Facebook,
    Twitter,
    Linkedin, Link as LinkIcon
} from "lucide-react";
import { clearCurrentProduct } from "src/store/slices/product/productsSlice.js";
import { cn } from "src/lib/utils.js";
import { useProductAttributes, useProductActions, renderRatingStars } from "../features/product/product-hooks.jsx";
import CarouselProduct from '../features/product/CarouselProduct.jsx';
import {useGetProductBySlugQuery} from "src/store/productApi.js";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();

    const [activeImage, setActiveImage] = useState(0);
    const { data, loading, error } = useGetProductBySlugQuery(slug);
    const product = data?.data;


    const {
        selectedAttributes,
        handleSelectAttribute,
        getFinalPrice,
        getAttributeGroups
    } = useProductAttributes(product || {});

    const {
        quantity,
        isInWishlist,
        handleQuantityChange,
        handleAddToCart,
        handleWishlistAction,

    } = useProductActions(product?.id);


    const finalPrice = product ? getFinalPrice() : 0;

    if (loading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-xl"/>
                        <div className="grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="aspect-square rounded-md"/>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-10 w-3/4"/>
                        <Skeleton className="h-6 w-1/3"/>
                        <Skeleton className="h-10 w-1/4"/>
                        <Skeleton className="h-px w-full"/>
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-24"/>
                            <div className="flex gap-2">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-10 w-28"/>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-32"/>
                            <Skeleton className="h-12 flex-1"/>
                            <Skeleton className="h-12 w-12"/>
                        </div>
                        <Skeleton className="h-64 w-full"/>
                    </div>
                </div>
            </div>
        );
    }

    // Error UI
    if (error || !product) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <p className="text-muted-foreground mb-8">
                        {error || "Sorry, we couldn't find the product you're looking for."}
                    </p>
                    <Button onClick={() => navigate("/shop")}>
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to Shop
                    </Button>
                </div>
            </div>
        );
    }

    // Calculate max stock based on selected attributes
    const getMaxStock = () => {
        if (!product) return 0;

        if (Object.keys(selectedAttributes).length > 0) {
            const selectedAttributeStocks = Object.values(selectedAttributes).map(attr => attr.stockQuantity);
            return Math.min(...selectedAttributeStocks);
        }

        return product.quantity_in_stock;
    };

    const maxStock = getMaxStock();

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


    return (
        <div className="container mx-auto py-8 px-4">
            {/* Back Button */}
            <Button
                variant="ghost"
                className="mb-6"
                onClick={() => navigate("/shop")}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images Section */}
                <div className="space-y-6">
                    <div className="aspect-square overflow-hidden rounded-xl border bg-white shadow-sm">
                        <img
                            src={product.productImages[activeImage] || product.thumbnail}
                            alt={product.name}
                            className="w-full h-full object-contain p-4"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {product.productImages.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all hover:border-primary ${
                                    activeImage === index ? "border-primary ring-2 ring-primary/20" : "border-border"
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`${product.name} view ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center">
                                    {renderRatingStars(product.avgRating)}
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        ({product.avgRating?.toFixed(1) || "N/A"})
                                    </span>
                                </div>
                                <Badge variant="outline" className="font-normal">
                                    {product.quantity_in_stock > 0 ? "In Stock" : "Out of Stock"}
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-primary">
                                ${finalPrice.toFixed(2)}
                            </div>
                            {finalPrice !== product.price && (
                                <span className="text-lg text-muted-foreground line-through">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Dynamic Product Attributes */}
                    <div className="space-y-6">
                        {renderAttributeGroups()}
                    </div>

                    {/* Share Buttons */}
                    <div className="flex items-center space-x-4 mb-12">
                        <span className="text-sm font-medium">Share:</span>
                        <Button size="icon" variant="outline">
                            <Facebook className="h-4 w-4"/>
                        </Button>
                        <Button size="icon" variant="outline">
                            <Twitter className="h-4 w-4"/>
                        </Button>
                        <Button size="icon" variant="outline">
                            <Linkedin className="h-4 w-4"/>
                        </Button>
                        <Button size="icon" variant="outline">
                            <LinkIcon className="h-4 w-4"/>
                        </Button>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center border rounded-lg">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 rounded-r-none"
                                onClick={() => handleQuantityChange(quantity - 1, maxStock)}
                                disabled={quantity <= 1}
                            >
                                <Minus size={16} />
                            </Button>

                            <div className="w-16 h-12 flex items-center justify-center border-x">
                                <span className="text-base font-medium">{quantity}</span>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 rounded-l-none"
                                onClick={() => handleQuantityChange(quantity + 1, maxStock)}
                                disabled={quantity >= maxStock}
                            >
                                <Plus size={16} />
                            </Button>
                        </div>

                        <Button
                            className="flex-1 h-12 gap-2"
                            onClick={() => handleAddToCart(product, selectedAttributes)}
                            disabled={maxStock === 0}
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-12 w-12 rounded-full hover:bg-primary/10 transition-colors",
                                isInWishlist && "text-red-500 hover:text-red-600"
                            )}
                            onClick={(e) => handleWishlistAction(e, product)}
                        >
                            <Heart className={cn("h-5 w-5", isInWishlist && "fill-current")} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="mt-16">
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 h-auto mb-8">
                        <TabsTrigger value="description" className="py-3 text-base">Description</TabsTrigger>
                        <TabsTrigger value="specifications" className="py-3 text-base">Specifications</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-4">
                        <Card className="p-6 border-border/40">
                            <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                            <div className="prose prose-sm max-w-none text-muted-foreground">
                                <ReactMarkdown
                                    components={{
                                        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                        a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                                        em: ({ node, ...props }) => <em className="italic" {...props} />,
                                        code: ({ node, ...props }) => <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} />,
                                        pre: ({ node, ...props }) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
                                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-muted-foreground pl-4 italic mb-4" {...props} />,
                                        img: ({ node, ...props }) => <img className="rounded-lg my-4" {...props} />,
                                    }}
                                >
                                    {product.description}
                                </ReactMarkdown>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="specifications" className="mt-4">
                        <Card className="p-6 border-border/40">
                            <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                            <div className="space-y-4">
                                {product.specifications && product.specifications.length > 0 ? (
                                    product.specifications.map((spec, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-b border-border/40 last:border-0"
                                        >
                                            <span className="font-medium text-muted-foreground">{spec.name}</span>
                                            <span className="text-foreground">{spec.value}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-muted-foreground">
                                        No specifications available for this product.
                                    </div>
                                )}
                            </div>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
            <CarouselProduct
                category={product.category_id}
                productId={product.id}
            />

        </div>
    );
};

export default ProductDetails;