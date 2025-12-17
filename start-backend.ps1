# Start Backend Server
Write-Host "Starting Backend Server..." -ForegroundColor Green
Write-Host "Server will run on http://localhost:5000" -ForegroundColor Cyan
Write-Host ""

Set-Location server
npm run dev
