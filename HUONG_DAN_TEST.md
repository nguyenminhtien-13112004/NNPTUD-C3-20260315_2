# Hướng dẫn test API endpoints

## 1. Test Login endpoint

**Method:** POST  
**URL:** `http://localhost:3000/api/v1/auth/login`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response thành công:** Trả về JWT token (RS256)

**Response thất bại:** 
```
Status: 404
Body: "thong tin dang nhap khong dung"
```

## 2. Test /me endpoint

**Method:** GET  
**URL:** `http://localhost:3000/api/v1/auth/me`  
**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response thành công:** Trả về thông tin user

**Response thất bại:**
```
Status: 403
Body: { "message": "ban chua dang nhap" }
```

## 3. Test ChangePassword endpoint

**Method:** POST  
**URL:** `http://localhost:3000/api/v1/auth/changepassword`  
**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "oldPassword": "OldPass123!@#",
  "newPassword": "NewPass123!@#"
}
```

**Validation cho newPassword:**
- Tối thiểu 8 ký tự
- Ít nhất 1 chữ hoa
- Ít nhất 1 chữ thường
- Ít nhất 1 số
- Ít nhất 1 ký tự đặc biệt

**Response thành công:**
```json
{
  "message": "Password changed successfully"
}
```

**Response thất bại:**
```json
{
  "message": "Old password is incorrect"
}
```
hoặc
```json
{
  "message": "newPassword phai co it nhat 8 ki tu trong do co it nhat 1 ki tu chu hoa, 1 ki tu chu thuong,1 ki tu so va 1 ki tu dac biet"
}
```

## Lưu ý về JWT

- JWT hiện tại sử dụng thuật toán **RS256** với key 2048-bit
- Private key: `private.pem` (dùng để ký token)
- Public key: `public.pem` (dùng để verify token)
