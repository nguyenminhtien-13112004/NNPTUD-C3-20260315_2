# Hướng dẫn chụp ảnh Postman – Login và /me

Để nộp ảnh chụp màn hình thực hiện **Login** và **Get Current User (/me)** trên Postman, làm theo các bước sau.

## Chuẩn bị

1. Mở Postman.
2. Import collection: **File → Import** → chọn file `NNPTUD-C3-Auth.postman_collection.json`.
3. Đảm bảo server chạy: `npm start` (hoặc `node bin/www`) tại thư mục project.
4. Trong collection, biến `base_url` mặc định là `http://localhost:3000`. Nếu server chạy cổng khác thì sửa lại.

---

## Ảnh 1: Chức năng Login

1. Trong collection **NNPTUD-C3 Authentication API**, chọn request **"1. Login"**.
2. Kiểm tra:
   - Method: **POST**
   - URL: `{{base_url}}/api/v1/auth/login`
   - Body (raw, JSON):  
     `{"username": "testuser", "password": "Test123!@#"}`
3. Nhấn **Send**.
4. Kỳ vọng:
   - Status: **200 OK**
   - Response body: một chuỗi JWT token (RS256).
5. **Chụp màn hình** toàn bộ cửa sổ Postman (hoặc vùng request + response) sao cho thấy rõ:
   - URL, method, body request
   - Status code 200
   - Response là token JWT.

*(Token sẽ được lưu tự động vào biến `jwt_token` nhờ script Test của request Login, để dùng cho request /me.)*

---

## Ảnh 2: Chức năng /me (Get Current User)

1. Sau khi Login thành công (đã có token trong `jwt_token`), chọn request **"2. Get Current User (/me)"**.
2. Kiểm tra:
   - Method: **GET**
   - URL: `{{base_url}}/api/v1/auth/me`
   - Header: **Authorization** = `Bearer {{jwt_token}}`
3. Nhấn **Send**.
4. Kỳ vọng:
   - Status: **200 OK**
   - Response body: thông tin user hiện tại (object/array user từ `req.user`).
5. **Chụp màn hình** sao cho thấy rõ:
   - Header Authorization (Bearer token)
   - URL, method
   - Status code 200
   - Nội dung response (thông tin user).

---

## Ghi chú

- Nếu chưa có user test: chạy `node create-test-user.js` (nếu có) hoặc dùng **Register** trong collection để tạo user, sau đó dùng username/password đó để Login.
- Nếu Login trả 404: kiểm tra lại username/password và xem user đã được tạo trong DB chưa.
- Nếu /me trả 403: kiểm tra đã gửi Login trước và header `Authorization: Bearer <token>` đúng chưa.

Sau khi chụp xong hai ảnh (Login và /me), đặt tên file rõ ràng (ví dụ: `postman-login.png`, `postman-me.png`) và nộp theo yêu cầu bài tập.
