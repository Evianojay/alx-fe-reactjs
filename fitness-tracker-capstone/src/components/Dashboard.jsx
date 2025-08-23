import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome header */}
      <div className="text-center">
        <h1 className="text-4xl font-techno text-accent-neonBlueViolet">
          Fitness Dashboard
        </h1>
        <p className="text-base-white/70 mt-2">
          Track your progress in style 🚀
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-darkGray/70 backdrop-blur-md p-6 rounded-lg border border-accent-neonBlueViolet">
          <h2 className="text-lg text-accent-teal">Workouts</h2>
          <p className="text-3xl font-bold text-base-white">12</p>
        </div>

        <div className="bg-base-darkGray/70 backdrop-blur-md p-6 rounded-lg border border-accent-redOrange">
          <h2 className="text-lg text-accent-redOrange">Calories Burned</h2>
          <p className="text-3xl font-bold text-base-white">3,450 kcal</p>
        </div>

        <div className="bg-base-darkGray/70 backdrop-blur-md p-6 rounded-lg border border-accent-teal">
          <h2 className="text-lg text-accent-teal">Active Days</h2>
          <p className="text-3xl font-bold text-base-white">8</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
