# Tài khoản Test

## Thông tin đăng nhập

Đã tạo sẵn một tài khoản test trong database:

```
Username: testuser
Password: Test123!@#
Email: testuser@example.com
```

## Cách sử dụng trong Postman

1. Mở request **"1. Login"** trong Postman collection
2. Body đã được điền sẵn với thông tin trên
3. Click **Send** để đăng nhập
4. Bạn sẽ nhận được JWT token (RS256)

## Tạo tài khoản mới

Nếu muốn tạo tài khoản mới, bạn có thể:

### Cách 1: Dùng script
```bash
node create-test-user.js
```

### Cách 2: Dùng endpoint /register trong Postman
- Method: POST
- URL: `{{base_url}}/api/v1/auth/register`
- Body:
```json
{
    "username": "newuser",
    "password": "NewPass123!@#",
    "email": "newuser@example.com"
}
```

**Lưu ý:** Password phải đáp ứng:
- Tối thiểu 8 ký tự
- Ít nhất 1 chữ hoa
- Ít nhất 1 chữ thường
- Ít nhất 1 số
- Ít nhất 1 ký tự đặc biệt
