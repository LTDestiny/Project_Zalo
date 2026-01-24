# Authentication API Documentation

## Tổng quan

Hệ thống authentication toàn diện với JWT, hỗ trợ refresh token, email verification, password reset, và account lockout.

## Base URL

```
http://localhost:8080/api
```

## Authentication Endpoints

### 1. Register (Đăng ký)

```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "+84123456789"
}
```

**Response:**

```json
{
  "id": "uuid",
  "username": "john_doe",
  "email": "john@example.com",
  "phoneNumber": "+84123456789",
  "status": "OFFLINE",
  "role": "USER",
  "createdAt": "2026-01-24T09:00:00",
  "lastSeen": null
}
```

**Note:** Email verification token sẽ được gửi qua email (TODO: implement email service)

---

### 2. Login (Đăng nhập)

```http
POST /auth/login
Content-Type: application/json

{
  "usernameOrEmail": "john_doe",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "john_doe",
    "email": "john@example.com",
    "status": "ONLINE",
    "role": "USER"
  }
}
```

**Errors:**

- `401 Unauthorized`: Sai username/password
- `401 Unauthorized`: Account is locked (sau 5 lần đăng nhập sai, khóa 30 phút)

---

### 3. Logout (Đăng xuất)

```http
POST /auth/logout
Authorization: Bearer <access_token>
```

**Response:**

```
200 OK
```

---

### 4. Get Current User (Lấy thông tin user hiện tại)

```http
GET /auth/me
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "id": "uuid",
  "username": "john_doe",
  "email": "john@example.com",
  "phoneNumber": "+84123456789",
  "status": "ONLINE",
  "role": "USER",
  "createdAt": "2026-01-24T09:00:00",
  "lastSeen": "2026-01-24T09:30:00"
}
```

---

### 5. Refresh Token (Gia hạn token)

```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "accessToken": "new_access_token...",
  "refreshToken": "new_refresh_token...",
  "tokenType": "Bearer"
}
```

**Note:** Refresh token có thời hạn 30 ngày, access token có thời hạn ngắn hơn

---

### 6. Change Password (Đổi mật khẩu)

```http
POST /auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newPassword456",
  "confirmPassword": "newPassword456"
}
```

**Response:**

```json
{
  "message": "Password changed successfully"
}
```

**Errors:**

- `401 Unauthorized`: Current password is incorrect
- `400 Bad Request`: Passwords do not match

---

### 7. Forgot Password (Quên mật khẩu)

```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "Password reset email sent"
}
```

**Note:** Reset token (valid 1 hour) sẽ được gửi qua email (TODO: implement email service)

---

### 8. Reset Password (Reset mật khẩu với token)

```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "newPassword456",
  "confirmPassword": "newPassword456"
}
```

**Response:**

```json
{
  "message": "Password reset successfully"
}
```

**Errors:**

- `400 Bad Request`: Invalid reset token
- `400 Bad Request`: Reset token has expired
- `400 Bad Request`: Passwords do not match

---

### 9. Verify Email (Xác thực email)

```http
POST /auth/verify-email
Content-Type: application/json

{
  "token": "verification-token-from-email"
}
```

**Response:**

```json
{
  "message": "Email verified successfully"
}
```

**Errors:**

- `400 Bad Request`: Invalid verification token
- `400 Bad Request`: Verification token has expired

---

### 10. Resend Verification Email (Gửi lại email xác thực)

```http
POST /auth/resend-verification?email=john@example.com
```

**Response:**

```json
{
  "message": "Verification email sent"
}
```

**Errors:**

- `400 Bad Request`: Email not found
- `400 Bad Request`: Email already verified

---

## Security Features

### 1. Account Lockout

- Sau **5 lần** đăng nhập sai, tài khoản sẽ bị khóa
- Thời gian khóa: **30 phút**
- Có thể config trong `application.yml`:
  ```yaml
  auth:
    max-login-attempts: 5
    lock-duration-minutes: 30
  ```

### 2. Token Expiration

- **Access Token**: Thời hạn ngắn (mặc định trong `application.yml`)
- **Refresh Token**: 30 ngày
- **Reset Token**: 1 giờ
- **Verification Token**: 24 giờ

### 3. Password Requirements

- Minimum length: 6 characters
- Maximum length: 50 characters
- Được hash với BCrypt

### 4. Email Verification

- User mới đăng ký sẽ có `emailVerified = false`
- Cần verify email trước khi sử dụng các chức năng (có thể implement check này sau)

---

## Configuration

### application.yml

```yaml
jwt:
  secret: your-secret-key-here
  expiration-ms: 86400000 # 24 hours
  refresh-expiration-ms: 2592000000 # 30 days

auth:
  max-login-attempts: 5
  lock-duration-minutes: 30
```

---

## Database Schema Changes

Migration V3 đã thêm các cột sau vào bảng `users`:

- `email_verified` (boolean)
- `verification_token` (varchar 500)
- `verification_token_expiry` (timestamp)
- `reset_token` (varchar 500)
- `reset_token_expiry` (timestamp)
- `refresh_token` (varchar 500)
- `refresh_token_expiry` (timestamp)
- `login_attempts` (integer)
- `locked_until` (timestamp)

---

## TODO

1. **Email Service Integration**
   - Gửi verification email khi đăng ký
   - Gửi reset password email
   - Có thể dùng: AWS SES, SendGrid, hoặc SMTP

2. **Rate Limiting**
   - Giới hạn số lần request để tránh brute force attack

3. **Two-Factor Authentication (2FA)**
   - SMS OTP
   - Google Authenticator

4. **Session Management**
   - Track active sessions
   - Logout from all devices

5. **Password Strength Validation**
   - Require uppercase, lowercase, numbers, special characters

---

## Error Responses

Tất cả errors đều trả về format:

```json
{
  "timestamp": "2026-01-24T09:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email already exists",
  "path": "/api/auth/register"
}
```

Common status codes:

- `200 OK`: Success
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Access denied
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Testing với cURL

### Register

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "phoneNumber": "+84123456789"
  }'
```

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

### Get Current User

```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Change Password

```bash
curl -X POST http://localhost:8080/api/auth/change-password \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "password123",
    "newPassword": "newPassword456",
    "confirmPassword": "newPassword456"
  }'
```
