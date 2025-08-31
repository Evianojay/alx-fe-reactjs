import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { videoLibrary } from "../utils/videoLibrary";

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const response = await fetch(
          "https://wger.de/api/v2/exerciseinfo/?limit=50&language=2&status=2"
        );
        const data = await response.json();

        if (data?.results?.length > 0) {
          const processedExercises = data.results.map((exercise) => {
            const translation =
              exercise.translations?.find((t) => t.language === 2) ||
              exercise.translations?.[0];
            let description = translation?.description || "No description available";
            description = description.replace(/<[^>]*>/g, "").trim() || "No description available";

            const name = translation?.name || "Unknown Exercise";

            return {
              id: exercise.id || Math.random(),
              name,
              description,
              category: exercise.category?.name || "General",
              muscles:
                exercise.muscles?.map((m) => m.name_en || m.name).join(", ") || "Various",
              equipment:
                exercise.equipment?.map((e) => e.name).join(", ") || "None",
              videoUrl: videoLibrary[name] || null // ✅ attach video if exists
            };
          });

          setExercises(processedExercises);
          setFilteredExercises(processedExercises);
        } else {
          throw new Error("No exercises found");
        }
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError(err.message);

        // ✅ Fallback with demo videos
        const fallbackExercises = [
          {
            id: 1,
            name: "Push-ups",
            description: "Bodyweight chest exercise",
            category: "Chest",
            muscles: "Chest, Shoulders, Triceps",
            equipment: "None",
            videoUrl: videoLibrary["Push-ups"]
          },
          {
            id: 2,
            name: "Squats",
            description: "Lower body strength exercise",
            category: "Legs",
            muscles: "Quadriceps, Glutes",
            equipment: "None",
            videoUrl: videoLibrary["Squats"]
          },
          {
            id: 3,
            name: "Planks",
            description: "Core stabilization exercise",
            category: "Core",
            muscles: "Abs, Core",
            equipment: "None",
            videoUrl: videoLibrary["Planks"]
          }
        ];

        setExercises(fallbackExercises);
        setFilteredExercises(fallbackExercises);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredExercises(exercises);
      return;
    }
    const filtered = exercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(query.toLowerCase()) ||
        exercise.muscles.toLowerCase().includes(query.toLowerCase()) ||
        exercise.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises(
        exercises.filter(
          (exercise) => exercise.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const categories = ["all", ...new Set(exercises.map((e) => e.category))];

  if (loading) return <LoadingSpinner message="Loading exercises..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-cyan-300 px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow mb-8">
        🏋️ Exercise Database
      </h1>

      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
          <p className="text-red-400">⚠️ API Error: {error}</p>
          <p className="text-sm text-gray-300">Showing fallback exercises with videos.</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search exercises by name, muscle, or equipment..."
          className="max-w-2xl mx-auto"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                selectedCategory === category
                  ? "bg-cyan-500 text-black font-bold shadow"
                  : "bg-black/40 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50"
              }`}
            >
              {category === "all" ? "All Categories" : category}
            </button>
          ))}
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-black/40 border border-cyan-500/30 rounded-lg p-6 shadow hover:scale-105 transition"
            >
              <h2 className="text-xl font-bold text-cyan-300 mb-2">{exercise.name}</h2>
              <p className="text-sm text-gray-300 mb-4">{exercise.description}</p>
              <p className="text-xs text-purple-400">Category: {exercise.category}</p>
              <p className="text-xs text-green-400">Muscles: {exercise.muscles}</p>
              {exercise.equipment && exercise.equipment !== "None" && (
                <p className="text-xs text-yellow-400">Equipment: {exercise.equipment}</p>
              )}

              {/* ✅ Embedded YouTube Video */}
              {exercise.videoUrl && (
                <div className="mt-4 aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={exercise.videoUrl}
                    title={exercise.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
