# Recipe Sharing App - MERN Stack

A full-featured recipe sharing application built with MongoDB, Express, React, and Node.js. This application allows **everyone to browse recipes without login**, while **admins can access a special dashboard** via `/admin` route to perform CRUD operations.

## Features

### Public Features (No Login Required)
- 👀 **Browse Recipes**: View all recipes without authentication
- 🔍 **Search & Filter**: Find recipes by category, difficulty, or keywords
- � **Detailed View**: See complete recipe details including ingredients, instructions, prep time, and cook time
- 📱 **Responsive Design**: Mobile-friendly interface
- 🚀 **Instant Access**: No registration or login needed for browsing

### Admin Features (Login Required at `/admin`)
- 🔐 **Secure Admin Login**: Access via `/admin` route only
- ➕ **Create Recipes**: Add new recipes with full details
- ✏️ **Edit Recipes**: Update existing recipes
- 🗑️ **Delete Recipes**: Remove recipes from the database
- � **Dashboard Statistics**: View recipe counts by category
- 🎯 **Full CRUD Operations**: Complete recipe management

### Authentication
- � **Admin-Only Login**: JWT-based authentication for administrators
- �️ **Role-based Access**: Protected routes for admin operations
- 🎭 **Public Access**: No login required for regular users

## Tech Stack

### Frontend
- React 19.2
- Axios for API calls
- Context API for state management
- CSS3 for styling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `server/.env` file
   - Update `MONGODB_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure secret key

4. Start MongoDB (if running locally):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

5. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the root directory (if you're in server folder):
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## CI/CD and deployment

This repository includes container, Jenkins, Ansible, and Kubernetes configuration:

- `Dockerfile` builds the React frontend and serves it with Nginx.
- `server/Dockerfile` packages the Express API.
- `Jenkinsfile` runs tests, publishes both images, and rolls them out to Kubernetes.
- `ansible/site.yml` installs the deployment tools and applies the Kubernetes manifests.
- `k8s/` contains the frontend, backend, MongoDB, services, and ingress resources.

### Jenkins setup

Create these Jenkins credentials before running the pipeline:

- `recipe-registry`: a Jenkins username/password credential for the container registry
- `recipe-mongodb-uri`: the MongoDB connection string
- `recipe-jwt-secret`: a strong JWT signing secret

The Jenkins agent must have Docker, `kubectl`, and access to the target Kubernetes cluster. Set the `REGISTRY` build parameter to the registry/repository prefix (for example `ghcr.io/your-org`). The pipeline uses the `recipe` namespace and an Nginx ingress controller.

### Ansible setup

Replace the example host in `ansible/inventory.ini`, then provide secrets through environment variables and run:

```bash
export RECIPE_MONGODB_URI='mongodb://recipe-mongodb:27017/recipeDB'
export RECIPE_JWT_SECRET='replace-with-a-long-random-secret'
ansible-playbook -i ansible/inventory.ini ansible/site.yml
```

The target host must already have credentials configured for its Kubernetes cluster. The example MongoDB workload uses ephemeral storage; use a managed MongoDB service or replace `emptyDir` in `k8s/mongodb.yaml` with a persistent volume for production.

## Usage

### For Everyone (No Login Required)

1. Visit `http://localhost:3000`
2. Browse all available recipes
3. Use search and filters to find specific recipes
4. Click **View Recipe** to see full details
5. Enjoy cooking! 🍳

### For Administrators

1. Navigate to `http://localhost:3000/admin`
2. Login with admin credentials
3. Access the admin dashboard with statistics
4. Click **+ Add Recipe** to create a new recipe
5. Click **Edit** on any recipe card to modify it
6. Click **Delete** on any recipe card to remove it

### Creating Your First Admin Account

**Using API (Postman or PowerShell):**

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"username":"admin","email":"admin@example.com","password":"admin123","role":"admin"}'
```

**Or using cURL:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123","role":"admin"}'
```

## Project Structure

```
recipe/
├── server/                 # Backend
│   ├── models/            # MongoDB models
│   │   ├── User.js
│   │   └── Recipe.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   └── recipes.js
│   ├── middleware/        # Authentication middleware
│   │   └── auth.js
│   ├── .env              # Environment variables
│   ├── server.js         # Entry point
│   └── package.json
│
├── src/                   # Frontend
│   ├── components/       # React components
│   │   ├── Navbar.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── RecipeCard.js
│   │   ├── RecipeModal.js
│   │   └── RecipeForm.js
│   ├── context/          # Context API
│   │   └── AuthContext.js
│   ├── services/         # API services
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── public/
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)

### Recipes
- `GET /api/recipes` - Get all recipes (public)
- `GET /api/recipes/:id` - Get single recipe (public)
- `POST /api/recipes` - Create recipe (admin only)
- `PUT /api/recipes/:id` - Update recipe (admin only)
- `DELETE /api/recipes/:id` - Delete recipe (admin only)

## Sample Data

Here's a sample recipe you can create:

**Title**: Classic Chocolate Chip Cookies

**Description**: Delicious homemade chocolate chip cookies that are crispy on the outside and chewy on the inside.

**Category**: Dessert

**Difficulty**: Easy

**Prep Time**: 15 minutes

**Cook Time**: 12 minutes

**Servings**: 24 cookies

**Ingredients**:
- 2 1/4 cups all-purpose flour
- 1 tsp baking soda
- 1 cup butter, softened
- 3/4 cup sugar
- 2 large eggs
- 2 cups chocolate chips

**Instructions**:
1. Preheat oven to 375°F
2. Mix flour and baking soda in a bowl
3. Cream butter and sugar until fluffy
4. Add eggs one at a time
5. Gradually stir in flour mixture
6. Fold in chocolate chips
7. Drop spoonfuls onto baking sheet
8. Bake for 10-12 minutes until golden

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Protected routes for admin operations
- Input validation on both frontend and backend

## Future Enhancements

- Image upload functionality
- User ratings and reviews
- Favorite recipes
- Recipe categories management
- Print recipe feature
- Social sharing

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using the MERN Stack
