import QuickView from "src/features/product/QuickView.jsx";
import {useDispatch, useSelector} from "react-redux";
import { addToCart } from "src/store/slices/cart/cartSlice.js";
import { addToWishlist, removeFromWishlist } from "src/store/slices/wishlistSlice.js";
import "./ProductCard.css";
import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { toast } from "src/components/ui/use-toast";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ product, rating }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { isAuthenticated } = useSelector(state => state.auth);
    const { items: wishlistItems } = useSelector(state => state.wishlist);
    
    // Check if product is in wishlist by matching productId
    const isInWishlist = wishlistItems?.some(item => item.productId === product.id);

    const handleAddToWishlist = async (e) => {
        e.stopPropagation();
        
        if (!isAuthenticated) {
            navigate("/login", { 
                state: { 
                    from: window.location.pathname, 
                    message: "Please login to add items to your wishlist" 
                } 
            });
            return;
        }
        
        try {
            if (isInWishlist) {
                await dispatch(removeFromWishlist(product.id)).unwrap();
                toast({
                    title: "Removed from Wishlist",
                    description: "Item has been removed from your wishlist",
                    variant: "default"
                });
            } else {
                await dispatch(addToWishlist(product.id)).unwrap();
                toast({
                    title: "Added to Wishlist",
                    description: "Item has been added to your wishlist",
                    variant: "success"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error || "Failed to update wishlist",
                variant: "destructive"
            });
        }
    };

    const handleProductClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        navigate(`/product/${product.id}`); // Programmatic navigation
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fas fa-star ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
                ></i>
            );
        }
        return stars;
    };

    return (
        <div className="product-wrap-2 mb-6 flex flex-col h-full transition-transform duration-300 ease-in-out hover:translate-y-[-5px]">
            <div className="product-img relative overflow-hidden">
                <div
                    onClick={handleProductClick}
                    className="block cursor-pointer"
                >
                    <img
                        className="default-img w-full h-60 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        src={product.thumbnail}
                        alt={product.name}
                    />
                </div>
                <div className="product-action-2 flex gap-2 mt-2">
                    <button 
                        className={`btn-action wishlist ${isInWishlist ? 'active' : ''}`} 
                        onClick={handleAddToWishlist}
                    >
                        <i className={`fas fa-heart ${isInWishlist ? 'text-red-500' : ''}`}></i>
                    </button>

                    <QuickView
                        productId={product.id}
                        trigger={
                            <button className="btn-action quickview">
                                <i className="fas fa-eye"></i>
                            </button>
                        }
                    />

                    <button className="btn-action compare">
                        <i className="fas fa-exchange-alt"></i>
                    </button>
                </div>
            </div>
            <div className="product-content-2 flex flex-col items-center mt-4 text-center">
                <Link 
                    to={`/product/${product.id}`} 
                    className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors"
                >
                    {product.name}
                </Link>

                <div className="rating flex justify-center mt-2">
                    {renderStars(rating)}
                    <span className="ml-2 text-gray-600 text-sm">({rating.toFixed(1)})</span>
                </div>

                <div className="product-price mt-2 text-gray-900 font-bold text-lg">
                    <span className="current-price">${product.price}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
