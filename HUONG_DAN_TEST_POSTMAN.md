# Hướng dẫn Test trong Postman

## Bước 1: Khởi động Server

Mở terminal và chạy:
```bash
npm start
```

Đợi thấy message: `"Connected to MongoDB"`

## Bước 2: Import Collection vào Postman

1. Mở Postman
2. Click **Import** (góc trên bên trái)
3. Chọn file `NNPTUD-C3-Auth.postman_collection.json`
4. Click **Import**

## Bước 3: Test Login

1. Trong Postman, mở collection **"NNPTUD-C3 Authentication API"**
2. Chọn request **"1. Login"**
3. Kiểm tra:
   - Method: **POST**
   - URL: `{{base_url}}/api/v1/auth/login` (sẽ tự động thay thành `http://localhost:3000/api/v1/auth/login`)
   - Body tab: Đã có sẵn:
   ```json
   {
       "username": "testuser",
       "password": "Test123!@#"
   }
   ```
4. Click nút **Send** (màu xanh, góc trên bên phải)
5. **Chụp ảnh màn hình** hiển thị:
   - Request (method, URL, headers, body)
   - Response (status 200, body chứa JWT token)

## Bước 4: Test /me Endpoint

1. Sau khi Login thành công, token sẽ **tự động được lưu**
2. Chọn request **"2. Get Current User (/me)"**
3. Kiểm tra:
   - Method: **GET**
   - URL: `{{base_url}}/api/v1/auth/me`
   - Headers tab: Có header `Authorization: Bearer {{jwt_token}}`
4. Click **Send**
5. **Chụp ảnh màn hình** hiển thị:
   - Request (method, URL, headers với Authorization)
   - Response (status 200, body chứa thông tin user)

## Bước 5: Test Change Password (Tùy chọn)

1. Chọn request **"3. Change Password"**
2. Cập nhật body nếu cần:
   ```json
   {
       "oldPassword": "Test123!@#",
       "newPassword": "NewPass123!@#"
   }
   ```
3. Click **Send**

## Lưu ý quan trọng

✅ **Tài khoản test đã sẵn sàng:**
- Username: `testuser`
- Password: `Test123!@#`

✅ **Token tự động lưu:** Sau khi login thành công, token sẽ tự động được lưu vào biến `jwt_token` và dùng cho request /me

✅ **Nếu token không tự động lưu:**
1. Copy token từ response của Login (chuỗi dài)
2. Click vào collection "NNPTUD-C3 Authentication API"
3. Click tab **Variables**
4. Paste token vào giá trị của biến `jwt_token`
5. Save

## Các ảnh cần chụp để nộp

1. **Login Request + Response** - Hiển thị JWT token được trả về (RS256)
2. **/me Request + Response** - Hiển thị thông tin user

## Troubleshooting

**Lỗi ECONNREFUSED:**
- Kiểm tra server có đang chạy không (`npm start`)
- Kiểm tra port 3000 có bị chiếm không

**Lỗi "thong tin dang nhap khong dung":**
- Kiểm tra username và password trong body có đúng không
- Đảm bảo user đã được tạo trong database (chạy `node create-test-user.js` nếu cần)

**Token không tự động lưu:**
- Xem phần "Lưu ý quan trọng" ở trên
- Hoặc copy token thủ công vào collection variable
