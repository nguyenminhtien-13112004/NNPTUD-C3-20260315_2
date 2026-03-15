# Hướng dẫn khởi động server

## Bước 1: Đảm bảo MongoDB đang chạy

Server cần kết nối đến MongoDB tại `mongodb://localhost:27017/NNPTUD-C3`

**Kiểm tra MongoDB:**
- Mở Command Prompt hoặc PowerShell
- Chạy: `mongod --version` để kiểm tra MongoDB đã cài đặt chưa
- Khởi động MongoDB service nếu chưa chạy

## Bước 2: Khởi động Node.js server

Mở terminal trong thư mục project và chạy:

```bash
npm start
```

Hoặc nếu dùng nodemon:

```bash
nodemon ./bin/www
```

## Bước 3: Kiểm tra server đã chạy

Server sẽ chạy trên: `http://localhost:3000`

Bạn sẽ thấy message: `"connected"` trong console khi kết nối MongoDB thành công.

## Bước 4: Test trong Postman

Sau khi server chạy, quay lại Postman và:
1. Click **Send** lại request Login
2. Nếu thành công, bạn sẽ nhận được JWT token
3. Sau đó test request /me

## Lưu ý

- Nếu gặp lỗi `ECONNREFUSED`, đảm bảo:
  - Server đang chạy (check terminal có message "connected")
  - Port 3000 không bị chiếm bởi ứng dụng khác
  - MongoDB service đang chạy
