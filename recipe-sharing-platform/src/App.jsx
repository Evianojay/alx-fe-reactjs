import React, { useState, useEffect } from "react";
import AddRecipeForm from "./components/AddRecipeForm";
import data from "./data.json";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(data);
  }, []);

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  return (
    <div className="p-6">
      <AddRecipeForm onAddRecipe={handleAddRecipe} />

      <h1 className="text-3xl font-bold mt-10 mb-4">Recipe List</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white shadow rounded-md p-4">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{recipe.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
