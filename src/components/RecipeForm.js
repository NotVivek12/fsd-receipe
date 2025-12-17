import React, { useState, useEffect } from 'react';
import Icons from './Icons';
import './RecipeForm.css';

const RecipeForm = ({ recipe, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    prepTime: '',
    cookTime: '',
    servings: '',
    category: 'Other',
    difficulty: 'Medium',
    imageUrl: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        category: recipe.category,
        difficulty: recipe.difficulty,
        imageUrl: recipe.imageUrl || '',
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty strings
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(i => i.trim()),
      instructions: formData.instructions.filter(i => i.trim()),
      prepTime: Number(formData.prepTime),
      cookTime: Number(formData.cookTime),
      servings: Number(formData.servings),
    };

    onSubmit(cleanedData);
  };

  return (
    <div className="modal-overlay">
      <div className="form-modal-content">
        <button className="close-btn" onClick={onClose}>
          <Icons.Close />
        </button>
        <h2>{recipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
        
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Recipe title"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Brief description of the recipe"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Beverage">Beverage</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty *</label>
              <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Prep Time (minutes) *</label>
              <input
                type="number"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Cook Time (minutes) *</label>
              <input
                type="number"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Servings *</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="array-section">
            <label>Ingredients *</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange(index, 'ingredients', e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  required
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeArrayItem(index, 'ingredients')}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn-add-item"
              onClick={() => addArrayItem('ingredients')}
            >
              + Add Ingredient
            </button>
          </div>

          <div className="array-section">
            <label>Instructions *</label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="array-item">
                <textarea
                  value={instruction}
                  onChange={(e) => handleArrayChange(index, 'instructions', e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  rows="2"
                  required
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeArrayItem(index, 'instructions')}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn-add-item"
              onClick={() => addArrayItem('instructions')}
            >
              + Add Step
            </button>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {recipe ? 'Update Recipe' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
