# Hướng dẫn sử dụng Postman Collection

## Bước 1: Import Collection vào Postman

1. Mở Postman
2. Click vào **Import** (góc trên bên trái)
3. Chọn file `NNPTUD-C3-Auth.postman_collection.json`
4. Click **Import**

## Bước 2: Thiết lập Environment (Tùy chọn)

1. Click vào **Environments** ở sidebar bên trái
2. Click **+** để tạo environment mới
3. Thêm các biến:
   - `base_url`: `http://localhost:3000`
   - `jwt_token`: (để trống, sẽ tự động điền sau khi login)
4. Chọn environment vừa tạo ở dropdown góc trên bên phải

**Lưu ý:** Collection đã có sẵn variables, bạn có thể dùng trực tiếp mà không cần tạo environment.

## Bước 3: Test Login và chụp ảnh

### 3.1. Test Login

1. Chọn request **"1. Login"** trong collection
2. Cập nhật body với username và password thực tế:
```json
{
    "username": "your_actual_username",
    "password": "your_actual_password"
}
```
3. Đảm bảo server đang chạy (`npm start`)
4. Click **Send**
5. **Chụp ảnh màn hình** hiển thị:
   - Request (method, URL, headers, body)
   - Response (status code, body với JWT token)

### 3.2. Test /me

1. Sau khi login thành công, token sẽ tự động được lưu vào biến `jwt_token`
2. Chọn request **"2. Get Current User (/me)"**
3. Kiểm tra header Authorization đã có token: `Bearer {{jwt_token}}`
4. Click **Send**
5. **Chụp ảnh màn hình** hiển thị:
   - Request (method, URL, headers với Authorization)
   - Response (status code, body với thông tin user)

## Bước 4: Test Change Password (Tùy chọn)

1. Chọn request **"3. Change Password"**
2. Cập nhật body với oldPassword và newPassword:
```json
{
    "oldPassword": "your_old_password",
    "newPassword": "NewPass123!@#"
}
```
3. Click **Send**
4. Kiểm tra response

## Lưu ý quan trọng

- **Server phải đang chạy** trên port 3000
- Nếu token không tự động lưu, bạn có thể:
  1. Copy token từ response của Login
  2. Paste vào biến `jwt_token` trong collection variables
- **newPassword** phải đáp ứng validation:
  - Tối thiểu 8 ký tự
  - Ít nhất 1 chữ hoa
  - Ít nhất 1 chữ thường
  - Ít nhất 1 số
  - Ít nhất 1 ký tự đặc biệt

## Các ảnh cần chụp để nộp

1. **Login Request + Response** - Hiển thị JWT token được trả về
2. **/me Request + Response** - Hiển thị thông tin user
