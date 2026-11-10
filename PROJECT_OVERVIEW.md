# 🍳 Recipe Sharing MERN App - Complete Overview

## ✅ What Has Been Created

A **full-stack MERN application** with complete CRUD operations, authentication, and role-based access control.

### 🎯 Key Features Implemented

#### For Users (Normal Accounts)
- ✓ View all recipes
- ✓ Search recipes by keyword
- ✓ Filter by category (Breakfast, Lunch, Dinner, Dessert, etc.)
- ✓ Filter by difficulty (Easy, Medium, Hard)
- ✓ View detailed recipe information
- ✓ See ingredients and step-by-step instructions

#### For Admins
- ✓ All user features +
- ✓ **CREATE** new recipes
- ✓ **READ** recipe details  
- ✓ **UPDATE** existing recipes
- ✓ **DELETE** recipes
- ✓ Admin badge display
- ✓ Protected routes

### 📁 Project Structure

```
recipe/
│
├── 📂 server/                  # Backend (Node.js + Express)
│   ├── 📂 models/
│   │   ├── User.js            # User schema with roles
│   │   └── Recipe.js          # Recipe schema
│   ├── 📂 routes/
│   │   ├── auth.js            # Login/Register/Get User
│   │   └── recipes.js         # CRUD operations
│   ├── 📂 middleware/
│   │   └── auth.js            # JWT & Admin verification
│   ├── server.js              # Express server setup
│   ├── .env                   # Environment variables
│   ├── seed.js                # Sample data script
│   ├── package.json           # Backend dependencies
│   └── .gitignore
│
├── 📂 src/                     # Frontend (React)
│   ├── 📂 components/
│   │   ├── Navbar.js          # Navigation with auth state
│   │   ├── Login.js           # Login modal
│   │   ├── Register.js        # Registration with role selection
│   │   ├── RecipeCard.js      # Recipe preview cards
│   │   ├── RecipeModal.js     # Full recipe details view
│   │   ├── RecipeForm.js      # Add/Edit recipe form
│   │   └── [CSS files]        # Styling for each component
│   ├── 📂 context/
│   │   └── AuthContext.js     # Global auth state
│   ├── 📂 services/
│   │   └── api.js             # Axios API calls
│   ├── App.js                 # Main app component
│   ├── App.css                # Global styles
│   └── index.js               # React entry point
│
├── 📂 public/
├── package.json               # Frontend dependencies
├── README.md                  # Full documentation
├── SETUP.md                   # Quick setup guide
├── setup.ps1                  # Auto-setup script
├── start-backend.ps1          # Backend start script
└── start-frontend.ps1         # Frontend start script
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React 19.2** - UI library
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## 🚀 How to Run

### Option 1: Automated Setup (Recommended)
```powershell
./setup.ps1
```

Then in two separate terminals:
```powershell
# Terminal 1
./start-backend.ps1

# Terminal 2  
./start-frontend.ps1
```

### Option 2: Manual Setup

**Backend:**
```powershell
cd server
npm install
npm run dev
```

**Frontend:**
```powershell
npm install
npm start
```

## 🔐 Authentication Flow

1. **Register** → Choose role (User/Admin) → Account created with hashed password
2. **Login** → Credentials verified → JWT token issued
3. **Token** → Stored in localStorage → Sent with each API request
4. **Middleware** → Verifies token → Checks admin role for protected routes

## 🔄 CRUD Operations (Admin Only)

### CREATE
- Click "Add Recipe" button (visible only to admins)
- Fill in form with all details
- Submit → New recipe saved to database

### READ
- All users can view recipes
- Click "View Recipe" to see full details

### UPDATE
- Click "Edit" button on recipe card (admin only)
- Modify fields in the form
- Submit → Recipe updated in database

### DELETE
- Click "Delete" button on recipe card (admin only)
- Confirm deletion
- Recipe removed from database

## 📊 Database Models

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: "user" | "admin",
  createdAt: Date
}
```

### Recipe Model
```javascript
{
  title: String,
  description: String,
  ingredients: [String],
  instructions: [String],
  prepTime: Number,
  cookTime: Number,
  servings: Number,
  category: Enum,
  difficulty: Enum,
  imageUrl: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Modern Gradient Navbar** - Eye-catching header
- **Card-based Layout** - Clean recipe cards
- **Modal Windows** - For login, register, recipe details, and forms
- **Search & Filters** - Real-time filtering
- **Smooth Animations** - Fade-in and slide-up effects
- **Color-coded Badges** - Difficulty levels with distinct colors

## 🔒 Security Features

- ✓ Password hashing with bcrypt (10 salt rounds)
- ✓ JWT tokens with expiration (7 days)
- ✓ Protected API routes
- ✓ Role-based access control
- ✓ Input validation
- ✓ CORS configuration
- ✓ Environment variables for secrets

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Create new account
- `POST /login` - User login
- `GET /me` - Get current user (requires auth)

### Recipes (`/api/recipes`)
- `GET /` - Get all recipes (public, supports filters)
- `GET /:id` - Get single recipe (public)
- `POST /` - Create recipe (admin only)
- `PUT /:id` - Update recipe (admin only)
- `DELETE /:id` - Delete recipe (admin only)

## 🎯 Testing the App

1. **Start both servers**
2. **Register an admin account**
3. **Login as admin**
4. **Add a recipe** using the form
5. **View the recipe** in the list
6. **Edit the recipe** - make changes
7. **Delete the recipe** - confirm deletion
8. **Logout and register as user**
9. **Login as user** - verify no edit/delete buttons appear
10. **Search and filter** recipes

## 📝 Sample Recipe Data

Use `server/seed.js` to populate the database with 5 sample recipes:
- Spaghetti Carbonara
- Fluffy Pancakes
- Fresh Garden Salad
- Chocolate Lava Cake
- Chicken Caesar Wrap

## 🐛 Common Issues & Solutions

**Issue:** MongoDB connection error  
**Solution:** Check if MongoDB is running, verify connection string in `.env`

**Issue:** Port already in use  
**Solution:** Change PORT in `server/.env` or kill the process

**Issue:** CORS error  
**Solution:** Backend already configured for `localhost:3000`

**Issue:** Token expired  
**Solution:** Logout and login again

**Issue:** Can't add recipes  
**Solution:** Make sure you're logged in as admin

## 📈 Future Enhancements

- [ ] Image upload with cloud storage (Cloudinary)
- [ ] User ratings and reviews
- [ ] Favorite recipes feature
- [ ] Recipe sharing on social media
- [ ] Print recipe functionality
- [ ] Recipe categories management
- [ ] Nutrition information
- [ ] Cooking timers
- [ ] Shopping list generator
- [ ] User profiles with avatar

## 💡 Tips for Customization

1. **Change colors:** Update CSS variables in component files
2. **Add categories:** Modify enum in `Recipe.js` model
3. **Change token expiration:** Update `expiresIn` in auth routes
4. **Add fields:** Extend the Recipe model and forms
5. **Modify filters:** Add more search options in API

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [JWT Introduction](https://jwt.io)

## ✨ Conclusion

You now have a **production-ready MERN stack application** with:
- ✅ Full CRUD operations
- ✅ User authentication
- ✅ Role-based authorization
- ✅ Responsive design
- ✅ RESTful API
- ✅ Secure password handling
- ✅ Professional UI/UX

**Happy coding! 🚀**
