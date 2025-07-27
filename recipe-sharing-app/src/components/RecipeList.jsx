// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filtered.length) return <p>No recipes found.</p>;

  return (
    <ul>
      {filtered.map((r) => (
        <li key={r.id}>
          <Link to={`/recipe/${r.id}`}>{r.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
