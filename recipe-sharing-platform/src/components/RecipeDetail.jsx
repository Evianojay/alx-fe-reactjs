import React from "react";
import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams(); // ✅ get recipe ID from URL
  const recipe = recipesData.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center text-red-500">
          Recipe not found ❌
        </h2>
        <div className="text-center mt-4">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.title}</h1>

      {/* Image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg mb-6"
      />

      {/* Summary */}
      <p className="text-gray-700 text-lg mb-6 text-center">{recipe.summary}</p>

      {/* Ingredients */}
      <div className="bg-gray-100 rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">🛒 Ingredients</h2>
        <ul className="list-disc list-inside space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-gray-100 rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">👩‍🍳 Instructions</h2>
        <ol className="list-decimal list-inside space-y-3">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="text-gray-700">
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Back button */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
