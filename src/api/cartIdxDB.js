// src/api/cartIdxDB.js
import { initDB } from "./indexedDB.js";

// Thêm sản phẩm vào giỏ hàng
export const addToIndexedDB = async (item) => {
    const db = await initDB();
    const tx = db.transaction("cart", "readwrite");
    await tx.store.put(item);
    await tx.done;
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromIndexedDB = async (id) => {
    const db = await initDB();
    const tx = db.transaction("cart", "readwrite");
    await tx.store.delete(id);
    await tx.done;
};

// Lấy toàn bộ giỏ hàng
export const getCartFromIndexedDB = async () => {
    const db = await initDB();
    return db.getAll("cart");
};

// Xóa toàn bộ giỏ hàng
export const clearIndexedDB = async () => {
    const db = await initDB();
    const tx = db.transaction("cart", "readwrite");
    await tx.store.clear();
    await tx.done;
};
