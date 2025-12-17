# 🚀 Quick Start Guide

## Prerequisites
- ✅ Node.js installed
- ✅ MongoDB installed and running

## Installation (One-Time Setup)

### 1. Install All Dependencies
```powershell
# Run the automated setup script
./setup.ps1
```

## Running the Application

### Option 1: Using Scripts (Recommended)

Open **TWO** PowerShell terminals:

**Terminal 1 - Backend:**
```powershell
./start-backend.ps1
```

**Terminal 2 - Frontend:**
```powershell
./start-frontend.ps1
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```powershell
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
npm start
```

## First Time Setup

### Create Your Admin Account

After both servers are running:

```powershell
./create-admin.ps1
```

Or manually:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"username":"admin","email":"admin@example.com","password":"admin123","role":"admin"}'
```

## Access the Application

### 🌐 Public Access (No Login)
```
http://localhost:3000
```
Browse all recipes without authentication!

### 🔐 Admin Access
```
http://localhost:3000/admin
```
Login and manage recipes.

## Common Commands

### Backend
```powershell
cd server
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start normally
```

### Frontend
```powershell
npm start          # Start React app
npm run build      # Build for production
```

### Create Admin
```powershell
./create-admin.ps1
```

## Troubleshooting

### MongoDB Not Running
```powershell
# Windows
net start MongoDB
```

### Port Already in Use
- Change PORT in `server/.env`
- Or kill the process:
```powershell
# Find process
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Module Not Found
```powershell
# Backend
cd server
npm install

# Frontend
cd ..
npm install
```

## What's Running?

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React app (Public & Admin) |
| Backend | http://localhost:5000 | Express API server |
| MongoDB | mongodb://localhost:27017 | Database |

## Quick Test

1. ✅ Backend running? Check: http://localhost:5000
2. ✅ Frontend running? Check: http://localhost:3000
3. ✅ Can browse recipes? Visit home page
4. ✅ Admin works? Visit: http://localhost:3000/admin

## Next Steps

1. **Browse Recipes** - Go to http://localhost:3000
2. **Create Admin** - Run `./create-admin.ps1`
3. **Login as Admin** - Go to http://localhost:3000/admin
4. **Add Recipes** - Click "+ Add Recipe" button
5. **Share & Enjoy!** 🎉

---

**Need help?** Check README.md or SETUP.md for detailed instructions.
