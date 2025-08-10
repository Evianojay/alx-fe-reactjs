// src/App.jsx
import React from 'react';
import UserProfile from './components/UserProfile';
import './index.css'; // ensure Tailwind (or your CSS) is imported here

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <UserProfile />
    </div>
  );
}

export default App;
