### **📌 Tại sao cần `useFetch` khi đã có Redux?**
Mặc dù Redux Toolkit đã giúp quản lý state toàn cục, nhưng **`useFetch` vẫn hữu ích** trong một số trường hợp. Dưới đây là sự khác biệt giữa hai cách tiếp cận.

---

## **1️⃣ Redux Toolkit dùng khi nào?**
✔ **Quản lý state toàn cục**, dùng chung cho nhiều component.  
✔ **Khi dữ liệu cần caching** để giảm số lần gọi API.  
✔ **Khi có thao tác cập nhật dữ liệu** từ nhiều nơi (giỏ hàng, auth, v.v.).  
✔ **Dùng chung giữa các trang** (ví dụ: danh sách sản phẩm, giỏ hàng).

📌 **Ví dụ dùng Redux Toolkit để lưu danh sách sản phẩm:**
```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await api.get("/products");
    return response.data;
});

const productsSlice = createSlice({
    name: "products",
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.loading = true; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default productsSlice.reducer;
```
**📌 Khi nào dùng Redux Toolkit?**
👉 **Danh sách sản phẩm, giỏ hàng, thông tin người dùng** cần được **lưu lâu dài** và **chia sẻ** giữa nhiều component.

---

## **2️⃣ `useFetch` dùng khi nào?**
✔ **Dữ liệu chỉ cần sử dụng tại một component**.  
✔ **Không cần lưu trữ trong Redux Store** vì nó không dùng chung.  
✔ **Dữ liệu cần tải động nhưng không cần caching toàn cục**.  
✔ **Khi cần tách biệt logic API khỏi component để dễ bảo trì**.

📌 **Ví dụ dùng `useFetch` để lấy chi tiết sản phẩm:**
```javascript
import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Lỗi khi tải dữ liệu");
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};
export default useFetch;
```
📌 **Cách dùng `useFetch` trong một component:**

```javascript
import useFetch from "./useFetch";

const ProductDetail = ({productId}) => {
    const {data: product, loading, error} = useFetch(`/products/${productId}`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>Price: {product.price}$</p>
        </div>
    );
};
```
**📌 Khi nào dùng `useFetch`?**
👉 **Chi tiết sản phẩm, dữ liệu không cần caching** hoặc **không dùng chung** với các component khác.  
👉 **Dữ liệu chỉ dùng trong một component** và **không cần lưu vào Redux**.

---

## **🔥 Kết hợp Redux và useFetch như thế nào?**
Trong **e-commerce**, có thể dùng **cả Redux và `useFetch`**, mỗi cái cho một mục đích khác nhau:
| **Loại dữ liệu**            | **Dùng Redux Toolkit** | **Dùng useFetch** |
|-----------------------------|----------------------|------------------|
| Danh sách sản phẩm          | ✅                    | ❌                |
| Giỏ hàng                    | ✅                    | ❌                |
| Thông tin người dùng        | ✅                    | ❌                |
| Danh sách danh mục          | ✅                    | ❌                |
| Chi tiết sản phẩm (1 item)  | ❌                    | ✅                |
| Dữ liệu tạm thời (UI state) | ❌                    | ✅                |

---

## **📌 Tổng kết**
- **Redux Toolkit**: **Dữ liệu cần lưu trữ, dùng chung, cập nhật từ nhiều nơi** (giỏ hàng, danh sách sản phẩm).
- **useFetch**: **Dữ liệu chỉ dùng trong một component**, không cần lưu trữ toàn cục (chi tiết sản phẩm, dữ liệu tạm thời).
- **Có thể kết hợp cả hai** để tối ưu hiệu suất và code sạch hơn. 🚀