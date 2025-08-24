import { useState, useEffect } from "react";

const TrackerPage = () => {
  const [logs, setLogs] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  // Load logs from localStorage on component mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('workoutLogs');
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (error) {
        console.error('Error loading saved logs:', error);
      }
    }
  }, []);

  // Save logs to localStorage whenever logs change
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem('workoutLogs', JSON.stringify(logs));
    }
  }, [logs]);

  const addLog = () => {
    if (!exercise || !sets || !reps) {
      alert('Please fill in at least Exercise, Sets, and Reps');
      return;
    }

    const newLog = {
      id: Date.now(), // Simple ID for key prop
      exercise: exercise.trim(),
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: weight ? parseFloat(weight) : null,
      duration: duration ? parseInt(duration) : null,
      notes: notes.trim(),
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString()
    };

    setLogs([newLog, ...logs]); // Add new log at the beginning
    
    // Clear form
    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
    setDuration("");
    setNotes("");
  };

  const deleteLog = (id) => {
    if (confirm('Are you sure you want to delete this log?')) {
      setLogs(logs.filter(log => log.id !== id));
    }
  };

  const clearAllLogs = () => {
    if (confirm('Are you sure you want to clear all logs? This cannot be undone.')) {
      setLogs([]);
      localStorage.removeItem('workoutLogs');
    }
  };

  // Calculate total stats
  const totalWorkouts = logs.length;
  const totalSets = logs.reduce((sum, log) => sum + log.sets, 0);
  const totalReps = logs.reduce((sum, log) => sum + (log.sets * log.reps), 0);
  const totalWeight = logs.reduce((sum, log) => {
    if (log.weight) {
      return sum + (log.sets * log.reps * log.weight);
    }
    return sum;
  }, 0);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addLog();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-cyan-300 px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_20px_#0ff] mb-8">
        📊 Workout Tracker
      </h1>

      <div className="max-w-6xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{totalWorkouts}</div>
            <div className="text-sm text-gray-400">Total Workouts</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{totalSets}</div>
            <div className="text-sm text-gray-400">Total Sets</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{totalReps.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Reps</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-yellow-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{totalWeight.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Weight (kg)</div>
          </div>
        </div>

        {/* Log Exercise Form */}
        <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 mb-8 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
          <h2 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
            <span className="text-2xl">💪</span>
            Log Exercise
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2">
                Exercise Name *
              </label>
              <input
                type="text"
                placeholder="e.g., Bench Press, Squats"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2">
                Sets *
              </label>
              <input
                type="number"
                placeholder="3"
                min="1"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2">
                Reps *
              </label>
              <input
                type="number"
                placeholder="12"
                min="1"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                placeholder="50"
                min="0"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                placeholder="30"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2">
                Notes
              </label>
              <input
                type="text"
                placeholder="Good form, felt strong"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={addLog}
              disabled={!exercise || !sets || !reps}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-[0_0_10px_#10b981] flex items-center gap-2"
            >
              <span className="text-lg">✓</span>
              Add Log
            </button>
            
            {logs.length > 0 && (
              <button
                onClick={clearAllLogs}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-semibold shadow-[0_0_10px_#ef4444] flex items-center gap-2"
              >
                <span className="text-lg">🗑️</span>
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Workout Logs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Your Workout Logs
            </h2>
            {logs.length > 0 && (
              <span className="text-sm text-gray-400">
                {logs.length} workout{logs.length !== 1 ? 's' : ''} logged
              </span>
            )}
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-lg border border-gray-700/30">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">No workouts logged yet</h3>
              <p className="text-gray-400">
                Start by logging your first exercise above!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:border-cyan-400/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-cyan-300 mb-2">
                        {log.exercise}
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center bg-purple-900/30 rounded-lg p-2">
                          <div className="text-lg font-bold text-purple-300">{log.sets}</div>
                          <div className="text-xs text-gray-400">Sets</div>
                        </div>
                        <div className="text-center bg-blue-900/30 rounded-lg p-2">
                          <div className="text-lg font-bold text-blue-300">{log.reps}</div>
                          <div className="text-xs text-gray-400">Reps</div>
                        </div>
                        <div className="text-center bg-yellow-900/30 rounded-lg p-2">
                          <div className="text-lg font-bold text-yellow-300">
                            {log.weight ? `${log.weight}kg` : '—'}
                          </div>
                          <div className="text-xs text-gray-400">Weight</div>
                        </div>
                        <div className="text-center bg-green-900/30 rounded-lg p-2">
                          <div className="text-lg font-bold text-green-300">
                            {log.duration ? `${log.duration}min` : '—'}
                          </div>
                          <div className="text-xs text-gray-400">Duration</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="text-cyan-400 font-medium">
                          📅 {log.date}
                        </span>
                        {log.notes && (
                          <span className="text-gray-300">
                            📝 {log.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteLog(log.id)}
                      className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete log"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;