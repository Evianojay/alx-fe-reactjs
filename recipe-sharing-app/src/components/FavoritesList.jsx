// src/components/FavoritesList.jsx
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  if (!favoriteRecipes.length) return null;

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favoriteRecipes.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
