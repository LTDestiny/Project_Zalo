# API Design Documentation

## Base URL
```
Production: https://api.zola-platform.com/api
Development: http://localhost:8080/api
```

## Authentication

All protected endpoints require JWT Bearer token:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string" (optional)
}
```

**Response (201 Created):**
```json
{
  "token": "string",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "status": "OFFLINE",
    "createdAt": "timestamp"
  }
}
```

#### POST /auth/login
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "usernameOrEmail": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "token": "string",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "status": "ONLINE",
    "lastSeen": "timestamp"
  }
}
```

### Users

#### GET /users/{id}
Get user by ID.

**Response (200 OK):**
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "phoneNumber": "string",
  "avatarUrl": "string",
  "status": "ONLINE",
  "createdAt": "timestamp",
  "lastSeen": "timestamp"
}
```

#### PUT /users/{id}/profile
Update user profile.

**Query Parameters:**
- phoneNumber (optional)
- avatarUrl (optional)

**Response (200 OK):** Updated User object

#### PUT /users/{id}/status
Update user status.

**Request Body:**
```json
{
  "status": "ONLINE|OFFLINE|AWAY|DO_NOT_DISTURB"
}
```

### Messages

#### POST /messages
Send a new message.

**Request Body:**
```json
{
  "conversationId": "string",
  "type": "TEXT|IMAGE|VIDEO|DOCUMENT",
  "content": "string",
  "mediaUrl": "string" (optional),
  "replyToMessageId": "string" (optional)
}
```

**Response (201 Created):**
```json
{
  "messageId": "string",
  "conversationId": "string",
  "senderId": "string",
  "type": "TEXT",
  "content": "string",
  "timestamp": 1234567890,
  "status": "SENT",
  "readBy": []
}
```

#### GET /messages/conversation/{conversationId}
Get messages for a conversation.

**Query Parameters:**
- limit (default: 50)

**Response (200 OK):**
```json
[
  {
    "messageId": "string",
    "conversationId": "string",
    "senderId": "string",
    "type": "TEXT",
    "content": "string",
    "timestamp": 1234567890,
    "status": "READ",
    "readBy": ["userId1", "userId2"]
  }
]
```

### Groups

#### POST /groups
Create a new group.

**Request Body:**
```json
{
  "name": "string",
  "description": "string" (optional),
  "type": "PRIVATE|PUBLIC",
  "memberIds": ["uuid"] (optional)
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "createdBy": "uuid",
  "type": "PRIVATE",
  "createdAt": "timestamp",
  "memberCount": 1
}
```

#### GET /groups/{id}
Get group details.

#### GET /groups/user/{userId}
Get all groups for a user.

#### POST /groups/{groupId}/members
Add member to group.

**Request Body:**
```json
{
  "userId": "uuid",
  "role": "MEMBER|ADMIN" (optional)
}
```

#### DELETE /groups/{groupId}/members/{userId}
Remove member from group.

## WebSocket

### Connection
```
ws://localhost:8080/ws
```

### Subscribe to Topics
```
/topic/messages/{conversationId}
/topic/user-status/{userId}
/topic/notifications/{userId}
```

### Send Message
```
Destination: /app/chat.sendMessage
Body: {
  "conversationId": "string",
  "content": "string",
  "type": "TEXT"
}
```

## Error Responses

All error responses follow this format:
```json
{
  "timestamp": "2024-01-01T12:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/users",
  "validationErrors": {
    "username": "Username is required"
  }
}
```

## Status Codes

- 200 OK: Success
- 201 Created: Resource created successfully
- 400 Bad Request: Invalid request data
- 401 Unauthorized: Authentication required
- 403 Forbidden: Access denied
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server error
