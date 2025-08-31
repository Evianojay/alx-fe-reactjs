import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getStoredData, setStoredData } from "../utils/storage";

const TrackerPage = () => {
  const [logs, setLogs] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [view, setView] = useState("log"); // 'log', 'history', 'progress'

  // Load logs
  useEffect(() => {
    const savedLogs = getStoredData("workoutLogs", []);
    setLogs(savedLogs);
  }, []);

  // Save logs
  useEffect(() => {
    setStoredData("workoutLogs", logs);
  }, [logs]);

  const addLog = () => {
    if (!exercise || !sets || !reps) {
      alert("Please fill in at least Exercise, Sets, and Reps");
      return;
    }
    const newLog = {
      id: Date.now(),
      exercise: exercise.trim(),
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: weight ? parseFloat(weight) : null,
      duration: duration ? parseInt(duration) : null,
      notes: notes.trim(),
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
    };
    setLogs([newLog, ...logs]);
    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
    setDuration("");
    setNotes("");
  };

  const deleteLog = (id) => {
    if (window.confirm("Delete this log?")) {
      setLogs(logs.filter((log) => log.id !== id));
    }
  };

  const clearAllLogs = () => {
    if (window.confirm("Clear all logs? This cannot be undone.")) {
      setLogs([]);
      setStoredData("workoutLogs", []);
    }
  };

  // Stats
  const totalWorkouts = logs.length;
  const totalSets = logs.reduce((sum, log) => sum + log.sets, 0);
  const totalReps = logs.reduce((sum, log) => sum + log.sets * log.reps, 0);
  const totalWeight = logs.reduce((sum, log) => {
    if (log.weight) return sum + log.sets * log.reps * log.weight;
    return sum;
  }, 0);

  // Progress Data
  const getProgressData = () => {
    const last30Days = logs
      .filter((log) => {
        const logDate = new Date(log.timestamp);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 30);
        return logDate >= cutoff;
      })
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const dailyData = {};
    last30Days.forEach((log) => {
      if (!dailyData[log.date]) {
        dailyData[log.date] = { date: log.date, workouts: 0, totalReps: 0, totalWeight: 0 };
      }
      dailyData[log.date].workouts += 1;
      dailyData[log.date].totalReps += log.sets * log.reps;
      if (log.weight) {
        dailyData[log.date].totalWeight += log.sets * log.reps * log.weight;
      }
    });
    return Object.values(dailyData);
  };

  const getExerciseDistribution = () => {
    const count = {};
    logs.forEach((log) => {
      count[log.exercise] = (count[log.exercise] || 0) + 1;
    });
    return Object.entries(count)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  };

  const progressData = getProgressData();
  const exerciseDistribution = getExerciseDistribution();
  const COLORS = ["#00ffff", "#ff00ff", "#ffff00", "#00ff00", "#ff8000", "#8000ff", "#ff0080", "#80ff00"];

  const handleKeyPress = (e) => e.key === "Enter" && addLog();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-cyan-300 px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow mb-8">
        📊 Workout Tracker
      </h1>

      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-1">
            {[
              { key: "log", label: "Log Workout", icon: "✍️" },
              { key: "history", label: "History", icon: "📋" },
              { key: "progress", label: "Progress", icon: "📈" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setView(tab.key)}
                className={`px-6 py-3 rounded-lg transition ${
                  view === tab.key
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow"
                    : "text-cyan-300 hover:bg-cyan-500/20"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{totalWorkouts}</div>
            <div className="text-sm text-gray-400">Total Workouts</div>
          </div>
          <div className="bg-black/40 border border-purple-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{totalSets}</div>
            <div className="text-sm text-gray-400">Total Sets</div>
          </div>
          <div className="bg-black/40 border border-green-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{totalReps.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Reps</div>
          </div>
          <div className="bg-black/40 border border-yellow-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{Math.round(totalWeight).toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Weight (kg)</div>
          </div>
        </div>

        {/* Views */}
        {view === "log" && (
          <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">💪 Log Exercise</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Exercise */}
              <input
                type="text"
                placeholder="Exercise Name *"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100"
              />
              {/* Sets */}
              <input
                type="number"
                placeholder="Sets *"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100"
              />
              {/* Reps */}
              <input
                type="number"
                placeholder="Reps *"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100"
              />
              {/* Weight */}
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100"
              />
              {/* Duration */}
              <input
                type="number"
                placeholder="Duration (min)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100"
              />
              {/* Notes */}
              <input
                type="text"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={addLog}
                disabled={!exercise || !sets || !reps}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg"
              >
                ✓ Add Log
              </button>
              {logs.length > 0 && (
                <button
                  onClick={clearAllLogs}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg"
                >
                  🗑️ Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {view === "history" && (
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">📋 Workout History</h2>
            {logs.length === 0 ? (
              <p>No logs yet. Add some workouts!</p>
            ) : (
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="bg-black/40 border border-cyan-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-cyan-300">{log.exercise}</h3>
                    <p className="text-sm text-gray-400">
                      {log.sets} sets × {log.reps} reps {log.weight ? `@ ${log.weight}kg` : ""}
                    </p>
                    <p className="text-sm text-gray-400">Duration: {log.duration || "—"} min</p>
                    <p className="text-sm text-gray-400">Notes: {log.notes || "—"}</p>
                    <p className="text-xs text-gray-500">📅 {log.date}</p>
                    <button
                      onClick={() => deleteLog(log.id)}
                      className="text-red-400 mt-2"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "progress" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">📈 Progress Analytics</h2>

            {progressData.length > 0 && (
              <div className="h-80 bg-black/40 border border-cyan-500/30 rounded-lg p-6">
                <h3 className="mb-4">Daily Activity (Last 30 Days)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="workouts" stroke="#00ffff" />
                    <Line type="monotone" dataKey="totalReps" stroke="#ff00ff" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {exerciseDistribution.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-64 bg-black/40 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="mb-4">Most Popular Exercises</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={exerciseDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#00ffff" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-64 bg-black/40 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="mb-4">Exercise Distribution</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={exerciseDistribution} dataKey="value" nameKey="name" outerRadius={80}>
                        {exerciseDistribution.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerPage;
