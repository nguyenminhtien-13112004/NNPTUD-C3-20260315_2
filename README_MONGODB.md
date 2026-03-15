# Cấu hình MongoDB Atlas

## Đã cấu hình

Server đã được cấu hình để sử dụng MongoDB Atlas thay vì MongoDB local.

### Files đã cập nhật:

1. **app.js** - Đã cập nhật để:
   - Load environment variables từ file `.env`
   - Kết nối đến MongoDB Atlas thông qua `MONGODB_URI`
   - Có fallback về local MongoDB nếu không có `.env`

2. **package.json** - Đã thêm dependency:
   - `dotenv` - Để load environment variables

3. **.env** - File chứa MongoDB Atlas URI (không được commit vào git)

4. **.env.example** - File mẫu cho MongoDB URI

## MongoDB Atlas URI

```
MONGODB_URI=mongodb+srv://anhkhoanguyenhoang14042004_db_user:r2aMPaqF7CnN7ato@cluster0.hm8luix.mongodb.net/NNPTUD-C3?retryWrites=true&w=majority&appName=Cluster0
DB_TIMEOUT_MS=5000
```

## Cách sử dụng

1. File `.env` đã được tạo tự động với MongoDB Atlas URI
2. Chỉ cần chạy `npm start` - server sẽ tự động kết nối đến MongoDB Atlas
3. Không cần khởi động MongoDB local nữa

## Lưu ý

- File `.env` không được commit vào git (đã có trong `.gitignore`)
- Nếu cần thay đổi MongoDB URI, chỉnh sửa file `.env`
- Đảm bảo có kết nối internet để kết nối đến MongoDB Atlas
