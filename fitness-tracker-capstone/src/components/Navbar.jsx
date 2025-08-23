import React from "react";

const Navbar = () => {
  return (
    <nav className="glass fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50">
      <h1 className="text-2xl font-techno text-accent-neonBlueViolet tracking-wide">
        ⚡ FitTrack
      </h1>
      <ul className="flex gap-6 text-sm font-semibold">
        <li className="hover:text-accent-teal cursor-pointer">Dashboard</li>
        <li className="hover:text-accent-redOrange cursor-pointer">Workouts</li>
        <li className="hover:text-accent-neonBlueViolet cursor-pointer">Nutrition</li>
      </ul>
    </nav>
  );
};

export default Navbar;
