import React, { useState } from "react";

const AddRecipeForm = ({ addRecipe }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!summary) newErrors.summary = "Summary is required";
    if (!ingredients) newErrors.ingredients = "Ingredients are required";
    if (!steps) newErrors.steps = "Steps are required";
    if (!image) newErrors.image = "Image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newRecipe = {
      id: Date.now(),
      title,
      summary,
      ingredients,
      steps,
      image,
    };
    addRecipe(newRecipe);

    setTitle("");
    setSummary("");
    setIngredients("");
    setSteps("");
    setImage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Add a New Recipe
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Summary */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Summary</label>
        <textarea
          className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        {errors.summary && (
          <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
        )}
      </div>

      {/* Ingredients */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Ingredients</label>
        <textarea
          className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        {errors.ingredients && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
        )}
      </div>

      {/* Steps */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Steps</label>
        <textarea
          className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        {errors.steps && (
          <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
        )}
      </div>

      {/* Image */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Image URL</label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-200"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
