import QuickView from "src/components/ui-custom/QuickView";
import {useDispatch, useSelector} from "react-redux";
import { addToCart } from "src/store/slices/cart/cartSlice";
import "./ProductCard.css";
import {showNotification} from "src/components/ui-custom/notifications.js";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ product, rating }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        dispatch(addToCart({ product: product, quantity: quantity}));
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
                <a href={`/product/${product.id}`} className="block">
                    <img
                        className="default-img w-full h-60 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        src={product.thumbnail}
                        alt={product.name}
                    />
                </a>
                <div className="product-action-2 flex gap-2 mt-2">
                    <button className="btn-action cart" onClick={handleAddToCart}>
                        <i className="fas fa-shopping-cart"></i>
                    </button>

                    <QuickView
                        product={product}
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
                <a href={`/product/${product.id}`} className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                    {product.name}
                </a>

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
