// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExercisesPage from "./pages/ExercisesPage";
import NutritionPage from "./pages/NutritionPage";
import TrackerPage from "./pages/TrackerPage";

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="bg-black text-cyan-400 p-4 flex justify-between items-center border-b border-cyan-600">
        <h1 className="text-xl font-bold tracking-widest">Cyberpunk Fitness Tracker</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-pink-500 transition">Home</Link>
          <Link to="/exercises" className="hover:text-pink-500 transition">Exercises</Link>
          <Link to="/nutrition" className="hover:text-pink-500 transition">Nutrition</Link>
          <Link to="/tracker" className="hover:text-pink-500 transition">Tracker</Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-950 min-h-screen text-gray-100 p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
