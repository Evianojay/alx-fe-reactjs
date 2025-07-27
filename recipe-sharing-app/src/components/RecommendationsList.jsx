// src/components/RecommendationsList.jsx
import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const recommendations = useRecipeStore((state) => state.recommendations);
  const setRecommendations = useRecipeStore((state) => state.setRecommendations);

  useEffect(() => {
    const recommended = recipes.filter((r) => r.prepTime < 30);
    setRecommendations(recommended);
  }, [recipes]); // ✅ Don't depend on `recommendations`

  if (!recommendations.length) return null;

  return (
    <div>
      <h2>Recommended Recipes</h2>
      <ul>
        {recommendations.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsList;
