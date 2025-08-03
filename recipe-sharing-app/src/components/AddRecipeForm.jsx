// src/components/AddRecipeForm.jsx
import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    addRecipe({ id, title, ingredients, instructions });
    setTitle('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add a New Recipe</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Creamy Garlic Pasta"
        required
      />

      <label htmlFor="ingredients">Ingredients</label>
      <textarea
        id="ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="List each ingredient separated by a comma"
        required
      />

      <label htmlFor="instructions">Instructions</label>
      <textarea
        id="instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Step-by-step preparation instructions"
        required
      />

      <button type="submit" className="btn-primary">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
