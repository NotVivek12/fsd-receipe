import React, { useState, useEffect, useCallback } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import { recipeAPI } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    search: '',
  });

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.search) params.search = filters.search;

      const response = await recipeAPI.getAllRecipes(params);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Discover Amazing Recipes</h1>
        <p>Explore delicious recipes from around the world</p>
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
            <p>Try adjusting your filters or check back later!</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onView={setSelectedRecipe}
                isAdmin={false}
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
    </div>
  );
};

export default HomePage;
