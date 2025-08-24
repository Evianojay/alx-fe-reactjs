import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProgressChart({ workouts }) {
  if (workouts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md mt-6 text-center text-gray-500">
        No progress data yet. Log some workouts!
      </div>
    );
  }

  // Transform workouts into chart-friendly data
  const chartData = workouts.map((w, index) => ({
    name: `W${index + 1}`, // Workout number
    totalWeight: w.sets * w.reps * w.weight, // Volume lifted
  })).reverse(); // Reverse so oldest is first

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Progress Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalWeight" stroke="#2563eb" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
