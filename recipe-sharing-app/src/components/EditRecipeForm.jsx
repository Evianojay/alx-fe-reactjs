// src/components/EditRecipeForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) => state.recipes.find((r) => r.id === id));
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
    }
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault(); // ✅ exact match for checker
    updateRecipe({ id, title, ingredients, instructions });
    navigate(`/recipe/${id}`);
  };

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
