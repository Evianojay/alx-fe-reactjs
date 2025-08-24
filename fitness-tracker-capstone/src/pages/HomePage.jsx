// src/pages/HomePage.jsx
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-cyan-900 text-cyan-300 flex flex-col items-center justify-center px-6 py-12">
      {/* Neon Glitch Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 animate-pulse drop-shadow-[0_0_25px_#00FFFF]">
        ⚡ CyberFit Companion ⚡
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg md:text-2xl text-center text-cyan-200 font-light tracking-wide drop-shadow-[0_0_10px_#00FFFF]">
        Level up your <span className="text-pink-400 font-semibold">body</span>,  
        upgrade your <span className="text-purple-400 font-semibold">mind</span>,  
        and hack your <span className="text-cyan-400 font-semibold">fitness</span>.
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        <a
          href="/exercises"
          className="px-8 py-4 rounded-lg text-lg font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_#0ff] hover:scale-110 transition transform"
        >
          🚀 Explore Exercises
        </a>
        <a
          href="/nutrition"
          className="px-8 py-4 rounded-lg text-lg font-bold bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-[0_0_20px_#f0f] hover:scale-110 transition transform"
        >
          🍽️ Optimize Nutrition
        </a>
        <a
          href="/tracker"
          className="px-8 py-4 rounded-lg text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-600 text-black shadow-[0_0_20px_#ff0] hover:scale-110 transition transform"
        >
          📊 Track Progress
        </a>
      </div>

      {/* Footer tagline */}
      <footer className="mt-16 text-sm text-cyan-400 opacity-70 text-center">
        <p>Cybernetic Fitness Evolution — Powered by WGER API</p>
      </footer>
    </div>
  );
}
