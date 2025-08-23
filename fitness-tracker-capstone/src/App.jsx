import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-base-black text-base-white">
      <Navbar />
      <main className="pt-20">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
