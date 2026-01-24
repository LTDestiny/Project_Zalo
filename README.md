# Zola Platform - Real-time Chat Application

A comprehensive Zola messaging platform with hybrid PostgreSQL/DynamoDB architecture, built with Spring Boot, React, and React Native.

## Architecture Overview

### Key Features

- **Comprehensive Authentication**: Register, Login, Email Verification, Password Reset, Refresh Tokens
- **Security**: JWT tokens, BCrypt password hashing, Account lockout protection
- **Real-time Messaging**: WebSocket-based chat with delivery/read receipts
- **Group Management**: Create/manage groups with role-based permissions
- **Media Sharing**: Upload/download files with S3 storage
- **User Management**: Profile updates, status tracking, friend connections
- **Analytics**: User activity tracking and statistics

### Database Strategy
- **PostgreSQL**: Relational data (users, groups, friendships, user activities)
  - Enhanced with 30+ optimized indexes (partial, composite, GIN, full-text)
  - Authentication columns (email_verified, tokens, login_attempts, locked_until)
- **DynamoDB**: High-throughput data (messages, conversations, chatbot sessions, statistics)

### Technology Stack

#### Backend
- Java 17/21 with Spring Boot 3.4.1
- Spring Data JPA (PostgreSQL 17.4+)
- Spring Data DynamoDB
- Spring Security + JWT Authentication
  - Access tokens (15 min expiry)
  - Refresh tokens (30 days expiry)
  - Email verification
  - Password reset
  - Account lockout (5 failed attempts)
- WebSocket for real-time messaging
- AWS SDK (S3, DynamoDB)
- Redis for caching
- Flyway database migrations

#### Frontend Web
- React 18+ with TypeScript
- Redux Toolkit for state management
- Tailwind CSS + Shadcn/ui
- Vite for build tooling
- WebSocket client
- Axios for API calls

#### Frontend Mobile
- React Native with TypeScript
- React Navigation
- Redux Toolkit
- Native WebSocket support

#### Infrastructure
- AWS (EKS, RDS, DynamoDB, S3, ElastiCache)
- Terraform for IaC
- Kubernetes for orchestration
- Docker for containerization
- GitHub Actions for CI/CD

## Project Structure

```
zola-platform/
├── backend/              # Spring Boot application
├── frontend-web/         # React web application
├── frontend-mobile/      # React Native mobile app
├── infrastructure/       # Terraform & Kubernetes configs
├── docs/                 # Documentation
└── scripts/              # Deployment scripts
```

## Features

### Core Features
- Real-time messaging (1-1 and group chats)
- User authentication & authorization
- Friend management system
- Group chat with roles (Owner, Admin, Member)
- Media sharing (images, videos, documents)
- Message reactions/emotions
- AI-powered chatbot integration
- User activity tracking
- Real-time statistics and analytics
- Push notifications

### Technical Features
- WebSocket for real-time communication
- JWT-based authentication
- File upload to AWS S3
- Redis caching for performance
- Database migration with Flyway
- Horizontal scaling support
- Health monitoring and metrics

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- AWS Account (for production)
- PostgreSQL 14+
- Redis

### Local Development

#### 1. Start Infrastructure
```bash
cd infrastructure
docker-compose up -d
```

#### 2. Run Backend
```bash
cd backend
./mvnw spring-boot:run
```

#### 3. Run Frontend Web
```bash
cd frontend-web
npm install
npm run dev
```

#### 4. Run Frontend Mobile
```bash
cd frontend-mobile
npm install
npx react-native run-android  # or run-ios
```

## Environment Variables

### Backend
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/zoladb
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
```

### Frontend
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_URL=ws://localhost:8080/ws
```

## API Documentation

Once the backend is running, access Swagger UI at:
```
http://localhost:8080/swagger-ui.html
```

## Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend-web
npm test
```

## Deployment

### Using Terraform
```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

### Using Kubernetes
```bash
cd infrastructure/kubernetes
kubectl apply -f .
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/yourusername/zola-platform](https://github.com/yourusername/zola-platform)
