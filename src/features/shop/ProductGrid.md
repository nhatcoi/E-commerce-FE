### **Giải thích Code `ProductGrid`**

#### **1. Import các thư viện cần thiết**

```javascript
import {useState} from "react";
import {useSelector} from "react-redux";
import ProductCard from "./ProductCard.jsx";
import {Button, ButtonGroup, MenuItem, Select, CircularProgress, Grid, Typography} from "@mui/material";
import {ViewModule, ViewList} from "@mui/icons-material";
```
- **`useState`**: Quản lý trạng thái cục bộ của component.
- **`useSelector`**: Lấy dữ liệu từ Redux store.
- **`ProductCard`**: Component hiển thị thông tin sản phẩm.
- **Material UI (`@mui/material`)**: Cung cấp UI components như `Button`, `Grid`, `Typography`, v.v.
- **`ViewModule` & `ViewList`**: Icon hiển thị dạng lưới (`grid`) hoặc danh sách (`list`).

---

#### **2. Lấy dữ liệu từ Redux store**
```javascript
const { items: products = [], loading, error } = useSelector((state) => state.products);
```
- **`items: products = []`**: Lấy `items` từ Redux store, nếu `items` không tồn tại thì gán mặc định là `[]` để tránh lỗi `undefined`.

---

#### **3. Quản lý trạng thái với `useState`**
```javascript
const [sortOption, setSortOption] = useState("default");
const [viewType, setViewType] = useState("grid");
```
- **`sortOption`**: Trạng thái lưu lựa chọn sắp xếp sản phẩm (giá tăng dần, giảm dần, mặc định).
- **`viewType`**: Trạng thái hiển thị sản phẩm (`grid` hoặc `list`).

---

#### **4. Xử lý sự kiện thay đổi trạng thái**
```javascript
const handleSortChange = (e) => setSortOption(e.target.value);
const handleViewTypeChange = (view) => setViewType(view);
```
- **`handleSortChange`**: Cập nhật `sortOption` khi người dùng thay đổi kiểu sắp xếp.
- **`handleViewTypeChange`**: Cập nhật `viewType` khi người dùng chọn kiểu hiển thị.

---

#### **5. Sắp xếp sản phẩm theo giá**
```javascript
const sortedProducts = sortOption === "default" ? products : [...products].sort((a, b) => 
    sortOption === "price-asc" ? a.price - b.price : b.price - a.price
);
```
- Nếu `sortOption` là `"default"`, giữ nguyên danh sách sản phẩm.
- Nếu `sortOption` là `"price-asc"`, sắp xếp sản phẩm theo giá tăng dần.
- Nếu `sortOption` là `"price-desc"`, sắp xếp sản phẩm theo giá giảm dần.

---

#### **6. Xử lý trạng thái tải (`loading`) và lỗi (`error`)**
```javascript
if (loading) return <div className="flex justify-center py-6"><CircularProgress /></div>;
if (error) return <Typography variant="body1" className="text-red-500">Lỗi: {error}</Typography>;
```
- Nếu `loading` là `true`, hiển thị vòng tròn tải (`CircularProgress`).
- Nếu có lỗi (`error`), hiển thị thông báo lỗi.

---

#### **7. Giao diện chính của `ProductGrid`**
```javascript
return (
    <div className="w-full px-4 py-6">
        <div className="flex justify-between items-center mb-6">
            <Select value={sortOption} onChange={handleSortChange} className="bg-white shadow-md rounded-md">
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>

            <Typography variant="body1" className="text-gray-700">
                {sortedProducts.length} display products
            </Typography>

            <ButtonGroup>
                {["grid", "list"].map((view) => (
                    <Button
                        key={view}
                        variant={viewType === view ? "contained" : "outlined"}
                        onClick={() => handleViewTypeChange(view)}
                    >
                        {view === "grid" ? <ViewModule /> : <ViewList />}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
```
- **Dropdown `Select`**: Chọn cách sắp xếp sản phẩm.
- **Hiển thị số lượng sản phẩm**.
- **Nhóm nút `ButtonGroup`**: Chọn cách hiển thị (`grid` hoặc `list`).

---

#### **8. Hiển thị danh sách sản phẩm**
```javascript
<Grid container spacing={1}>
    {sortedProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={viewType === "list" ? 12 : 6} md={viewType === "list" ? 12 : 4}>
            <ProductCard product={product} />
        </Grid>
    ))}
</Grid>
```
- **Sử dụng `Grid`** để hiển thị sản phẩm.
- Nếu **dạng danh sách (`list`)**, mỗi sản phẩm chiếm toàn bộ chiều rộng (`xs=12`, `sm=12`, `md=12`).
- Nếu **dạng lưới (`grid`)**, mỗi sản phẩm chiếm:
    - `xs=12` (trên thiết bị nhỏ).
    - `sm=6` (chia làm 2 cột trên thiết bị trung bình).
    - `md=4` (chia làm 3 cột trên thiết bị lớn).

---

### **Kết luận**
✅ **Tối ưu hóa hiệu suất**: Giảm số lần render không cần thiết.  
✅ **Dễ đọc hơn**: Code rõ ràng, tránh lặp code.  
✅ **Dễ mở rộng**: Có thể thêm nhiều tùy chọn sắp xếp hoặc hiển thị khác. 🚀