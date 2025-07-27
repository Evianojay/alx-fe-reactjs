import { useState } from 'react';
import useRecipeStore from './recipeStore';

function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    addRecipe({ id: Date.now(), title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter recipe title"
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;
