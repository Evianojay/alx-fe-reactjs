// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  if (!recipes.length) return <p>No recipes yet.</p>;

  return (
    <ul>
      {recipes.map((r) => (
        <li key={r.id}>
          <Link to={`/recipe/${r.id}`}>{r.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
