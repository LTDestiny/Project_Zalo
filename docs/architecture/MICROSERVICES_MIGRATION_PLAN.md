# Microservices Migration Plan - Zola Platform

## 📊 Current Architecture Analysis

### Hiện Trạng Hệ Thống

#### Backend Monolith Structure

```
zola-platform (Spring Boot Monolith)
├── com.zola.domain
│   ├── user/          # User management
│   ├── group/         # Group management
│   ├── message/       # Messaging (DynamoDB)
│   ├── chatbot/       # AI chatbot sessions
│   ├── statistics/    # User analytics
│   └── common/        # Shared enums & constants
├── config/            # Spring configurations
├── controller/        # REST endpoints
├── security/          # JWT authentication
└── websocket/         # Real-time messaging
```

#### Current Data Storage

- **PostgreSQL**: Users, Groups, Friendships, Activities
- **DynamoDB**: Messages, Conversations, Chatbot Sessions, Emotions, Media Metadata
- **Redis**: Caching layer
- **S3**: Avatar/media storage (configured but not fully implemented)

#### Current Tech Stack

- **Framework**: Spring Boot 3.4.1
- **Java**: Version 17/21
- **Databases**: 
  - PostgreSQL 17.4+ (Users, Groups, Friendships, Activities)
  - DynamoDB (Messages, Conversations, Chatbot Sessions)
  - Redis (Caching, Session Management)
- **Storage**: AWS S3 (Avatars, Messages, Shared Files, Analytics)
- **Real-time**: WebSocket (STOMP protocol)
- **Security**: JWT Authentication (15 min access + 30 day refresh tokens)
- **Migrations**: Flyway (v2 applied with enhanced schema)
- **Password**: BCrypt hashing (strength 10)

**Database Schema Version**: v2  
**Authentication**: Enhanced with email verification, password reset, refresh tokens, account lockout

---

## 🎯 Target Architecture: Domain Partitioning + Microservices

### Domain-Driven Design Approach

Chúng ta sẽ chia hệ thống thành các bounded contexts/domains sau:

#### 1. **User Service** (Identity & Access Management)

**Responsibilities:**

- User authentication & authorization
- User profile management
- User status tracking (online/offline/away)
- JWT token management
- Email verification
- Password reset
- Account security (lockout, refresh tokens)

**Data Storage:**

- **PostgreSQL**: User accounts, profiles, authentication tokens
- **Redis**: Session cache, user status, refresh token cache
- **S3**: Avatar images

**Technology:**

- Spring Boot
- Spring Security with JWT
- Redis for session management
- Email service integration (SendGrid/AWS SES)

**Recent Enhancements (January 2025):**

- ✅ Comprehensive authentication system implemented
- ✅ Email verification with 24-hour token expiry
- ✅ Password reset with 1-hour token expiry
- ✅ Refresh token mechanism (30-day expiry)
- ✅ Account lockout after 5 failed login attempts
- ✅ 9 new database fields for security features
- ✅ 10 authentication endpoints (register, login, logout, refresh, verify, etc.)

**Security Features:**

- BCrypt password hashing (strength 10)
- JWT access tokens (15 min expiry)
- Refresh tokens stored in database (30 days)
- Account lockout mechanism (15 min after 5 failed attempts)
- Email verification required for sensitive operations
- Token invalidation on password change

---

#### 2. **Social Service** (Relationships & Networking)

**Responsibilities:**

- Friend connections (add, accept, block)
- Friend search & discovery
- Contact management
- User activity logging

**Data Storage:**

- **PostgreSQL**: Friendships, user activities
- **Redis**: Online friends cache
- **S3**: Shared media between friends

**Technology:**

- Spring Boot
- PostgreSQL
- Redis

---

#### 3. **Group Service** (Group Management)

**Responsibilities:**

- Group creation & deletion
- Member management (add, remove, roles)
- Group settings & permissions
- Group discovery

**Data Storage:**

- **PostgreSQL**: Groups, group members, roles
- **Redis**: Active groups cache
- **S3**: Group avatars, shared files

**Technology:**

- Spring Boot
- PostgreSQL
- Redis

---

#### 4. **Message Service** (Real-time Messaging)

**Responsibilities:**

- Message sending & receiving
- Message history
- Message status (sent, delivered, read)
- Message search

**Data Storage:**

- **DynamoDB**: Messages (high-throughput)
- **S3**: Message attachments (images, videos, documents)
- **Redis**: Recent messages cache
- **Elasticsearch**: Message search indexing

**Technology:**

- Spring Boot
- DynamoDB
- S3
- WebSocket (STOMP)
- Elasticsearch

---

#### 5. **Conversation Service** (Chat Context)

**Responsibilities:**

- Conversation/thread management
- Last message tracking
- Unread count
- Conversation participants

**Data Storage:**

- **DynamoDB**: Conversations metadata
- **Redis**: Active conversation cache

**Technology:**

- Spring Boot
- DynamoDB
- Redis

---

#### 6. **Media Service** (File Management)

**Responsibilities:**

- File upload/download
- Image processing (resize, thumbnail)
- Video transcoding
- File metadata management

**Data Storage:**

- **S3**: Primary file storage
- **DynamoDB**: Media metadata (file info, processing status)
- **CloudFront**: CDN for fast delivery

**Technology:**

- Spring Boot
- AWS S3
- AWS Lambda (for image processing)
- DynamoDB

---

#### 7. **Notification Service** (Push Notifications)

**Responsibilities:**

- Real-time notifications
- Push notification to mobile
- Email notifications
- Notification history

**Data Storage:**

- **DynamoDB**: Notification queue (with TTL)
- **SNS/SQS**: Message queue
- **Redis**: Real-time notification cache

**Technology:**

- Spring Boot
- AWS SNS/SQS
- Firebase Cloud Messaging
- DynamoDB

---

#### 8. **Chatbot Service** (AI Assistant)

**Responsibilities:**

- AI conversation handling
- Context management
- NLP processing
- Bot training

**Data Storage:**

- **DynamoDB**: Chatbot sessions, conversation history
- **S3**: Training data, models
- **OpenAI API**: LLM integration

**Technology:**

- Spring Boot
- DynamoDB
- OpenAI API
- AWS Bedrock (optional)

---

#### 9. **Analytics Service** (Statistics & Insights)

**Responsibilities:**

- User activity tracking
- Message statistics
- Usage analytics
- Reporting

**Data Storage:**

- **DynamoDB**: Time-series data
- **S3**: Data lake for analytics
- **Amazon Athena**: Query analytics data
- **QuickSight**: Dashboards

**Technology:**

- Spring Boot
- DynamoDB
- AWS Athena
- S3

---

#### 10. **API Gateway** (Entry Point)

**Responsibilities:**

- Request routing
- Authentication/Authorization
- Rate limiting
- Load balancing
- API versioning

**Technology:**

- AWS API Gateway
- Spring Cloud Gateway (alternative)
- Kong API Gateway (alternative)

---

## 🗄️ Data Storage Strategy with S3

### S3 Bucket Structure

```
zola-platform-prod/
├── avatars/
│   ├── users/
│   │   └── {user-id}/
│   │       ├── original.jpg
│   │       ├── large.jpg      # 512x512
│   │       ├── medium.jpg     # 256x256
│   │       └── thumbnail.jpg  # 128x128
│   └── groups/
│       └── {group-id}/
│           ├── original.jpg
│           ├── large.jpg
│           └── thumbnail.jpg
│
├── messages/
│   ├── images/
│   │   └── {message-id}/
│   │       ├── original.{ext}
│   │       ├── large.jpg
│   │       ├── medium.jpg
│   │       └── thumbnail.jpg
│   ├── videos/
│   │   └── {message-id}/
│   │       ├── original.{ext}
│   │       ├── 1080p.mp4
│   │       ├── 720p.mp4
│   │       ├── 480p.mp4
│   │       └── thumbnail.jpg
│   ├── documents/
│   │   └── {message-id}/
│   │       └── {filename}
│   └── voice/
│       └── {message-id}/
│           └── audio.{ext}
│
├── shared-files/
│   └── {group-id}/
│       └── {file-id}/
│           └── {filename}
│
├── analytics/
│   └── exports/
│       └── {date}/
│           └── {report-name}.csv
│
└── backups/
    ├── database/
    │   └── {timestamp}/
    └── media/
        └── {timestamp}/
```

### S3 Configuration

```yaml
# S3 Buckets
Buckets:
  - Name: zola-avatars-prod
    Purpose: User and group avatars
    Lifecycle: Transition to Glacier after 365 days
    Versioning: Enabled

  - Name: zola-messages-prod
    Purpose: Message attachments
    Lifecycle:
      - Transition to IA after 90 days
      - Transition to Glacier after 365 days
    Versioning: Disabled

  - Name: zola-shared-files-prod
    Purpose: Group shared files
    Lifecycle: Keep indefinitely
    Versioning: Enabled

  - Name: zola-analytics-prod
    Purpose: Analytics data & reports
    Lifecycle: Transition to Glacier after 30 days
    Versioning: Disabled
```

### S3 Access Patterns

1. **Upload Flow:**

   ```
   Client → API Gateway → Media Service → S3 (presigned URL)
   Media Service → DynamoDB (metadata) → Notification Service
   ```

2. **Download Flow:**

   ```
   Client → API Gateway → Media Service → CloudFront CDN → S3
   ```

3. **Image Processing:**
   ```
   S3 Upload → Lambda Trigger → Resize/Process → S3 (variants)
   Lambda → DynamoDB (update processing status)
   ```

---

## 🔄 Migration Strategy

### Phase 1: Infrastructure Setup (Week 1-2)

**Tasks:**

1. ✅ Create S3 buckets with proper policies
2. ✅ Setup CloudFront CDN
3. ✅ Configure Lambda for image processing
4. ✅ Setup API Gateway
5. ✅ Create separate databases for each service
6. ✅ **COMPLETED**: Enhanced authentication system with 10 endpoints
7. ✅ **COMPLETED**: Database schema optimization (30+ indexes)
8. ✅ **COMPLETED**: Sample data generation (20 users, 10 groups, 28 friendships)
6. ✅ Setup service mesh (Istio/Linkerd)

**Deliverables:**

- Terraform scripts for all infrastructure
- S3 bucket policies
- CloudFront distributions
- Lambda functions

---

### Phase 2: Extract Media Service (Week 3-4)

**Tasks:**

1. Create new Media Service Spring Boot application
2. Implement S3 upload/download APIs
3. Add image processing with Lambda
4. Migrate existing media URLs to S3
5. Update Message Service to use Media Service

**Migration Script:**

```sql
-- Migrate avatar URLs
UPDATE users
SET avatar_url = REPLACE(avatar_url, 'old-storage', 's3://zola-avatars-prod/users/')
WHERE avatar_url IS NOT NULL;

UPDATE groups
SET avatar_url = REPLACE(avatar_url, 'old-storage', 's3://zola-avatars-prod/groups/')
WHERE avatar_url IS NOT NULL;
```

---

### Phase 3: Extract User Service (Week 5-6)

**Tasks:**

1. Create User Service with PostgreSQL
2. Extract authentication logic
3. Implement JWT service
4. Setup Redis for sessions
5. Create User API endpoints
6. Test authentication flow

**Database Schema:**

```sql
-- User Service Database
CREATE DATABASE user_service_db;

-- Tables: users, user_sessions
```

---

### Phase 4: Extract Social Service (Week 7-8)

**Tasks:**

1. Create Social Service
2. Move friendships logic
3. Implement activity logging
4. Create friend discovery APIs
5. Setup Redis for online status

---

### Phase 5: Extract Group Service (Week 9-10)

**Tasks:**

1. Create Group Service
2. Move group management logic
3. Implement role-based permissions
4. Create group APIs
5. Integrate with User Service

---

### Phase 6: Refactor Message & Conversation Services (Week 11-12)

**Tasks:**

1. Separate Message Service from monolith
2. Extract Conversation Service
3. Setup WebSocket gateway
4. Implement message routing
5. Integrate with Media Service for attachments

---

### Phase 7: Extract Remaining Services (Week 13-16)

**Tasks:**

1. Create Notification Service
2. Create Chatbot Service
3. Create Analytics Service
4. Setup API Gateway routing
5. Implement circuit breakers

---

### Phase 8: Testing & Optimization (Week 17-20)

**Tasks:**

1. Load testing all services
2. Performance optimization
3. Security audit
4. Documentation
5. Gradual rollout

---

## 🏗️ Service Communication Patterns

### Synchronous Communication (REST)

```
API Gateway → User Service (Get user info)
Group Service → User Service (Validate members)
Message Service → User Service (Check sender)
```

### Asynchronous Communication (Event-Driven)

```
Message Service → (Event: MESSAGE_SENT) → Notification Service
User Service → (Event: USER_STATUS_CHANGED) → Social Service
Group Service → (Event: MEMBER_ADDED) → Notification Service
```

### Event Bus (Amazon EventBridge)

```yaml
Events:
  - user.created
  - user.status_changed
  - message.sent
  - message.delivered
  - message.read
  - group.created
  - group.member_added
  - friend.request_sent
  - friend.request_accepted
```

---

## 📊 Database Partitioning Strategy

### User Service DB

```sql
-- Sharding by user_id
CREATE TABLE users_shard_1 (LIKE users INCLUDING ALL);
CREATE TABLE users_shard_2 (LIKE users INCLUDING ALL);
-- Partition by user_id hash
```

### Message Service (DynamoDB)

```
Partition Key: conversation_id
Sort Key: timestamp
GSI-1: sender_id + timestamp (for user's sent messages)
GSI-2: receiver_id + timestamp (for user's received messages)
```

---

## 🔐 Security Considerations

1. **Service-to-Service Auth:**
   - mTLS for internal communication
   - Service mesh (Istio) for encryption
   - API keys for service authentication

2. **Data Encryption:**
   - S3 encryption at rest (SSE-S3)
   - TLS for data in transit
   - Database encryption (RDS, DynamoDB)

3. **Access Control:**
   - IAM roles for AWS services
   - RBAC for API Gateway
   - JWT for user authentication

---

## 📈 Monitoring & Observability

### Metrics (CloudWatch)

- Service latency
- Error rates
- Request counts
- S3 upload/download metrics
- DynamoDB throttling

### Logging (ELK Stack)

- Centralized logging
- Distributed tracing (AWS X-Ray)
- Correlation IDs

### Alerting

- Service health checks
- Error rate thresholds
- Latency alerts
- Cost anomalies

---

## 💰 Cost Optimization

1. **S3 Lifecycle Policies:**
   - Move old files to Glacier
   - Delete temporary files after 7 days
   - Intelligent-Tiering for unpredictable access

2. **CloudFront Caching:**
   - Cache static avatars (24h)
   - Cache media thumbnails (7 days)

3. **DynamoDB:**
   - Auto-scaling for capacity
   - On-demand pricing for low traffic tables

4. **Lambda:**
   - Optimize memory allocation
   - Use provisioned concurrency for high traffic

---

## 🚀 Deployment Strategy

### Container Orchestration (EKS)

```yaml
Services:
  - user-service:
      replicas: 3
      resources:
        cpu: 500m
        memory: 1Gi
  - message-service:
      replicas: 5
      resources:
        cpu: 1000m
        memory: 2Gi
  - media-service:
      replicas: 3
      resources:
        cpu: 500m
        memory: 1Gi
```

### CI/CD Pipeline

```
GitHub → GitHub Actions → Build Docker Images → ECR
  → Deploy to EKS (Staging) → Integration Tests
  → Approval → Deploy to EKS (Production)
```

---

## 📋 Implementation Checklist

### Immediate Tasks (This Sprint)

- [ ] Design S3 bucket structure
- [ ] Create S3 buckets with Terraform
- [ ] Setup CloudFront distributions
- [ ] Create Lambda for image processing
- [ ] Document API contracts between services
- [ ] Setup service discovery (Consul/Eureka)

### Short-term (Next 2 Months)

- [ ] Extract Media Service
- [ ] Extract User Service
- [ ] Extract Social Service
- [ ] Setup API Gateway
- [ ] Implement event bus

### Long-term (Next 6 Months)

- [ ] Complete all service extraction
- [ ] Migrate all data to S3
- [ ] Implement advanced features (ML, analytics)
- [ ] Full production rollout

---

## 🎓 Team Training Needs

1. **Microservices Architecture:**
   - Domain-Driven Design
   - Event-driven architecture
   - Saga pattern for distributed transactions

2. **AWS Services:**
   - S3 advanced features
   - DynamoDB best practices
   - Lambda serverless
   - EKS deployment

3. **DevOps:**
   - Kubernetes
   - Service mesh
   - Monitoring & observability

---

## 📞 Support & Resources

- **Architecture Review:** Weekly meetings
- **Documentation:** Confluence wiki
- **Code Repository:** GitHub Enterprise
- **Communication:** Slack #zola-microservices

---

**Last Updated:** January 2025  
**Version:** 1.1  
**Owner:** Architecture Team  
**Recent Changes**: Enhanced authentication system, database optimization, comprehensive documentation
