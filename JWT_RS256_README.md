# JWT với thuật toán RS256 (khóa 2048 bit)

## Giới thiệu

Dự án dùng **JWT ký bằng thuật toán RS256** với cặp khóa **RSA 2048 bit**:

- **RS256**: Ký bằng private key, xác thực bằng public key. Phù hợp cho server-only ký token, client hoặc service khác chỉ cần public key để verify.
- **2048 bit**: Độ dài modulus RSA (modulusLength). Khuyến nghị tối thiểu cho RS256.

## Cách hoạt động trong code

| Vị trí | File | Vai trò |
|--------|------|--------|
| Ký token (Login) | `controllers/users.js` | Đọc `private.pem`, dùng `jwt.sign(..., privateKey, { algorithm: 'RS256' })` |
| Xác thực token | `utils/authHandler.js` | Đọc `public.pem`, dùng `jwt.verify(token, publicKey, { algorithms: ['RS256'] })` |

## Tạo cặp khóa RSA 2048 bit

Lần đầu setup hoặc khi cần tạo lại khóa:

```bash
node generate-keys.js
```

Script sẽ tạo:

- **private.pem** – dùng để ký JWT (giữ bí mật, đã thêm vào `.gitignore`).
- **public.pem** – dùng để verify JWT (có thể đặt ở server hoặc phân phối cho service cần verify).

**Lưu ý:** Nếu thiếu `private.pem` hoặc `public.pem`, server sẽ báo lỗi và gợi ý chạy `node generate-keys.js`.

## So sánh nhanh HS256 vs RS256

- **HS256**: Dùng một secret chung để cả ký và verify. Secret phải được chia sẻ cho mọi nơi cần verify.
- **RS256**: Dùng private key để ký, public key để verify. Chỉ server giữ private key; public key có thể công khai, phù hợp cho nhiều service verify token mà không cần biết secret.

Dự án này đã chuyển sang **RS256 với khóa 2048 bit** như trên.
