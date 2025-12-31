# OTT Platform - Real-time Chat Application

A comprehensive over-the-top (OTT) messaging platform with hybrid PostgreSQL/DynamoDB architecture, built with Spring Boot, React, and React Native.

## Architecture Overview

### Database Strategy
- **PostgreSQL**: Relational data (users, groups, friendships, user activities)
- **DynamoDB**: High-throughput data (messages, conversations, chatbot sessions, statistics)

### Technology Stack

#### Backend
- Java 17+ with Spring Boot 3.x
- Spring Data JPA (PostgreSQL)
- Spring Data DynamoDB
- Spring Security + JWT
- WebSocket for real-time messaging
- AWS SDK (S3, DynamoDB)
- Redis for caching

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
ott-platform/
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
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ottdb
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

Project Link: [https://github.com/yourusername/ott-platform](https://github.com/yourusername/ott-platform)
