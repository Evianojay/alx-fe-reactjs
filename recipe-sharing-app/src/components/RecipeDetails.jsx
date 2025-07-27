// src/components/RecipeDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import { useState } from 'react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipes = useRecipeStore(state => state.recipes);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const recipe = recipes.find(r => r.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe || {});

  if (!recipe) return <p>Recipe not found</p>;

  const handleDelete = () => {
    deleteRecipe(id);
    navigate('/');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditedRecipe({
      ...editedRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    updateRecipe(editedRecipe);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            name="title"
            value={editedRecipe.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editedRecipe.description}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <button onClick={handleEditToggle}>Edit</button>
        </>
      )}
      <button onClick={handleDelete} style={{ color: 'red' }}>
        Delete
      </button>
    </div>
  );
};

export default RecipeDetail;
