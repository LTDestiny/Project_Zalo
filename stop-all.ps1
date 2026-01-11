# Script để stop tất cả các services

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     Stopping OTT Platform Services    " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Stopping database services..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml down

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database services stopped" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to stop some services" -ForegroundColor Red
}

Write-Host ""
Write-Host "Note: Backend and Frontend processes in separate windows" -ForegroundColor Yellow
Write-Host "      need to be stopped manually (Ctrl+C in each window)" -ForegroundColor Yellow
Write-Host ""
