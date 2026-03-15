# Hướng dẫn chụp ảnh màn hình trong Postman

## Cách chụp ảnh màn hình trong Postman

### Phương pháp 1: Sử dụng công cụ chụp màn hình Windows

1. **Snipping Tool** (Windows có sẵn):
   - Nhấn `Windows + Shift + S` để mở Snipping Tool
   - Hoặc tìm "Snipping Tool" trong Start Menu
   - Chọn vùng cần chụp
   - Lưu ảnh (Ctrl + S)

2. **Print Screen**:
   - Nhấn `PrtScn` để chụp toàn màn hình
   - Hoặc `Alt + PrtScn` để chụp cửa sổ hiện tại
   - Dán vào Paint hoặc Word và lưu

### Phương pháp 2: Sử dụng phím tắt Windows 10/11

- `Windows + Shift + S`: Mở công cụ chụp màn hình nhanh
- Chọn vùng cần chụp
- Ảnh sẽ được lưu vào Clipboard, dán vào Paint và lưu

## Những gì cần chụp

### Ảnh 1: Login Request + Response

**Chụp toàn bộ màn hình Postman khi test Login:**

1. Mở request **"1. Login"** trong Postman
2. Click **Send**
3. **Chụp ảnh** sao cho hiển thị:
   - ✅ **Request section** (bên trái/phía trên):
     - Method: POST
     - URL: `http://localhost:3000/api/v1/auth/login`
     - Headers tab (nếu có)
     - **Body tab** với JSON:
       ```json
       {
           "username": "testuser",
           "password": "Test123!@#"
       }
       ```
   - ✅ **Response section** (bên phải/phía dưới):
     - Status: `200 OK` (màu xanh)
     - **Body** hiển thị JWT token (chuỗi dài, bắt đầu bằng `eyJ...`)
     - Time: thời gian response

**Lưu ý:** Đảm bảo ảnh hiển thị rõ:
- URL endpoint
- Body request với username và password
- Response status 200
- JWT token trong response body

### Ảnh 2: /me Request + Response

**Chụp toàn bộ màn hình Postman khi test /me:**

1. Mở request **"2. Get Current User (/me)"** trong Postman
2. Click **Send**
3. **Chụp ảnh** sao cho hiển thị:
   - ✅ **Request section**:
     - Method: GET
     - URL: `http://localhost:3000/api/v1/auth/me`
     - **Headers tab** hiển thị:
       - `Authorization: Bearer <JWT_TOKEN>`
       - (Token sẽ là chuỗi dài)
   - ✅ **Response section**:
     - Status: `200 OK` (màu xanh)
     - **Body** hiển thị thông tin user (JSON):
       ```json
       [
           {
               "_id": "...",
               "username": "testuser",
               "email": "testuser@example.com",
               ...
           }
       ]
       ```
     - Time: thời gian response

**Lưu ý:** Đảm bảo ảnh hiển thị rõ:
- URL endpoint /me
- Header Authorization với Bearer token
- Response status 200
- Thông tin user trong response body

## Cách chụp đẹp nhất

### Option 1: Chụp toàn màn hình Postman
- Mở Postman ở chế độ fullscreen hoặc cửa sổ lớn
- Chụp toàn bộ cửa sổ Postman
- Đảm bảo cả Request và Response đều hiển thị

### Option 2: Chụp từng phần riêng
- Chụp Request section riêng
- Chụp Response section riêng
- Ghép 2 ảnh lại (nếu cần)

### Option 3: Sử dụng Postman's built-in screenshot
- Postman không có tính năng chụp ảnh built-in
- Phải dùng công cụ Windows

## Lưu ý quan trọng

1. **Đảm bảo server đang chạy** trước khi chụp ảnh
2. **Test thành công** (status 200) trước khi chụp
3. **Chụp rõ ràng** - đảm bảo text có thể đọc được
4. **Lưu ảnh** với tên dễ nhớ:
   - `postman_login.png`
   - `postman_me.png`

## Ví dụ layout ảnh cần chụp

```
┌─────────────────────────────────────────┐
│  POSTMAN - Request "1. Login"          │
├─────────────────────────────────────────┤
│  POST  http://localhost:3000/.../login │
│  [Headers] [Body] [Scripts]             │
│                                         │
│  Body (raw JSON):                       │
│  {                                      │
│    "username": "testuser",             │
│    "password": "Test123!@#"            │
│  }                                      │
│                                         │
│  [Send]                                 │
├─────────────────────────────────────────┤
│  Response                               │
│  Status: 200 OK                         │
│  Time: 123ms                            │
│                                         │
│  Body:                                  │
│  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...│
│  (JWT token dài)                        │
└─────────────────────────────────────────┘
```

## Checklist trước khi nộp

- [ ] Ảnh 1: Login request + response (status 200, có JWT token)
- [ ] Ảnh 2: /me request + response (status 200, có thông tin user)
- [ ] Ảnh rõ ràng, text có thể đọc được
- [ ] URL endpoint hiển thị rõ
- [ ] Response body hiển thị đầy đủ
