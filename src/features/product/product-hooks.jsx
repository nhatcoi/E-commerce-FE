import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "src/components/ui/use-toast";
import { addToWishlist, removeFromWishlist, fetchWishlistItems } from "src/store/slices/wishlistSlice.js";
import { addToCart } from "src/store/slices/cart/cartSlice.js";
import { fetchProductById } from "src/store/slices/product/productsSlice.js";
import {Star} from "lucide-react";

export const useProductAttributes = (product) => {
    const [selectedAttributes, setSelectedAttributes] = useState({});

    // Initialize attributes when product loads
    useEffect(() => {
        if (!product?.attributes?.length) return;

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
    }, [product]);

    // Handle attribute selection
    const handleSelectAttribute = (attribute) => {
        setSelectedAttributes(prev => ({
            ...prev,
            [attribute.attributeName]: attribute
        }));
    };

    // Calculate final price with attributes
    const getFinalPrice = () => {
        if (!product) return 0;

        // If no attributes are selected, return default product price
        if (Object.keys(selectedAttributes).length === 0) {
            return product.price;
        }

        // Calculate price with selected attributes
        const basePrice = product.price;
        const attributePrices = Object.values(selectedAttributes).map(attr => attr.price);
        const totalAttributePrice = attributePrices.reduce((acc, price) => acc + price, 0);
        return basePrice + totalAttributePrice;
    };

    // Group attributes by name
    const getAttributeGroups = () => {
        if (!product?.attributes?.length) return {};

        return product.attributes.reduce((acc, attr) => {
            if (!acc[attr.attributeName]) {
                acc[attr.attributeName] = [];
            }
            acc[attr.attributeName].push(attr);
            return acc;
        }, {});
    };

    return {
        selectedAttributes,
        handleSelectAttribute,
        getFinalPrice,
        getAttributeGroups
    };
};

export const useProductActions = (productId) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const { items: wishlistItems } = useSelector(state => state.wishlist);
    const { isAuthenticated } = useSelector(state => state.auth);
    const isInWishlist = wishlistItems?.some(item => Number(item.productId) === Number(productId));

    // Handle quantity changes
    const handleQuantityChange = (value, maxStock) => {
        const newQuantity = Math.max(1, Math.min(maxStock, Number(value) || 1));
        setQuantity(newQuantity);
    };

    // Add to cart
    const handleAddToCart = (product, selectedAttributes) => {
        if (!product) return;

        const productToAdd = {
            product,
            quantity,
            ...(Object.keys(product.attributes || {}).length > 0 ? { selectedAttributes } : {})
        };

        console.log("productToAdd", productToAdd)

        dispatch(addToCart(productToAdd));
    };

    // Add/remove from wishlist
    const handleWishlistAction = async (e, product) => {
        if (e) e.stopPropagation();

        if (!isAuthenticated) {
            navigate("/login", {
                state: {
                    from: `/product/${productId}`,
                    message: "Please login to add items to your wishlist"
                }
            });
            return;
        }

        try {
            if (isInWishlist) {
                await dispatch(removeFromWishlist(productId)).unwrap();
                toast({
                    title: "Removed from Wishlist",
                    description: product?.name ? `${product.name} has been removed from your wishlist` : "Item has been removed from your wishlist",
                    variant: "default"
                });
            } else {
                await dispatch(addToWishlist(productId)).unwrap();
                toast({
                    title: "Added to Wishlist",
                    description: product?.name ? `${product.name} has been added to your wishlist` : "Item has been added to your wishlist",
                    variant: "success"
                });
            }

            dispatch(fetchWishlistItems());
        } catch (error) {
            toast({
                title: "Error",
                description: error || "Failed to update wishlist",
                variant: "destructive"
            });

            dispatch(fetchWishlistItems());
        }
    };

    // Fetch product data
    const fetchProduct = () => {
        dispatch(fetchProductById(productId));
    };

    return {
        quantity,
        setQuantity,
        isInWishlist,
        handleQuantityChange,
        handleAddToCart,
        handleWishlistAction,
        fetchProduct
    };
};

// Helper for rendering rating stars
export const renderRatingStars = (rating) => {
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