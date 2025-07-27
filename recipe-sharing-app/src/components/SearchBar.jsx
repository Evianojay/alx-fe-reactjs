// src/components/SearchBar.jsx
import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const recipes = useRecipeStore((state) => state.recipes);
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  const handleSearch = () => {
    const filtered = recipes.filter((r) =>
      r.title.toLowerCase().includes(query.toLowerCase())
    );
    setRecipes(filtered);
  };

  return (
    <div>
      <input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
