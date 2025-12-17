import React from 'react';
import Icons from './Icons';
import './RecipeModal.css';

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <Icons.Close />
        </button>
        
        {recipe.imageUrl && (
          <div className="modal-image">
            <img src={recipe.imageUrl} alt={recipe.title} />
          </div>
        )}

        <div className="modal-body">
          <div className="modal-header">
            <h2>{recipe.title}</h2>
            <span className={`difficulty-badge ${recipe.difficulty?.toLowerCase()}`}>
              {recipe.difficulty}
            </span>
          </div>

          <p className="modal-description">{recipe.description}</p>

          <div className="recipe-info-grid">
            <div className="info-item">
              <span className="info-label">Prep Time</span>
              <span className="info-value">{recipe.prepTime} min</span>
            </div>
            <div className="info-item">
              <span className="info-label">Cook Time</span>
              <span className="info-value">{recipe.cookTime} min</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Time</span>
              <span className="info-value">{totalTime} min</span>
            </div>
            <div className="info-item">
              <span className="info-label">Servings</span>
              <span className="info-value">{recipe.servings}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Category</span>
              <span className="info-value">{recipe.category}</span>
            </div>
          </div>

          <div className="section">
            <h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="1" x2="6" y2="4"/>
                <line x1="10" y1="1" x2="10" y2="4"/>
                <line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
              Ingredients
            </h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h3>
              <Icons.Chef />
              Instructions
            </h3>
            <ol className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          {recipe.createdBy && (
            <div className="recipe-author">
              <em>Recipe by: {recipe.createdBy.username}</em>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
