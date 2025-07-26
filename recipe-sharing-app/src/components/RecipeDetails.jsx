// src/components/RecipeDetails.jsx
import React from 'react';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import UpdateRecipeForm from './UpdateRecipeForm';
import { useState } from 'react';

const RecipeDetails = () => {
  const selectedRecipeId = useRecipeStore(state => state.selectedRecipeId);
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === selectedRecipeId)
  );

  const [isEditing, setIsEditing] = useState(false);

  if (!recipe) {
    return <p>No recipe selected</p>;
  }

  return (
    <div>
      {isEditing ? (
        <EditRecipeForm recipe={recipe} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <DeleteRecipeButton id={recipe.id} />
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
