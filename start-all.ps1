# Script để start tất cả các services

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     Starting OTT Platform Services    " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Docker
Write-Host "Checking Docker..." -ForegroundColor Yellow
$dockerRunning = $null
try {
    $dockerRunning = docker info 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Docker not running"
    }
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not running or not installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install and start Docker Desktop:" -ForegroundColor Yellow
    Write-Host "  https://www.docker.com/products/docker-desktop" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installing, please run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Start Database Services
Write-Host "Starting database services (PostgreSQL, Redis, DynamoDB)..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to start database services" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Database services started successfully" -ForegroundColor Green
Write-Host ""

# Wait for services to be ready
Write-Host "Waiting for services to be ready (10 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 10
Write-Host "✓ Services should be ready now" -ForegroundColor Green
Write-Host ""

# Start Backend
Write-Host "Starting Backend..." -ForegroundColor Yellow
Write-Host "  URL: http://localhost:8080" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; mvn spring-boot:run -Dspring-boot.run.arguments='--spring.profiles.active=dev'"
Start-Sleep -Seconds 2
Write-Host "✓ Backend starting in new window" -ForegroundColor Green
Write-Host ""

# Install Frontend Dependencies (if needed)
Write-Host "Checking frontend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "frontend-web\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    cd frontend-web
    npm install
    cd ..
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
}
Write-Host ""

# Start Frontend
Write-Host "Starting Frontend..." -ForegroundColor Yellow
Write-Host "  URL: http://localhost:3000" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend-web; npm run dev"
Write-Host "✓ Frontend starting in new window" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     All Services Started!              " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Services:" -ForegroundColor White
Write-Host "  • Frontend:   http://localhost:3000" -ForegroundColor Cyan
Write-Host "  • Backend:    http://localhost:8080" -ForegroundColor Cyan
Write-Host "  • PostgreSQL: localhost:5432" -ForegroundColor Cyan
Write-Host "  • Redis:      localhost:6379" -ForegroundColor Cyan
Write-Host "  • DynamoDB:   http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop database services, run:" -ForegroundColor Yellow
Write-Host "  docker-compose -f docker-compose.dev.yml down" -ForegroundColor Cyan
Write-Host ""
