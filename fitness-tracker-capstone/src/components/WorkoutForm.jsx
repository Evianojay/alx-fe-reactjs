// src/components/WorkoutForm.jsx
import { useState, useEffect } from "react";

function WorkoutForm({ addWorkout }) {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [duration, setDuration] = useState("");

  // Fetch exercises from API
  useEffect(() => {
    fetch("https://wger.de/api/v2/exerciseinfo/?limit=20&language=2")
      .then((res) => res.json())
      .then((data) => {
        setExercises(data.results);
      })
      .catch((err) => console.error("Error fetching exercises:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedExercise || !duration) return;

    const newWorkout = {
      exercise: selectedExercise,
      duration,
    };

    addWorkout(newWorkout);
    setSelectedExercise("");
    setDuration("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded bg-gray-50 space-y-3"
    >
      {/* Exercise Select */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Choose Exercise
        </label>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="w-full p-2 border rounded bg-white text-gray-900"
        >
          <option value="" disabled>
            -- Select an Exercise --
          </option>
          {exercises.map((exercise) => (
            <option
              key={exercise.id}
              value={exercise.name}
              className="text-gray-900 bg-white"
            >
              {exercise.name}
            </option>
          ))}
        </select>
      </div>

      {/* Duration Input */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Duration (minutes)
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration"
          className="w-full p-2 border rounded bg-white text-gray-900"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Add Workout
      </button>
    </form>
  );
}

export default WorkoutForm;
