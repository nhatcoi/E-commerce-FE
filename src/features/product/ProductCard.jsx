import QuickView from "src/features/product/QuickView.jsx";
import {Link, useNavigate} from 'react-router-dom';
import { toast } from "src/components/ui/use-toast";
import { Heart, Eye, RefreshCw } from "lucide-react";
import { generateSlug } from "src/lib/utils";
import { useProductActions, renderRatingStars } from "./product-hooks.jsx";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ product, rating }) => {
    const navigate = useNavigate();

    // Add fake original price (20% higher than current price)
    const fakeOriginalPrice = Math.round(product.price * 1.57);
    const productWithOriginalPrice = {
        ...product,
        originalPrice: fakeOriginalPrice
    };


    const {
        isInWishlist,
        handleWishlistAction,
    } = useProductActions(product.id);

    const handleProductClick = (e) => {
        e.preventDefault();
        navigate(`/product/${generateSlug(product.name)}`);
    };

    // Calculate discount percentage using fake original price
    const calculateDiscount = () => {
        const discount = ((fakeOriginalPrice - product.price) / fakeOriginalPrice) * 100;
        return Math.round(discount);
    };

    const discountPercentage = calculateDiscount();

    return (
        <div className="group relative overflow-hidden bg-white transition-all duration-300 border-0">
            {/* Discount Label */}
            {discountPercentage && (
                <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full z-[5]">
                    -{discountPercentage}%
                </div>
            )}

            {/* Product Image Container */}
            <div className="relative aspect-square overflow-hidden bg-white cursor-pointer" onClick={handleProductClick}>
                {/* Product Image */}
                <div className="absolute inset-0 z-[1]">
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 ease-out z-[2]" />
            </div>

            {/* Product Info */}
            <div className="p-4 text-center">
                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3 mb-3">
                    {/* Quick View Button */}
                    <QuickView
                        productId={product.id}
                        trigger={
                            <button
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Eye className="w-4 h-4 stroke-gray-600" />
                            </button>
                        }
                    />

                    {/* Heart Button */}
                    <button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleWishlistAction(e);
                        }}
                    >
                        <Heart
                            className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'}`}
                        />
                    </button>

                    {/* Compare Button */}
                    <button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            toast({
                                title: "Compare Feature",
                                description: "Coming soon!",
                                variant: "default"
                            });
                        }}
                    >
                        <RefreshCw className="w-4 h-4 stroke-gray-600" />
                    </button>
                </div>


                <Link
                    to={`/product/${generateSlug(product.name)}`}
                    className="text-base font-medium text-gray-800 hover:text-gray-600 line-clamp-2 mb-3"
                >
                    {product.name}
                </Link>

                {rating && (
                    <div className="flex justify-center items-center gap-1 mb-3">
                        {renderRatingStars(rating)}
                        <span className="text-sm text-gray-500 ml-1">({rating.toFixed(1)})</span>
                    </div>
                )}

                <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-bold text-black">${product.price}</span>
                    <span className="text-sm text-gray-400 line-through">${fakeOriginalPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
