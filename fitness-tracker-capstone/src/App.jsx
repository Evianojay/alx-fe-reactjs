import React from "react";
import ExerciseList from "./components/ExerciseList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6">💪 Fitness Tracker</h1>
      <ExerciseList />
    </div>
  );
}

export default App;
