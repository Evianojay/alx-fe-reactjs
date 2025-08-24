// src/pages/ExercisesPage.jsx
import React, { useEffect, useState } from "react";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        // Direct API call to get exercise data
        const response = await fetch('https://wger.de/api/v2/exerciseinfo/?limit=50&language=2&status=2');
        const data = await response.json();
        
        if (data && data.results && Array.isArray(data.results)) {
          const processedExercises = data.results.map(exercise => {
            // Find English translation (language ID 2)
            const englishTranslation = exercise.translations?.find(t => t.language === 2);
            
            // If no English translation, try any translation
            const fallbackTranslation = exercise.translations?.[0];
            const translation = englishTranslation || fallbackTranslation;
            
            // Clean up HTML description
            let description = translation?.description || 'No description available';
            if (description && description !== '') {
              // Remove HTML tags for cleaner display
              description = description.replace(/<[^>]*>/g, '').trim();
              if (description === '') {
                description = 'No description available';
              }
            }
            
            return {
              id: exercise.id || Math.random(),
              name: translation?.name || 'Unknown Exercise',
              description: description,
              category: exercise.category?.name || 'General',
              muscles: exercise.muscles?.map(m => m.name_en || m.name).join(', ') || 'Various',
              equipment: exercise.equipment?.map(e => e.name).join(', ') || 'None'
            };
          });
          
          setExercises(processedExercises);
        } else {
          // Use fallback data if API doesn't return expected results
          setExercises([
            {
              id: 1,
              name: "Push-ups",
              description: "A bodyweight exercise targeting chest, shoulders, and triceps. Start in a plank position and lower your body until your chest nearly touches the floor, then push back up.",
              category: "Chest",
              muscles: "Chest, Shoulders, Triceps",
              equipment: "None"
            },
            {
              id: 2,
              name: "Squats", 
              description: "A lower body exercise targeting quadriceps and glutes. Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then return to standing.",
              category: "Legs",
              muscles: "Quadriceps, Glutes",
              equipment: "None"
            },
            {
              id: 3,
              name: "Planks",
              description: "Core strengthening exercise holding body in straight line. Support your weight on your forearms and toes, keeping your body straight from head to heels.",
              category: "Core",
              muscles: "Abs, Core",
              equipment: "None"
            },
            {
              id: 4,
              name: "Pull-ups",
              description: "Upper body exercise targeting back and biceps. Hang from a bar with palms facing away and pull your body up until your chin is over the bar.",
              category: "Back",
              muscles: "Latissimus Dorsi, Biceps",
              equipment: "Pull-up bar"
            },
            {
              id: 5,
              name: "Lunges",
              description: "Unilateral leg exercise for strength and balance. Step forward into a lunge position, lowering your back knee toward the ground, then return to standing.",
              category: "Legs", 
              muscles: "Quadriceps, Glutes, Hamstrings",
              equipment: "None"
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching exercises:', err);
        setError(err.message);
        // Use fallback data on error
        setExercises([
          {
            id: 1,
            name: "Push-ups",
            description: "A bodyweight exercise targeting chest, shoulders, and triceps.",
            category: "Chest",
            muscles: "Chest, Shoulders, Triceps",
            equipment: "None"
          },
          {
            id: 2,
            name: "Squats", 
            description: "A lower body exercise targeting quadriceps and glutes.",
            category: "Legs",
            muscles: "Quadriceps, Glutes", 
            equipment: "None"
          },
          {
            id: 3,
            name: "Planks",
            description: "Core strengthening exercise holding body in straight line.",
            category: "Core",
            muscles: "Abs, Core",
            equipment: "None"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-lg">⚡ Loading exercises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-cyan-300 px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_20px_#0ff] mb-8">
        🏋️ Exercises
      </h1>

      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
          <p className="text-red-400">⚠️ API Error: {error}</p>
          <p className="text-sm text-gray-300 mt-1">Showing fallback exercises instead.</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {exercises.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏋️</div>
            <h3 className="text-xl font-bold text-cyan-300 mb-2">No exercises available</h3>
            <p className="text-gray-400">
              Unable to load exercises at this time. Please try again later.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-lg text-cyan-300">
                Discover <span className="font-bold text-purple-400">{exercises.length}</span> exercises to enhance your workout
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise, index) => (
                <div
                  key={exercise.id || index}
                  className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:scale-105 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-cyan-300 flex-1 pr-2">
                      {exercise.name}
                    </h2>
                    <span className="text-2xl">💪</span>
                  </div>
                  
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {exercise.description}
                  </p>
                  
                  {/* Exercise details */}
                  <div className="space-y-2 pt-4 border-t border-gray-700/30">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 text-sm">🎯</span>
                      <span className="text-xs text-purple-400 font-semibold">Category:</span>
                      <span className="text-xs text-gray-300">{exercise.category}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm">💪</span>
                      <span className="text-xs text-green-400 font-semibold">Muscles:</span>
                      <span className="text-xs text-gray-300">{exercise.muscles}</span>
                    </div>
                    
                    {exercise.equipment && exercise.equipment !== 'None' && (
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-sm">🏋️</span>
                        <span className="text-xs text-yellow-400 font-semibold">Equipment:</span>
                        <span className="text-xs text-gray-300">{exercise.equipment}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}