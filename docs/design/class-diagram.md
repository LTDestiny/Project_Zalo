# Class Diagram - Zola Platform

## Mô tả hệ thống

Hệ thống Zola Platform là một ứng dụng nhắn tin tương tự Zalo, bao gồm:
- **PostgreSQL**: Lưu trữ thông tin người dùng, nhóm, quan hệ bạn bè
- **DynamoDB**: Lưu trữ tin nhắn và cuộc hội thoại (NoSQL cho hiệu năng cao)
- **Redis**: Cache và xử lý realtime

## Class Diagram

```mermaid
classDiagram
    %% Enums
    class UserStatus {
        <<enumeration>>
        ONLINE
        OFFLINE
        AWAY
        DO_NOT_DISTURB
    }
    
    class FriendshipStatus {
        <<enumeration>>
        PENDING
        ACCEPTED
        BLOCKED
    }
    
    class GroupType {
        <<enumeration>>
        PRIVATE
        PUBLIC
    }
    
    class MemberRole {
        <<enumeration>>
        OWNER
        ADMIN
        MEMBER
    }
    
    class MessageType {
        <<enumeration>>
        TEXT
        IMAGE
        VIDEO
        DOCUMENT
        EMOTION
        SYSTEM
    }
    
    class MessageStatus {
        <<enumeration>>
        SENDING
        SENT
        DELIVERED
        READ
        FAILED
    }
    
    class ActivityType {
        <<enumeration>>
        LOGIN
        LOGOUT
        MESSAGE_SENT
        GROUP_CREATED
        GROUP_JOINED
    }
    
    %% PostgreSQL Entities
    class User {
        +UUID id
        +String username
        +String email
        +String passwordHash
        +String phoneNumber
        +String avatarUrl
        +UserStatus status
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
        +LocalDateTime lastSeen
    }
    
    class Friendship {
        +UUID id
        +UUID userId1
        +UUID userId2
        +FriendshipStatus status
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
    }
    
    class Group {
        +UUID id
        +String name
        +String description
        +String avatarUrl
        +UUID createdBy
        +GroupType type
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
    }
    
    class GroupMember {
        +UUID id
        +UUID groupId
        +UUID userId
        +MemberRole role
        +LocalDateTime joinedAt
        +LocalDateTime lastReadAt
    }
    
    class UserActivity {
        +UUID id
        +UUID userId
        +ActivityType type
        +Map~String,Object~ metadata
        +LocalDateTime createdAt
    }
    
    %% DynamoDB Entities
    class Message {
        +String messageId
        +String conversationId
        +String senderId
        +MessageType type
        +String content
        +String mediaUrl
        +Map~String,String~ metadata
        +Long timestamp
        +MessageStatus status
        +List~String~ readBy
        +String replyToMessageId
    }
    
    class Conversation {
        +String conversationId
        +String type
        +List~String~ participantIds
        +String lastMessageId
        +String lastMessagePreview
        +Long lastMessageTime
        +Map~String,Integer~ unreadCounts
        +Long createdAt
        +Long updatedAt
    }
    
    %% Relationships
    User "1" -- "0..*" Friendship : participates
    User "1" -- "0..*" GroupMember : has
    User "1" -- "0..*" UserActivity : performs
    User "1" -- "0..*" Group : creates
    
    Group "1" -- "0..*" GroupMember : contains
    
    Friendship -- FriendshipStatus
    User -- UserStatus
    Group -- GroupType
    GroupMember -- MemberRole
    UserActivity -- ActivityType
    
    Message -- MessageType
    Message -- MessageStatus
    Message "0..*" -- "1" Conversation : belongs to
    
    %% Notes
    note for User "Stored in PostgreSQL\nĐại diện người dùng trong hệ thống"
    note for Message "Stored in DynamoDB\nTin nhắn realtime với khả năng scale cao"
    note for Conversation "Stored in DynamoDB\nQuản lý cuộc hội thoại 1-1 hoặc nhóm"
```

## Entity Relationship Diagram (Chi tiết)

```mermaid
erDiagram
    USERS ||--o{ FRIENDSHIPS : "userId1/userId2"
    USERS ||--o{ USER_ACTIVITIES : "has"
    USERS ||--o{ GROUPS : "creates"
    USERS ||--o{ GROUP_MEMBERS : "joins"
    GROUPS ||--o{ GROUP_MEMBERS : "contains"
    
    USERS {
        uuid id PK
        varchar username UK
        varchar email UK
        varchar password_hash
        varchar phone_number
        varchar avatar_url
        varchar status
        timestamp created_at
        timestamp updated_at
        timestamp last_seen
    }
    
    FRIENDSHIPS {
        uuid id PK
        uuid user_id_1 FK
        uuid user_id_2 FK
        varchar status
        timestamp created_at
        timestamp updated_at
    }
    
    GROUPS {
        uuid id PK
        varchar name
        text description
        varchar avatar_url
        uuid created_by FK
        varchar type
        timestamp created_at
        timestamp updated_at
    }
    
    GROUP_MEMBERS {
        uuid id PK
        uuid group_id FK
        uuid user_id FK
        varchar role
        timestamp joined_at
        timestamp last_read_at
    }
    
    USER_ACTIVITIES {
        uuid id PK
        uuid user_id FK
        varchar type
        jsonb metadata
        timestamp created_at
    }
    
    MESSAGES {
        string message_id PK
        string conversation_id
        string sender_id
        varchar type
        text content
        varchar media_url
        map metadata
        bigint timestamp
        varchar status
        list read_by
        string reply_to_message_id
    }
    
    CONVERSATIONS {
        string conversation_id PK
        string type
        list participant_ids
        string last_message_id
        string last_message_preview
        bigint last_message_time
        map unread_counts
        bigint created_at
        bigint updated_at
    }
```

## Giải thích các mối quan hệ

### 1. User - Friendship (Many-to-Many through Friendship)
- Một người dùng có thể có nhiều bạn bè
- Mỗi quan hệ bạn bè được lưu qua bảng `friendships` với 2 user_id
- Status: PENDING, ACCEPTED, BLOCKED

### 2. User - Group (One-to-Many)
- Một người dùng có thể tạo nhiều nhóm (createdBy)
- Một nhóm có một người tạo

### 3. User - GroupMember - Group (Many-to-Many)
- Một người dùng có thể tham gia nhiều nhóm
- Một nhóm có thể có nhiều thành viên
- Qua bảng trung gian `group_members` với role: OWNER, ADMIN, MEMBER

### 4. User - UserActivity (One-to-Many)
- Một người dùng có thể có nhiều hoạt động
- Lưu lại lịch sử: LOGIN, LOGOUT, MESSAGE_SENT, etc.

### 5. Conversation - Message (One-to-Many trong DynamoDB)
- Một cuộc hội thoại chứa nhiều tin nhắn
- Lưu trong DynamoDB để scale tốt
- Conversation có thể là DIRECT (1-1) hoặc GROUP

## Kiến trúc dữ liệu

### PostgreSQL Tables:
- `users`: Thông tin người dùng
- `friendships`: Quan hệ bạn bè
- `groups`: Thông tin nhóm
- `group_members`: Thành viên nhóm
- `user_activities`: Lịch sử hoạt động

### DynamoDB Tables:
- `Messages`: Tin nhắn (với GSI cho conversation và sender)
- `Conversations`: Cuộc hội thoại và metadata

### Redis:
- Cache user status
- Real-time presence
- Session management
