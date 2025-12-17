# Quick Setup Guide

## Step 1: Install Backend Dependencies

Open PowerShell in the project directory and run:

```powershell
cd server
npm install
```

## Step 2: Install Frontend Dependencies

```powershell
cd ..
npm install
```

## Step 3: Configure MongoDB

### Option A: Local MongoDB
Make sure MongoDB is installed and running on your machine.

### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `server/.env` with your connection string

## Step 4: Start the Backend

```powershell
cd server
npm run dev
```

Backend will be running at: http://localhost:5000

## Step 5: Start the Frontend (New Terminal)

Open a new PowerShell window and run:

```powershell
npm start
```

Frontend will be running at: http://localhost:3000

## Step 6: Create Admin Account

1. Go to http://localhost:3000/admin
2. First, you need to create an admin account (only once)
3. Use the registration endpoint or MongoDB directly to create an admin user
4. Then login at http://localhost:3000/admin

## You're Ready! 🎉

**For Normal Users:**
- Just visit http://localhost:3000
- Browse and view recipes without login
- No authentication required!

**For Admin:**
- Visit http://localhost:3000/admin
- Login with admin credentials
- Access full CRUD operations
- View statistics dashboard

## How It Works

### Public Access (No Login Required)
- Home page: `http://localhost:3000`
- Users can browse all recipes
- Search and filter functionality
- View detailed recipe information
- No login or registration needed

### Admin Access (Login Required)
- Admin login: `http://localhost:3000/admin`
- Admin dashboard: `http://localhost:3000/admin/dashboard`
- Create, edit, and delete recipes
- View recipe statistics
- Full management capabilities

## Creating Your First Admin User

You can create an admin user in two ways:

### Method 1: Using Postman or cURL
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"username":"admin","email":"admin@example.com","password":"admin123","role":"admin"}'
```

### Method 2: Using MongoDB Compass
1. Connect to your MongoDB
2. Go to `recipeDB` database
3. Go to `users` collection
4. Add a new document with role: "admin"

## Troubleshooting

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `server/.env`

**Port Already in Use:**
- Change PORT in `server/.env`
- Kill the process using the port

**Module Not Found:**
- Run `npm install` in both root and server directories

**Can't Access Admin Dashboard:**
- Make sure you're logged in as admin
- Check that your user has role: "admin"
