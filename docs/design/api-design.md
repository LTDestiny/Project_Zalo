# API Design - Zola Platform

## Overview

This document outlines the complete REST API design for the Zola Platform. The API follows RESTful principles and is secured using JWT authentication.

**Base URL**: `http://localhost:8080/api`  
**Production URL**: TBD

**Authentication**: JWT Bearer Token (except for public endpoints)  
**Content-Type**: `application/json`  
**Character Encoding**: UTF-8

## API Architecture

### Technology Stack

- **Framework**: Spring Boot 3.4.1
- **Security**: Spring Security with JWT
- **Validation**: Jakarta Bean Validation
- **CORS**: Configured for localhost:3000 (React) and localhost:5173 (Vite)
- **Error Handling**: Global exception handler with structured error responses

### Response Format

#### Success Response

```json
{
  "id": "uuid",
  "field1": "value1",
  "field2": "value2"
}
```

#### Error Response

```json
{
  "timestamp": "2025-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/auth/register"
}
```

### HTTP Status Codes

- `200 OK`: Successful GET, PUT requests
- `201 Created`: Successful POST requests
- `204 No Content`: Successful DELETE requests
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists
- `423 Locked`: Account locked due to failed login attempts
- `500 Internal Server Error`: Server error

---

## Authentication API (`/api/auth`)

### 1. Register User

**Endpoint**: `POST /api/auth/register`

**Access**: Public

**Description**: Creates a new user account and sends email verification.

**Request Body**:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phoneNumber": "+1234567890"
}
```

**Validation**:

- `username`: 3-50 characters, alphanumeric with underscores
- `email`: Valid email format
- `password`: Minimum 8 characters
- `phoneNumber`: Optional, valid phone format

**Success Response** (201 Created):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "email": "john@example.com",
  "emailVerified": false,
  "phoneNumber": "+1234567890",
  "avatarUrl": null,
  "status": "OFFLINE",
  "role": "USER",
  "createdAt": "2025-01-15T10:30:00",
  "lastSeen": null
}
```

**Error Responses**:

- `409 Conflict`: Username or email already exists
- `400 Bad Request`: Invalid request data

---

### 2. Login

**Endpoint**: `POST /api/auth/login`

**Access**: Public

**Description**: Authenticates user and returns access token with refresh token.

**Request Body**:

```json
{
  "username": "john_doe",
  "password": "SecurePass123!"
}
```

**Success Response** (200 OK):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "550e8400-e29b-41d4-a716-446655440001",
  "type": "Bearer",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "USER",
  "expiresIn": 900
}
```

**Token Details**:

- `token`: JWT access token (expires in 15 minutes)
- `refreshToken`: UUID refresh token (expires in 30 days)
- `expiresIn`: Token expiration in seconds

**Error Responses**:

- `401 Unauthorized`: Invalid credentials
- `423 Locked`: Account locked due to failed login attempts (5 attempts → 15 min lock)
- `403 Forbidden`: Email not verified

**Security Features**:

- Failed login attempts counter
- Account lockout after 5 failed attempts (15 minutes)
- Login attempts reset after successful login

---

### 3. Logout

**Endpoint**: `POST /api/auth/logout`

**Access**: Authenticated

**Description**: Invalidates current refresh token and logs out user.

**Request Headers**:

```
Authorization: Bearer <access_token>
```

**Success Response** (200 OK):

```json
{
  "message": "Logged out successfully"
}
```

---

### 4. Get Current User

**Endpoint**: `GET /api/auth/me`

**Access**: Authenticated

**Description**: Retrieves authenticated user's profile information.

**Request Headers**:

```
Authorization: Bearer <access_token>
```

**Success Response** (200 OK):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "email": "john@example.com",
  "emailVerified": true,
  "phoneNumber": "+1234567890",
  "avatarUrl": "https://s3.amazonaws.com/zola-avatars/john_avatar.jpg",
  "status": "ONLINE",
  "role": "USER",
  "createdAt": "2025-01-15T10:30:00",
  "updatedAt": "2025-01-15T11:00:00",
  "lastSeen": "2025-01-15T11:00:00"
}
```

---

### 5. Refresh Access Token

**Endpoint**: `POST /api/auth/refresh-token`

**Access**: Public

**Description**: Generates new access token using refresh token.

**Request Body**:

```json
{
  "refreshToken": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Success Response** (200 OK):

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "550e8400-e29b-41d4-a716-446655440002",
  "tokenType": "Bearer",
  "expiresIn": 900
}
```

**Error Responses**:

- `401 Unauthorized`: Invalid or expired refresh token
- `400 Bad Request`: Missing refresh token

**Notes**:

- Generates new access token (15 min) and refresh token (30 days)
- Old refresh token is invalidated
- Refresh tokens are stored in database

---

### 6. Change Password

**Endpoint**: `POST /api/auth/change-password`

**Access**: Authenticated

**Description**: Changes authenticated user's password.

**Request Headers**:

```
Authorization: Bearer <access_token>
```

**Request Body**:

```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!"
}
```

**Validation**:

- `currentPassword`: Required, must match current password
- `newPassword`: Minimum 8 characters, must be different from current

**Success Response** (200 OK):

```json
{
  "message": "Password changed successfully"
}
```

**Error Responses**:

- `400 Bad Request`: Current password incorrect
- `400 Bad Request`: New password same as current password

**Security Actions**:

- Invalidates all existing refresh tokens
- Requires re-authentication after password change

---

### 7. Forgot Password

**Endpoint**: `POST /api/auth/forgot-password`

**Access**: Public

**Description**: Sends password reset email with token.

**Request Body**:

```json
{
  "email": "john@example.com"
}
```

**Success Response** (200 OK):

```json
{
  "message": "Password reset email sent"
}
```

**Notes**:

- Always returns success (prevents email enumeration)
- Reset token expires in 1 hour
- Email contains reset link: `http://app.zola.com/reset-password?token={token}`

---

### 8. Reset Password

**Endpoint**: `POST /api/auth/reset-password`

**Access**: Public

**Description**: Resets password using reset token from email.

**Request Body**:

```json
{
  "token": "550e8400-e29b-41d4-a716-446655440003",
  "newPassword": "NewSecurePass789!"
}
```

**Validation**:

- `token`: Required, must be valid and not expired
- `newPassword`: Minimum 8 characters

**Success Response** (200 OK):

```json
{
  "message": "Password reset successfully"
}
```

**Error Responses**:

- `400 Bad Request`: Invalid or expired token

**Security Actions**:

- Invalidates reset token after use
- Invalidates all existing refresh tokens
- Resets failed login attempts counter

---

### 9. Verify Email

**Endpoint**: `POST /api/auth/verify-email`

**Access**: Public

**Description**: Verifies user's email address using verification token.

**Request Body**:

```json
{
  "token": "550e8400-e29b-41d4-a716-446655440004"
}
```

**Success Response** (200 OK):

```json
{
  "message": "Email verified successfully"
}
```

**Error Responses**:

- `400 Bad Request`: Invalid or expired token
- `400 Bad Request`: Email already verified

**Notes**:

- Verification token expires in 24 hours
- Sets `email_verified` to true
- Removes verification token from database

---

### 10. Resend Verification Email

**Endpoint**: `POST /api/auth/resend-verification`

**Access**: Public

**Description**: Resends email verification link.

**Request Body**:

```json
{
  "email": "john@example.com"
}
```

**Success Response** (200 OK):

```json
{
  "message": "Verification email sent"
}
```

**Notes**:

- Generates new verification token (old one invalidated)
- Rate limited to prevent abuse (1 per minute per email)

---

## Users API (`/api/users`)

### 1. Get User By ID

**Endpoint**: `GET /api/users/{id}`

**Access**: Authenticated

**Description**: Retrieves user profile by UUID.

**Path Parameters**:

- `id`: User UUID

**Success Response** (200 OK):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "avatarUrl": "https://s3.amazonaws.com/zola-avatars/john_avatar.jpg",
  "status": "ONLINE",
  "role": "USER",
  "createdAt": "2025-01-15T10:30:00",
  "lastSeen": "2025-01-15T11:00:00"
}
```

**Error Responses**:

- `404 Not Found`: User not found

---

### 2. Get User By Username

**Endpoint**: `GET /api/users/username/{username}`

**Access**: Authenticated

**Description**: Retrieves user profile by username.

**Path Parameters**:

- `username`: User's unique username

**Success Response**: Same as Get User By ID (200 OK)

**Error Responses**:

- `404 Not Found`: User not found

---

### 3. Get All Users

**Endpoint**: `GET /api/users`

**Access**: Authenticated

**Description**: Retrieves all users in the system.

**Success Response** (200 OK):

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "email": "john@example.com",
    "status": "ONLINE",
    ...
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "username": "jane_smith",
    "email": "jane@example.com",
    "status": "OFFLINE",
    ...
  }
]
```

**Notes**:

- Consider pagination for large datasets (future enhancement)

---

### 4. Search Users

**Endpoint**: `GET /api/users/search`

**Access**: Authenticated

**Description**: Searches users by username or email.

**Query Parameters**:

- `query` (required): Search term

**Example**: `GET /api/users/search?query=john`

**Success Response** (200 OK):

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "email": "john@example.com",
    "status": "ONLINE",
    ...
  }
]
```

**Notes**:

- Case-insensitive search
- Matches partial usernames and emails
- Returns empty array if no matches

---

### 5. Update Profile

**Endpoint**: `PUT /api/users/{id}/profile`

**Access**: Authenticated (Own profile only)

**Description**: Updates user's profile information.

**Path Parameters**:

- `id`: User UUID

**Request Body**:

```json
{
  "phoneNumber": "+1234567890",
  "avatarUrl": "https://s3.amazonaws.com/zola-avatars/new_avatar.jpg"
}
```

**Validation**:

- Both fields are optional
- `phoneNumber`: Valid phone format
- `avatarUrl`: Valid URL format

**Success Response** (200 OK):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "phoneNumber": "+1234567890",
  "avatarUrl": "https://s3.amazonaws.com/zola-avatars/new_avatar.jpg",
  ...
}
```

**Error Responses**:

- `403 Forbidden`: Attempting to update another user's profile
- `404 Not Found`: User not found

---

### 6. Update Status

**Endpoint**: `PUT /api/users/{id}/status`

**Access**: Authenticated (Own profile only)

**Description**: Updates user's online status.

**Path Parameters**:

- `id`: User UUID

**Query Parameters**:

- `status` (required): New status value

**Status Values**: `ONLINE`, `OFFLINE`, `AWAY`, `DO_NOT_DISTURB`

**Example**: `PUT /api/users/{id}/status?status=AWAY`

**Success Response** (200 OK):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "status": "AWAY",
  "lastSeen": "2025-01-15T11:30:00",
  ...
}
```

**Error Responses**:

- `400 Bad Request`: Invalid status value
- `403 Forbidden`: Attempting to update another user's status

---

### 7. Get Online Users

**Endpoint**: `GET /api/users/online`

**Access**: Authenticated

**Description**: Retrieves all users with ONLINE status.

**Success Response** (200 OK):

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "status": "ONLINE",
    "lastSeen": "2025-01-15T11:30:00",
    ...
  }
]
```

**Notes**:

- Useful for contact lists showing online friends
- Returns empty array if no online users

---

## Data Transfer Objects (DTOs)

### Authentication DTOs

#### RegisterRequest

```java
{
  username: String (3-50 chars, required)
  email: String (valid email, required)
  password: String (8+ chars, required)
  phoneNumber: String (optional)
}
```

#### LoginRequest

```java
{
  username: String (required)
  password: String (required)
}
```

#### LoginResponse

```java
{
  token: String (JWT access token)
  refreshToken: String (UUID)
  type: String (default: "Bearer")
  userId: UUID
  username: String
  email: String
  role: String (USER|ADMIN)
  expiresIn: Long (seconds)
}
```

#### RefreshTokenRequest

```java
{
  refreshToken: String (UUID, required)
}
```

#### TokenRefreshResponse

```java
{
  accessToken: String (JWT)
  refreshToken: String (UUID)
  tokenType: String (default: "Bearer")
  expiresIn: Long (seconds)
}
```

#### ChangePasswordRequest

```java
{
  currentPassword: String (required)
  newPassword: String (8+ chars, required)
}
```

#### ForgotPasswordRequest

```java
{
  email: String (valid email, required)
}
```

#### ResetPasswordRequest

```java
{
  token: String (UUID, required)
  newPassword: String (8+ chars, required)
}
```

#### VerifyEmailRequest

```java
{
  token: String (UUID, required)
}
```

### User DTOs

#### UserDto

```java
{
  id: UUID
  username: String
  email: String
  phoneNumber: String
  avatarUrl: String
  status: Enum (ONLINE|OFFLINE|AWAY|DO_NOT_DISTURB)
  role: Enum (USER|ADMIN)
  createdAt: Timestamp
  updatedAt: Timestamp
  lastSeen: Timestamp
}
```

#### UpdateProfileRequest

```java
{
  phoneNumber: String (optional)
  avatarUrl: String (optional, valid URL)
}
```

---

## Security Implementation

### JWT Token Structure

**Access Token** (Header):

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Access Token** (Payload):

```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "role": "USER",
  "iat": 1705315800,
  "exp": 1705316700
}
```

**Token Configuration**:

- Algorithm: HS256 (HMAC with SHA-256)
- Secret: Configured in `application.yml` (`jwt.secret`)
- Access Token Expiration: 15 minutes (900 seconds)
- Refresh Token Expiration: 30 days (2592000 seconds)

### Authentication Flow

1. **Initial Login**:
   - Client sends credentials to `/api/auth/login`
   - Server validates credentials
   - Server generates access token (15 min) + refresh token (30 days)
   - Server stores refresh token in database
   - Client stores both tokens (access in memory, refresh in secure storage)

2. **API Requests**:
   - Client includes access token in `Authorization: Bearer <token>` header
   - Server validates token signature and expiration
   - If valid, request proceeds; if expired/invalid, returns 401

3. **Token Refresh**:
   - When access token expires, client sends refresh token to `/api/auth/refresh-token`
   - Server validates refresh token from database
   - Server generates new access token + new refresh token
   - Old refresh token is invalidated
   - Client updates stored tokens

4. **Logout**:
   - Client sends `/api/auth/logout` with access token
   - Server invalidates refresh token in database
   - Client clears stored tokens

### CORS Configuration

**Allowed Origins**:

- `http://localhost:3000` (React development)
- `http://localhost:5173` (Vite development)

**Allowed Methods**: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`

**Allowed Headers**: `Authorization`, `Content-Type`

**Max Age**: 3600 seconds

---

## Error Handling

### Global Exception Handler

All API errors follow a consistent structure:

```json
{
  "timestamp": "2025-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Detailed error message",
  "path": "/api/auth/register"
}
```

### Common Error Messages

| Error                 | Status | Message                                              |
| --------------------- | ------ | ---------------------------------------------------- |
| Invalid credentials   | 401    | Invalid username or password                         |
| Account locked        | 423    | Account locked due to too many failed login attempts |
| Email not verified    | 403    | Email verification required                          |
| Token expired         | 401    | Access token has expired                             |
| Refresh token invalid | 401    | Invalid or expired refresh token                     |
| Resource not found    | 404    | User not found                                       |
| Username exists       | 409    | Username already exists                              |
| Email exists          | 409    | Email already exists                                 |
| Validation failed     | 400    | Specific validation error message                    |

---

## Rate Limiting (Future Enhancement)

**Planned Limits**:

- Authentication endpoints: 5 requests/minute per IP
- Email verification resend: 1 request/minute per email
- Password reset: 3 requests/hour per IP
- General API: 100 requests/minute per user

**Implementation**: Spring Rate Limiter (Bucket4j)

---

## API Versioning (Future Enhancement)

**Strategy**: URL Path Versioning

**Format**: `/api/v1/...`, `/api/v2/...`

**Current Version**: v1 (implicit, no version in URL)

---

## Related Documentation

- [Database Schema](./database-schema.md) - Complete database structure
- [Class Diagram](./class-diagram.md) - Entity classes and relationships
- [Authentication API](../AUTHENTICATION_API.md) - Detailed authentication documentation
- [Microservices Migration](../architecture/MICROSERVICES_MIGRATION_PLAN.md) - Future architecture

---

_Last Updated: January 2025_  
_API Version: 1.0_  
_Base URL: http://localhost:8080/api_
