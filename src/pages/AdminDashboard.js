import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import RecipeForm from '../components/RecipeForm';
import UserForm from '../components/UserForm';
import Icons from '../components/Icons';
import Toast from '../components/Toast';
import ConfirmToast from '../components/ConfirmToast';
import { useToast } from '../hooks/useToast';
import { recipeAPI, authAPI } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = ({ onAddRecipeClick }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    dessert: 0,
  });
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    search: '',
  });

  const { toasts, showToast, hideToast, confirmToast, showConfirm } = useToast();

  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.search) params.search = filters.search;

      const response = await recipeAPI.getAllRecipes(params);
      setRecipes(response.data);
      
      // Calculate stats
      const allRecipes = await recipeAPI.getAllRecipes({});
      const total = allRecipes.data.length;
      const breakfast = allRecipes.data.filter(r => r.category === 'Breakfast').length;
      const lunch = allRecipes.data.filter(r => r.category === 'Lunch').length;
      const dinner = allRecipes.data.filter(r => r.category === 'Dinner').length;
      const dessert = allRecipes.data.filter(r => r.category === 'Dessert').length;
      
      setStats({ total, breakfast, lunch, dinner, dessert });
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleAddRecipe = async (recipeData) => {
    try {
      await recipeAPI.createRecipe(recipeData);
      setShowRecipeForm(false);
      setEditingRecipe(null);
      fetchRecipes();
      showToast('Recipe created successfully!', 'success');
    } catch (error) {
      console.error('Error creating recipe:', error);
      showToast('Failed to create recipe. Please try again.', 'error');
    }
  };

  const handleUpdateRecipe = async (recipeData) => {
    try {
      await recipeAPI.updateRecipe(editingRecipe._id, recipeData);
      setShowRecipeForm(false);
      setEditingRecipe(null);
      fetchRecipes();
      showToast('Recipe updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating recipe:', error);
      showToast('Failed to update recipe. Please try again.', 'error');
    }
  };

  const handleDeleteRecipe = async (id) => {
    showConfirm('Are you sure you want to delete this recipe?', async () => {
      try {
        await recipeAPI.deleteRecipe(id);
        fetchRecipes();
        showToast('Recipe deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting recipe:', error);
        showToast('Failed to delete recipe. Please try again.', 'error');
      }
    });
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowRecipeForm(true);
  };

  const handleAddUser = async (userData) => {
    try {
      await authAPI.register(userData);
      setShowUserForm(false);
      showToast(`User "${userData.username}" created successfully!`, 'success');
    } catch (error) {
      console.error('Error creating user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create user. Please try again.';
      showToast(errorMessage, 'error');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setEditingRecipe(null);
    setShowRecipeForm(true);
  };

  // Pass the handleAddClick to parent
  useEffect(() => {
    if (onAddRecipeClick) {
      onAddRecipeClick.current = handleAddClick;
    }
  }, [onAddRecipeClick]);

  return (
    <div className="admin-dashboard">
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Icons.Stats />
          </div>
          <div className="stat-info">
            <h3>Total Recipes</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icons.Sunrise />
          </div>
          <div className="stat-info">
            <h3>Breakfast</h3>
            <p className="stat-value">{stats.breakfast}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icons.Utensils />
          </div>
          <div className="stat-info">
            <h3>Lunch</h3>
            <p className="stat-value">{stats.lunch}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icons.Moon />
          </div>
          <div className="stat-info">
            <h3>Dinner</h3>
            <p className="stat-value">{stats.dinner}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icons.Cake />
          </div>
          <div className="stat-info">
            <h3>Dessert</h3>
            <p className="stat-value">{stats.dessert}</p>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <button className="btn-add-user" onClick={() => setShowUserForm(true)}>
          <Icons.Users />
          <span>Add User</span>
        </button>
      </div>

      <div className="filters-section">
        <div className="filters-container">
          <input
            type="text"
            name="search"
            placeholder="Search recipes..."
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Beverage">Beverage</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="recipes-container">
        {loading ? (
          <div className="loading">Loading recipes...</div>
        ) : recipes.length === 0 ? (
          <div className="no-recipes">
            <h3>No recipes found</h3>
            <p>Click the "+ Add Recipe" button to create your first recipe!</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onView={setSelectedRecipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
                isAdmin={true}
              />
            ))}
          </div>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {showRecipeForm && (
        <RecipeForm
          recipe={editingRecipe}
          onSubmit={editingRecipe ? handleUpdateRecipe : handleAddRecipe}
          onClose={() => {
            setShowRecipeForm(false);
            setEditingRecipe(null);
          }}
        />
      )}

      {showUserForm && (
        <UserForm
          onSubmit={handleAddUser}
          onClose={() => setShowUserForm(false)}
        />
      )}

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => hideToast(toast.id)}
        />
      ))}

      {/* Confirmation Toast */}
      {confirmToast && (
        <ConfirmToast
          message={confirmToast.message}
          onConfirm={confirmToast.onConfirm}
          onCancel={confirmToast.onCancel}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
