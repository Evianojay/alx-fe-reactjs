// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((r) => (
          <li key={r.id}>
            <Link to={`/recipe/${r.id}`}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
