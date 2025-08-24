// src/services/wgerService.js
import axios from "axios";

export async function fetchExercises() {
  const url = "https://wger.de/api/v2/exerciseinfo/?limit=100&language=2&status=2";

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Full API Response:", response.data); // Debug log

    const exercises = response.data?.results;

    if (Array.isArray(exercises) && exercises.length > 0) {
      // Process and clean the data
      const processedExercises = exercises.map(exercise => ({
        id: exercise.id,
        name: exercise.name || "Unnamed Exercise",
        description: exercise.description || exercise.text || "No description available",
        category: exercise.category,
        muscles: exercise.muscles || [],
        muscles_secondary: exercise.muscles_secondary || [],
        equipment: exercise.equipment || []
      }));
      
      console.log("Processed exercises:", processedExercises); // Debug log
      return processedExercises;
    } else {
      console.warn("⚠️ No exercises found in API response.");
      return getFallbackExercises();
    }
  } catch (error) {
    console.error("❌ Error fetching WGER exercises:", error.message);
    return getFallbackExercises();
  }
}

function getFallbackExercises() {
  return [
    {
      id: 1,
      name: "Push-ups",
      description: "A bodyweight exercise targeting chest, shoulders, and triceps. Start in a plank position and lower your body until your chest nearly touches the floor, then push back up.",
    },
    {
      id: 2,
      name: "Squats",
      description: "A lower body exercise targeting quadriceps and glutes. Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then return to standing.",
    },
    {
      id: 3,
      name: "Plank",
      description: "A core strengthening exercise. Hold your body in a straight line from head to heels, supporting your weight on your forearms and toes.",
    },
    {
      id: 4,
      name: "Burpees",
      description: "A full-body exercise combining a squat, plank, push-up, and jump. Great for cardiovascular fitness and strength training.",
    },
    {
      id: 5,
      name: "Lunges",
      description: "A unilateral leg exercise. Step forward into a lunge position, lowering your back knee toward the ground, then return to standing.",
    }
  ];
}