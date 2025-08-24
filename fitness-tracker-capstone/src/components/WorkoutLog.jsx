// src/components/WorkoutLog.jsx
import React, { useState } from "react";

function WorkoutLog({ exercises, onAddWorkout }) {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise || !duration || !calories) return;
    onAddWorkout({ exercise, duration, calories });
    setExercise("");
    setDuration("");
    setCalories("");
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Log Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Exercise Dropdown */}
        <select
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="w-full border rounded-lg p-2 text-gray-900"
        >
          <option value="">-- Select Exercise --</option>
          {exercises.map((ex, index) => (
            <option key={index} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        {/* Duration */}
        <input
          type="number"
          placeholder="Duration (mins)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border rounded-lg p-2 text-gray-900"
        />

        {/* Calories */}
        <input
          type="number"
          placeholder="Calories burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="w-full border rounded-lg p-2 text-gray-900"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
        >
          Add Workout
        </button>
      </form>
    </div>
  );
}

export default WorkoutLog;
