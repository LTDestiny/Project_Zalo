# Database Schema Design

## Overview

This application uses a hybrid database approach:
- **PostgreSQL** for relational, structured data
- **DynamoDB** for high-throughput, flexible schema data

## PostgreSQL Tables

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    avatar_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'OFFLINE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP,
    CONSTRAINT chk_status CHECK (status IN ('ONLINE', 'OFFLINE', 'AWAY', 'DO_NOT_DISTURB'))
);
```

### Groups Table
```sql
CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    avatar_url VARCHAR(500),
    created_by UUID NOT NULL,
    type VARCHAR(20) DEFAULT 'PRIVATE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_type CHECK (type IN ('PRIVATE', 'PUBLIC'))
);
```

### Group Members Table
```sql
CREATE TABLE group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL,
    user_id UUID NOT NULL,
    role VARCHAR(20) DEFAULT 'MEMBER',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_read_at TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(group_id, user_id),
    CONSTRAINT chk_role CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER'))
);
```

### Friendships Table
```sql
CREATE TABLE friendships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id_1 UUID NOT NULL,
    user_id_2 UUID NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id_1) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_2) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_friendship_status CHECK (status IN ('PENDING', 'ACCEPTED', 'BLOCKED')),
    CONSTRAINT chk_different_users CHECK (user_id_1 != user_id_2)
);
```

### User Activities Table
```sql
CREATE TABLE user_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_activity_type CHECK (type IN ('LOGIN', 'LOGOUT', 'MESSAGE_SENT', 'GROUP_CREATED', 'GROUP_JOINED'))
);

CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_created_at ON user_activities(created_at DESC);
```

## DynamoDB Tables

### Messages Table
```
Partition Key: message_id (String)
Sort Key: conversation_id (String)

Attributes:
- message_id: String (PK)
- conversation_id: String (SK)
- sender_id: String
- type: String (TEXT, IMAGE, VIDEO, DOCUMENT, EMOTION, SYSTEM)
- content: String
- media_url: String
- metadata: Map
- timestamp: Number
- status: String (SENDING, SENT, DELIVERED, READ, FAILED)
- read_by: List<String>
- reply_to_message_id: String

GSI-1: conversation_id (PK) + timestamp (SK) - For querying messages by conversation
GSI-2: sender_id (PK) + timestamp (SK) - For querying messages by sender
```

### Conversations Table
```
Partition Key: conversation_id (String)
Sort Key: type (String)

Attributes:
- conversation_id: String (PK)
- type: String (SK) - DIRECT or GROUP
- participant_ids: List<String>
- last_message_id: String
- last_message_preview: String
- last_message_time: Number
- unread_counts: Map<String, Number>
- created_at: Number
- updated_at: Number

GSI-1: participant_id (PK) + last_message_time (SK) - For querying user conversations
```

### Chatbot Sessions Table
```
Partition Key: session_id (String)

Attributes:
- session_id: String (PK)
- user_id: String
- conversation_id: String
- message_history: List<Map>
- context: Map
- ai_model: String
- created_at: Number
- expires_at: Number (TTL)

GSI-1: user_id (PK) + created_at (SK) - For querying user sessions
```

### Emotions Table
```
Partition Key: emotion_id (String)

Attributes:
- emotion_id: String (PK)
- message_id: String
- user_id: String
- emotion_type: String (LIKE, LOVE, LAUGH, SAD, ANGRY, WOW)
- timestamp: Number

GSI-1: message_id (PK) + timestamp (SK) - For querying emotions by message
```

### Media Metadata Table
```
Partition Key: media_id (String)

Attributes:
- media_id: String (PK)
- message_id: String
- uploader_id: String
- file_name: String
- file_type: String
- file_size: Number
- storage_path: String (S3 path)
- thumbnail_url: String
- processing_status: Map
- uploaded_at: Number

GSI-1: message_id (PK) - For querying media by message
```

### User Statistics Table
```
Partition Key: user_id (String)
Sort Key: period (String) - Format: YYYY-MM-DD or YYYY-MM

Attributes:
- user_id: String (PK)
- period: String (SK)
- messages_sent: Number
- messages_received: Number
- groups_joined: Number
- active_conversations: Number
- daily_activity: Map
- last_updated: Number
```

### Notification Queue Table
```
Partition Key: notification_id (String)

Attributes:
- notification_id: String (PK)
- user_id: String
- type: String (MESSAGE, FRIEND_REQUEST, GROUP_INVITE, SYSTEM)
- content: String
- payload: Map
- is_read: Boolean
- created_at: Number
- ttl: Number (30 days expiration)

GSI-1: user_id (PK) + created_at (SK) - For querying user notifications
```

## Indexes Strategy

### PostgreSQL Indexes
- Primary keys on all `id` columns
- Unique indexes on `username`, `email`
- Composite index on `(group_id, user_id)` in group_members
- Index on `user_id` in user_activities
- Index on `created_at` for time-based queries

### DynamoDB GSIs
- Conversation queries by participant
- Message queries by conversation and sender
- User notification queries
- Chatbot session queries by user

## Data Relationships

### PostgreSQL (Strong Relationships)
- User ↔ Group (via GroupMember)
- User ↔ User (via Friendship)
- User → UserActivity

### DynamoDB (Denormalized, Referenced)
- Message references User (sender_id)
- Message references Conversation (conversation_id)
- Emotion references Message and User
- MediaMetadata references Message

## Scaling Considerations

### PostgreSQL
- Read replicas for read-heavy operations
- Connection pooling with HikariCP
- Partitioning for user_activities by date

### DynamoDB
- Auto-scaling enabled on all tables
- On-demand billing for unpredictable workloads
- TTL for automatic cleanup of old data
- Point-in-time recovery enabled
