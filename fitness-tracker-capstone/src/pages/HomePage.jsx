// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { getStoredData } from "../utils/storage";

const HomePage = () => {
  const stats = getStoredData("workoutLogs", []);
  const totalWorkouts = stats.length;
  const totalSets = stats.reduce((sum, log) => sum + log.sets, 0);
  const totalReps = stats.reduce((sum, log) => sum + log.sets * log.reps, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-cyan-900 text-cyan-300 flex flex-col items-center justify-center px-6 py-12">
      {/* App Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 animate-pulse drop-shadow-[0_0_25px_#00FFFF]">
        ⚡ Gym Companion ⚡
      </h1>

      {/* Tagline */}
      <p className="mt-6 text-lg md:text-2xl text-center text-cyan-200 font-light tracking-wide drop-shadow-[0_0_10px_#00FFFF]">
        Stronger every{" "}
        <span className="text-pink-400 font-semibold">day</span>, smarter every{" "}
        <span className="text-purple-400 font-semibold">rep</span>.
      </p>

      {/* Quick Stats */}
      {totalWorkouts > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{totalWorkouts}</div>
            <div className="text-sm text-gray-400">Workouts</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{totalSets}</div>
            <div className="text-sm text-gray-400">Total Sets</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {totalReps.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Reps</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        <Link
          to="/exercises"
          className="px-8 py-4 rounded-lg text-lg font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_#0ff] hover:scale-110 transition transform"
        >
          🏋️ Explore Exercises
        </Link>
        <Link
          to="/nutrition"
          className="px-8 py-4 rounded-lg text-lg font-bold bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-[0_0_20px_#f0f] hover:scale-110 transition transform"
        >
          🍎 Nutrition
        </Link>
        <Link
          to="/tracker"
          className="px-8 py-4 rounded-lg text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-600 text-black shadow-[0_0_20px_#ff0] hover:scale-110 transition transform"
        >
          📊 Track Progress
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-cyan-400 opacity-70 text-center">
        <p>Complete workout + nutrition tracking — Powered by WGER API</p>
      </footer>
    </div>
  );
};

export default HomePage;
