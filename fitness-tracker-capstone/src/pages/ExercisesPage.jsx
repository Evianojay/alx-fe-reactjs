// src/pages/ExercisesPage.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { videoLibrary } from "../utils/videoLibrary";
import { fetchExercises } from "../services/wgerService";

/**
 * ExercisesPage
 * - fetches exercises via wgerService (with abort support)
 * - shows categories, search, and embedded video when available
 */
export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let canceled = false;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setErrorMsg("");
      try {
        const results = await fetchExercises({ limit: 100, signal: controller.signal });
        if (canceled) return;
        setExercises(results);
        setFilteredExercises(results);
      } catch (err) {
        if (err?.name === "CanceledError" || err?.message === "canceled") {
          // request was canceled — nothing to do
          return;
        }
        console.error("[ExercisesPage] load error:", err);
        setErrorMsg("Could not load exercises from API. Showing fallback set.");
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    load();
    return () => {
      canceled = true;
      controller.abort();
    };
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredExercises(exercises);
      return;
    }
    const q = query.toLowerCase();
    const filtered = exercises.filter((ex) =>
      (ex.name || "").toLowerCase().includes(q) ||
      (ex.muscles || "").toLowerCase().includes(q) ||
      (ex.category || "").toLowerCase().includes(q)
    );
    setFilteredExercises(filtered);
  };

  // categories from exercises (unique + "All")
  const categories = ["All", ...Array.from(new Set(exercises.map(e => (e.category || "General"))))];

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredExercises(exercises);
      return;
    }
    setFilteredExercises(exercises.filter(e => (e.category || "General").toLowerCase() === category.toLowerCase()));
  };

  if (loading) return <LoadingSpinner message="Loading exercises..." />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-cyan-300 px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">🏋️ Exercise Database</h1>

      {errorMsg && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
          <p className="text-red-400">⚠️ {errorMsg}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <SearchBar onSearch={handleSearch} placeholder="Search by name, muscle, or category..." className="max-w-2xl mx-auto" />

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => handleCategoryFilter(c)}
              className={`px-4 py-2 rounded-full text-sm transition ${selectedCategory === c ? "bg-cyan-500 text-black font-bold" : "bg-black/40 border border-cyan-500/30 text-cyan-300"}`}
              aria-pressed={selectedCategory === c}
            >
              {c}
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredExercises.map((exercise) => (
            <article key={exercise.id} className="bg-black/40 border border-cyan-500/30 rounded-lg p-6 shadow hover:scale-105 transition">
              <h2 className="text-xl font-bold text-cyan-300 mb-2">{exercise.name}</h2>
              <p className="text-sm text-gray-300 mb-4">{exercise.description}</p>
              <p className="text-xs text-purple-400">Category: {exercise.category}</p>
              <p className="text-xs text-green-400">Muscles: {exercise.muscles}</p>
              {exercise.equipment && exercise.equipment !== "None" && (
                <p className="text-xs text-yellow-400">Equipment: {exercise.equipment}</p>
              )}

              {videoLibrary[exercise.name] && (
                <div className="mt-4 aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={videoLibrary[exercise.name]}
                    title={`${exercise.name} video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
