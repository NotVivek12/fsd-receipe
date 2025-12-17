import React from 'react';
import Icons from './Icons';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onView, onEdit, onDelete, isAdmin }) => {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="recipe-card">
      {recipe.imageUrl && (
        <div className="recipe-image">
          <img src={recipe.imageUrl} alt={recipe.title} />
        </div>
      )}
      <div className="recipe-content">
        <div className="recipe-header">
          <h3>{recipe.title}</h3>
          <span className={`difficulty-badge ${recipe.difficulty?.toLowerCase()}`}>
            {recipe.difficulty}
          </span>
        </div>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-meta">
          <span className="meta-item">
            <Icons.Clock /> {totalTime} min
          </span>
          <span className="meta-item">
            <Icons.Serving /> {recipe.servings} servings
          </span>
          <span className="meta-item">
            <Icons.Category /> {recipe.category}
          </span>
        </div>
        <div className="recipe-actions">
          <button className="btn-view" onClick={() => onView(recipe)}>
            <Icons.Eye />
            <span>View Recipe</span>
          </button>
          {isAdmin && (
            <>
              <button className="btn-edit" onClick={() => onEdit(recipe)}>
                <Icons.Edit />
                <span>Edit</span>
              </button>
              <button className="btn-delete" onClick={() => onDelete(recipe._id)}>
                <Icons.Trash />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
