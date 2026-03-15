# Tóm tắt các thay đổi

## 1. Hàm ChangePassword
- **File:** `routes/auth.js`, `controllers/users.js`, `utils/validator.js`
- **Endpoint:** `POST /api/v1/auth/changepassword`
- **Yêu cầu:** Đăng nhập (cần JWT token trong header)
- **Body:**
  - `oldPassword`: Mật khẩu cũ
  - `newPassword`: Mật khẩu mới (có validation)
- **Validation cho newPassword:**
  - Tối thiểu 8 ký tự
  - Ít nhất 1 chữ hoa
  - Ít nhất 1 chữ thường
  - Ít nhất 1 số
  - Ít nhất 1 ký tự đặc biệt

## 2. Chuyển JWT sang RS256
- **Thuật toán:** HS256 → RS256
- **Key size:** 2048-bit
- **Files:**
  - `private.pem`: Private key để ký JWT token
  - `public.pem`: Public key để verify JWT token
- **Files đã cập nhật:**
  - `controllers/users.js`: Sử dụng private key để ký token
  - `utils/authHandler.js`: Sử dụng public key để verify token

## 3. Cách test trong Postman

### Test Login:
1. Method: POST
2. URL: `http://localhost:3000/api/v1/auth/login`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "username": "your_username",
  "password": "your_password"
}
```
5. Chụp ảnh response (JWT token)

### Test /me:
1. Method: GET
2. URL: `http://localhost:3000/api/v1/auth/me`
3. Headers: 
   - `Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>`
4. Chụp ảnh response (thông tin user)

## Files cần nộp:
1. `private.pem` - Private key (2048-bit RSA)
2. `public.pem` - Public key (2048-bit RSA)
3. Hình ảnh chụp màn hình Postman cho login và /me endpoint
