### **Git Conventions (Quy tắc đặt tên và quản lý Git)**
Dưới đây là các quy tắc phổ biến khi làm việc với Git trong dự án phần mềm.

---

## **1. Đặt tên Branch (Branch Naming Conventions)**
Branch nên được đặt theo một cấu trúc nhất định để dễ quản lý.

### **1.1. Loại branch chính:**
- **`main`** hoặc **`master`**: Nhánh chính chứa code production.
- **`develop`**: Nhánh chính dùng để phát triển, merge code từ các nhánh tính năng vào đây trước khi lên production.

### **1.2. Nhánh phát triển (Feature Branches)**
Dựa trên mục đích công việc, branch có thể có tiền tố:
- `feature/<tên-chức-năng>` – Dùng cho tính năng mới.
- `fix/<tên-bug>` – Dùng để sửa lỗi.
- `hotfix/<tên-lỗi>` – Sửa lỗi khẩn cấp trên production.
- `release/<version>` – Dùng để chuẩn bị release một phiên bản mới.

📌 **Ví dụ:**
- `feature/user-authentication`
- `fix/login-bug`
- `hotfix/payment-issue`
- `release/v1.2.0`

---

## **2. Quy tắc đặt tên commit (Commit Message Conventions)**
Format chuẩn:
```bash
<type>(<scope>): <message>
```
- **`type`** – Loại commit:
    - `feat`: Thêm tính năng mới.
    - `fix`: Sửa lỗi.
    - `docs`: Cập nhật tài liệu.
    - `style`: Cải thiện code style (không ảnh hưởng logic).
    - `refactor`: Tái cấu trúc code nhưng không thay đổi chức năng.
    - `test`: Thêm hoặc sửa test case.
    - `chore`: Công việc lặt vặt như cập nhật package, config.

📌 **Ví dụ:**
```bash
feat(auth): add login functionality
fix(cart): fix incorrect price calculation
docs(readme): update installation guide
```

---

## **3. Quy tắc đặt tên tag (Tag Naming Conventions)**
Tag giúp đánh dấu các phiên bản release:
```bash
v<major>.<minor>.<patch>
```
- **Major (`v1.0.0`)** – Khi có thay đổi lớn, không tương thích với bản cũ.
- **Minor (`v1.1.0`)** – Khi thêm tính năng mới nhưng vẫn tương thích.
- **Patch (`v1.1.1`)** – Khi sửa lỗi nhỏ, không ảnh hưởng lớn.

📌 **Ví dụ:**
```bash
v1.0.0
v1.2.3
```

---

## **4. Quy trình làm việc (Git Workflow)**
1. **Tạo branch mới** theo tính năng hoặc bug:
   ```bash
   git checkout -b feature/user-login
   ```
2. **Viết code & commit thường xuyên**:
   ```bash
   git add .
   git commit -m "feat(auth): implement user login"
   ```
3. **Push lên remote**:
   ```bash
   git push origin feature/user-login
   ```
4. **Tạo Pull Request (PR) hoặc Merge Request (MR)** để review.
5. **Merge vào develop/main**, sau đó **xóa branch** nếu không cần nữa.

📌 **Flow chuẩn với Git Flow:**
- `feature/*` → merge vào `develop`
- `hotfix/*` → merge vào `main` (sau đó backport vào `develop`)

---

## **5. Một số lệnh Git hữu ích**
Kiểm tra branch hiện tại:
```bash
git branch
```
Xóa branch đã merge:
```bash
git branch -d feature/old-feature
```
Reset commit gần nhất:
```bash
git reset --soft HEAD~1
```
Hiển thị lịch sử commit:
```bash
git log --oneline --graph --decorate --all
```

---

**Áp dụng những convention trên giúp dự án Git gọn gàng, dễ quản lý và làm việc nhóm hiệu quả hơn. 🚀**