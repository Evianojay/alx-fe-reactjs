import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";

import HomePage from "./pages/HomePage";
import ExercisesPage from "./pages/ExercisesPage";
import NutritionPage from "./pages/NutritionPage";
import TrackerPage from "./pages/TrackerPage";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navigation />
        <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-950 min-h-screen text-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
