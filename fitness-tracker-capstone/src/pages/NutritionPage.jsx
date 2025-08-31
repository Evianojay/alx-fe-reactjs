import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const NutritionPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchNutrition = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://wger.de/api/v2/ingredient/?search=${encodeURIComponent(query)}&language=2&limit=50`
      );
      const data = await response.json();
      setResults(
        data.results.map((item) => ({
          id: item.id,
          name: item.name,
          energy: item.energy || 0,
          protein: item.protein || 0,
          fat: item.fat || 0,
          carbohydrates: item.carbohydrates || 0,
        }))
      );
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-cyan-300 px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow mb-8">
        🍎 Nutrition Database
      </h1>

      <div className="flex gap-3 max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search food (e.g., chicken, rice)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchNutrition()}
          className="flex-1 px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100"
        />
        <button
          onClick={searchNutrition}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && <LoadingSpinner message="Searching..." />}

      {!loading && results.length > 0 && (
        <div className="grid gap-4 max-w-4xl mx-auto">
          {results.map((item) => (
            <div key={item.id} className="bg-black/40 border border-cyan-500/30 rounded-lg p-4">
              <h3 className="text-xl font-bold text-cyan-300">{item.name}</h3>
              <p className="text-gray-300 text-sm">Calories: {item.energy} kcal</p>
              <p className="text-gray-300 text-sm">Protein: {item.protein} g</p>
              <p className="text-gray-300 text-sm">Fat: {item.fat} g</p>
              <p className="text-gray-300 text-sm">Carbs: {item.carbohydrates} g</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NutritionPage;
