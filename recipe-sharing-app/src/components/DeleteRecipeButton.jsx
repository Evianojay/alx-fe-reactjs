// src/components/DeleteRecipeButton.jsx
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  return (
    <button onClick={() => deleteRecipe(id)}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
