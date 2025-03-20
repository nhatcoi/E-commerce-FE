import { openDB } from "idb";

// Hàm khởi tạo IndexedDB
export const initDB = async () => {
    return openDB("cartDB", 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("cart")) {
                db.createObjectStore("cart", { keyPath: "id" }); // "id" là khóa chính
            }
        }
    });
};
