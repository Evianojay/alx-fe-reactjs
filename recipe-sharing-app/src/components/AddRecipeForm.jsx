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
    <form onSubmit={handleSubmit}>
      <h2>Add Recipe</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" required />
      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" required />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddRecipeForm;
