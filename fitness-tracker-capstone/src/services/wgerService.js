// src/services/wgerService.js
import axios from "axios";

/**
 * Fetch exercises from WGER API.
 * Returns processed array or fallback.
 * Accepts optional { signal } for request cancellation (AbortController.signal).
 */
export async function fetchExercises({ limit = 100, signal = undefined } = {}) {
  const url = `https://wger.de/api/v2/exerciseinfo/?limit=${limit}&language=2&status=2`;
  try {
    const response = await axios.get(url, {
      headers: { Accept: "application/json" },
      signal,
      timeout: 10000,
    });

    const results = response?.data?.results;
    if (!Array.isArray(results) || results.length === 0) {
      console.warn("[wgerService] No results, returning fallback");
      return getFallbackExercises();
    }

    // Process results to a friendly shape
    return results.map((exercise) => {
      const translation =
        (exercise.translations && exercise.translations.find((t) => t.language === 2)) ||
        (exercise.translations && exercise.translations[0]) ||
        null;

      let description = translation?.description || exercise.description || "";
      // strip html tags
      description = description.replace(/<[^>]*>/g, "").trim() || "No description available";

      const name = translation?.name || exercise.name || "Unnamed Exercise";

      return {
        id: exercise.id ?? Math.random(),
        name,
        description,
        category: exercise.category?.name || "General",
        muscles: Array.isArray(exercise.muscles) ? exercise.muscles.map(m => m.name || m.name_en || "").join(", ") : "Various",
        equipment: Array.isArray(exercise.equipment) ? exercise.equipment.map(e => e.name).join(", ") : "None",
      };
    });
  } catch (err) {
    // axios may throw on cancel; if it's an abort, just rethrow so caller can ignore
    if (axios.isCancel && axios.isCancel(err)) {
      console.info("[wgerService] request canceled");
      throw err;
    }
    console.error("[wgerService] fetch error:", err?.message ?? err);
    return getFallbackExercises();
  }
}

function getFallbackExercises() {
  // small curated fallback
  return [
    {
      id: 1,
      name: "Push-ups",
      description: "Bodyweight exercise: chest, shoulders, triceps. Keep body straight and lower chest toward floor.",
      category: "Chest",
      muscles: "Chest, Shoulders, Triceps",
      equipment: "None",
    },
    {
      id: 2,
      name: "Squats",
      description: "Lower body exercise targeting quads and glutes. Push hips back and keep knees tracking toes.",
      category: "Legs",
      muscles: "Quadriceps, Glutes",
      equipment: "None",
    },
    {
      id: 3,
      name: "Plank",
      description: "Isometric core hold. Maintain a straight line from head to heels.",
      category: "Core",
      muscles: "Abs",
      equipment: "None",
    },
  ];
}
