import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion";

// UI Components
import {Button} from "src/components/ui/button.jsx";
import {Card} from "src/components/ui/card.jsx";
import {Badge} from "src/components/ui/badge.jsx";
import {Separator} from "src/components/ui/separator.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "src/components/ui/tabs.jsx";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "src/components/ui/carousel.jsx";
import {Input} from "src/components/ui/input.jsx";
import {Skeleton} from "src/components/ui/skeleton.jsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select.jsx";

// Icons
import {Star, Minus, Plus, ShoppingCart, Heart, ArrowLeft} from "lucide-react";

// Actions
import {fetchProductById, clearCurrentProduct} from "src/store/slices/product/productsSlice.js";
import {addToCart} from "src/store/slices/cart/cartSlice.js";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {productId} = useParams();

    // Get product data from Redux store
    const {
        currentProduct: product,
        detailLoading: loading,
        detailError: error
    } = useSelector((state) => state.products);

    // State for product options and quantity
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [selectedColor, setSelectedColor] = useState("Natural Titanium");
    const [selectedCapacity, setSelectedCapacity] = useState("256GB");
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isWishlist, setIsWishlist] = useState(false);

    // Available options for legacy products without attributes
    const colors = ["Template"];
    const capacities = ["Template"];

    // Price modifier based on capacity
    const capacityPriceModifier = {
        "Template": 0
    };

    // Fetch product data on component mount
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
        } else {
            navigate("/shop");
        }

        // Cleanup when component unmounts
        return () => {
            dispatch(clearCurrentProduct());
        };
    }, [dispatch, productId, navigate]);

    // Set default selected attributes when product data loads
    useEffect(() => {
        if (product && product.attributes && product.attributes.length > 0) {
            // Group attributes by name and select the first option from each group
            const defaultAttributes = {};
            const attributeGroups = {};

            product.attributes.forEach(attr => {
                if (!attributeGroups[attr.attributeName]) {
                    attributeGroups[attr.attributeName] = [];
                    defaultAttributes[attr.attributeName] = attr;
                }
                attributeGroups[attr.attributeName].push(attr);
            });

            setSelectedAttributes(defaultAttributes);
        }
    }, [product]);

    // Handle attribute selection
    const handleSelectAttribute = (attribute) => {
        setSelectedAttributes(prev => ({
            ...prev,
            [attribute.attributeName]: attribute
        }));
    };

    // Calculate final price based on selection
    const getFinalPrice = () => {
        if (!product) return 0;

        // If no attributes are selected, return the default product price
        if (Object.keys(selectedAttributes).length === 0) {
            return product.price;
        }

        // If attributes are selected, calculate price with selected attributes
        const basePrice = product.price;
        const attributePrices = Object.values(selectedAttributes).map(attr => attr.price);
        return Math.max(...attributePrices);
    };

    const finalPrice = getFinalPrice();

    const handleQuantityChange = (value) => {
        if (!product) return;

        // Get minimum stock from all selected attributes
        let maxStock = product.quantity_in_stock;

        if (Object.keys(selectedAttributes).length > 0) {
            const stocks = Object.values(selectedAttributes).map(attr => attr.stockQuantity);
            maxStock = Math.min(...stocks);
        }

        const newQuantity = Math.max(1, Math.min(maxStock, value));
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        if (!product) return;

        const productToAdd = {
            id: product.id,
            name: product.name,
            price: finalPrice,
            thumbnail: product.thumbnail,
            // Add attribute information if available
            ...(Object.keys(selectedAttributes).length > 0
                    ? {
                        attributes: Object.entries(selectedAttributes).map(([name, attr]) => ({
                            name: attr.attributeName,
                            value: attr.attributeValue
                        }))
                    }
                    : {
                        color: selectedColor,
                        capacity: selectedCapacity
                    }
            ),
            quantity: quantity
        };

        dispatch(addToCart(productToAdd));
    };

    // Convert rating to stars
    const renderRatingStars = (rating) => {
        if (!rating) return null;

        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Star key={i} fill="#FFD700" stroke="#FFD700" size={16}/>);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star size={16} stroke="#FFD700"/>
                        <div className="absolute top-0 left-0 overflow-hidden" style={{width: "50%"}}>
                            <Star size={16} fill="#FFD700" stroke="#FFD700"/>
                        </div>
                    </div>
                );
            } else {
                stars.push(<Star key={i} size={16} stroke="#FFD700"/>);
            }
        }

        return stars;
    };

    // Group attributes by type and render them
    const renderAttributeGroups = () => {
        if (!product || !product.attributes || product.attributes.length === 0) {
            return (
                <>
                    {/* Fallback to static options */}
                    {/* Color Selection */}
                    <div className="space-y-2">
                        <div className="font-medium">Color</div>
                        <div className="flex flex-wrap gap-2">
                            {colors.map((color) => (
                                <Button
                                    key={color}
                                    variant={selectedColor === color ? "default" : "outline"}
                                    onClick={() => setSelectedColor(color)}
                                    className="px-4 py-2 h-auto"
                                >
                                    {color}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Capacity Selection */}
                    <div className="space-y-2">
                        <div className="font-medium">Capacity</div>
                        <div className="flex flex-wrap gap-2">
                            {capacities.map((capacity) => (
                                <Button
                                    key={capacity}
                                    variant={selectedCapacity === capacity ? "default" : "outline"}
                                    onClick={() => setSelectedCapacity(capacity)}
                                    className="px-4 py-2 h-auto"
                                >
                                    {capacity}
                                    {capacity !== "256GB" && (
                                        <span className="ml-1 text-xs">
                      (+${capacityPriceModifier[capacity]})
                    </span>
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>
                </>
            );
        }

        // Group attributes by attributeName
        const attributeGroups = product.attributes.reduce((acc, attr) => {
            if (!acc[attr.attributeName]) {
                acc[attr.attributeName] = [];
            }
            acc[attr.attributeName].push(attr);
            return acc;
        }, {});

        return Object.entries(attributeGroups).map(([groupName, attributes]) => (
            <div key={groupName} className="space-y-2">
                <div className="font-medium">{groupName}</div>
                <div className="flex flex-wrap gap-2">
                    {attributes.map((attr, index) => (
                        <Button
                            key={index}
                            variant={selectedAttributes[groupName]?.attributeValue === attr.attributeValue ? "default" : "outline"}
                            onClick={() => handleSelectAttribute(attr)}
                            className="px-4 py-2 h-auto"
                            disabled={attr.stockQuantity <= 0}
                        >
                            {attr.attributeValue}
                            {attr.price !== product.price && (
                                <span className="ml-1 text-xs">
                  {attr.price > product.price ? '+' : ''}
                                    ${Math.abs(attr.price - product.price).toFixed(2)}
                </span>
                            )}
                        </Button>
                    ))}
                </div>
            </div>
        ));
    };

    // Loading UI
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

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-xl border bg-white">
                        <img
                            src={product.productImages[activeImage] || product.thumbnail}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        {product.productImages.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
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

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

                        <div className="flex items-center gap-4 mt-2">
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

                    <div>
                        <div className="text-3xl font-bold">
                            ${finalPrice.toFixed(2)}
                            {finalPrice !== product.price && (
                                <span className="ml-2 text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
                            )}
                        </div>
                    </div>

                    <Separator/>

                    {/* Dynamic Product Attributes (from API) */}
                    {renderAttributeGroups()}

                    {/* Quantity and Add to Cart */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center border rounded-md">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 rounded-r-none"
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                <Minus size={16}/>
                            </Button>

                            <Input
                                type="number"
                                min="1"
                                max={product.quantity_in_stock}
                                value={quantity}
                                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                className="w-16 h-10 text-center border-0 rounded-none"
                            />

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 rounded-l-none"
                                onClick={() => handleQuantityChange(quantity + 1)}
                                disabled={quantity >= product.quantity_in_stock}
                            >
                                <Plus size={16}/>
                            </Button>
                        </div>

                        <Button
                            className="flex-1 gap-2"
                            onClick={handleAddToCart}
                            disabled={product.quantity_in_stock === 0}
                        >
                            <ShoppingCart size={16}/>
                            Add to Cart
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => setIsWishlist(!isWishlist)}
                        >
                            <Heart
                                size={16}
                                className={isWishlist ? "fill-red-500 text-red-500" : ""}
                            />
                        </Button>
                    </div>

                    {/* Product Tabs */}
                    <Tabs defaultValue="description" className="w-full mt-8">
                        <TabsList className="w-full grid grid-cols-2 h-auto">
                            <TabsTrigger value="description" className="py-3">Description</TabsTrigger>
                            <TabsTrigger value="specifications" className="py-3">Specifications</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-4 text-sm">
                            <Card className="p-4 border-border/40">
                                <p className="whitespace-pre-line">{product.description}</p>
                            </Card>
                        </TabsContent>

                        <TabsContent value="specifications" className="mt-4">
                            <Card className="p-4 border-border/40">
                                <div className="space-y-3 text-sm">
                                    {product.specifications && product.specifications.length > 0 ? (
                                        product.specifications.map((spec, index) => (
                                            <div key={index}
                                                 className="grid grid-cols-2 gap-2 pb-2 border-b border-border/40 last:border-0">
                                                <span className="font-medium">{spec.name}</span>
                                                <span>{spec.value}</span>
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
            </div>
        </div>
    );
};

export default ProductDetails;