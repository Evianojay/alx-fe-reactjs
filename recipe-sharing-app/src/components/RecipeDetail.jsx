// src/components/RecipeDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe, deleteRecipe } = useRecipeStore();

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const handleDelete = () => {
    deleteRecipe(id);
    navigate('/');
  };

  const handleEdit = () => {
    const newTitle = prompt('Enter new title', recipe.title);
    const newInstructions = prompt('Enter new instructions', recipe.instructions);
    if (newTitle && newInstructions) {
      updateRecipe({ ...recipe, title: newTitle, instructions: newInstructions });
      navigate('/');
    }
  };

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.instructions}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default RecipeDetails;
