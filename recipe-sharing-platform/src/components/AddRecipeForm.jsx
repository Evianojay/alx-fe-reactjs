import React, { useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !ingredients || !steps) {
      setError("All fields are required.");
      return;
    }

    if (ingredients.split(",").length < 2) {
      setError("Please list at least two ingredients (comma-separated).");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      summary: steps.substring(0, 80) + "...", // short preview
      ingredients: ingredients.split(","),
      steps,
      image: "/images/default.jpg" // placeholder if no upload
    };

    onAddRecipe(newRecipe);

    // Reset form
    setTitle("");
    setIngredients("");
    setSteps("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Add New Recipe
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-gray-700 font-medium">Recipe Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          placeholder="E.g., Jollof Rice"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Ingredients</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          rows="3"
          placeholder="List ingredients, separated by commas"
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Preparation Steps</label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          rows="4"
          placeholder="Describe how to prepare this recipe"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Submit Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
