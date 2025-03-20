import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, setCart } from "./cartSlice";

export const useSyncCart = (user) => {
    const dispatch = useDispatch();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    useEffect(() => {
        if (user) {
            // Nếu user đã đăng nhập, merge localStorage cart với DB
            fetch("/api/cart/merge", {
                method: "POST",
                body: JSON.stringify(cart),
                headers: { "Content-Type": "application/json" },
            }).then(() => {
                localStorage.removeItem("cart"); // Xóa giỏ hàng cũ trên local
                dispatch(fetchCart()); // Fetch lại giỏ hàng từ API
            });
        }
    }, [user, dispatch]);
};
