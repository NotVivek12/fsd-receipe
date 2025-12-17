Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Create Admin User" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will create an admin user for your Recipe Sharing App" -ForegroundColor Yellow
Write-Host ""

# Get user input
$username = Read-Host "Enter admin username"
$email = Read-Host "Enter admin email"
$password = Read-Host "Enter admin password" -AsSecureString
$passwordText = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

Write-Host ""
Write-Host "Creating admin user..." -ForegroundColor Yellow

# Create JSON body
$body = @{
    username = $username
    email = $email
    password = $passwordText
    role = "admin"
} | ConvertTo-Json

# Make API request
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body
    
    Write-Host ""
    Write-Host "✓ Admin user created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Username: $username" -ForegroundColor White
    Write-Host "Email: $email" -ForegroundColor White
    Write-Host "Role: Admin" -ForegroundColor White
    Write-Host ""
    Write-Host "You can now login at: http://localhost:3000/admin" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "✗ Failed to create admin user" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure:" -ForegroundColor Yellow
    Write-Host "1. The backend server is running (npm run dev in server folder)" -ForegroundColor White
    Write-Host "2. MongoDB is connected" -ForegroundColor White
    Write-Host "3. The user doesn't already exist" -ForegroundColor White
    Write-Host ""
}
