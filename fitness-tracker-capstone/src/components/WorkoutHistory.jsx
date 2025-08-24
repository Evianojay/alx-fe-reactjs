export default function WorkoutHistory({ workouts }) {
  if (workouts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md mt-6 text-center text-gray-500">
        No workouts logged yet.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Workout History</h2>
      <ul className="space-y-4">
        {workouts.map((workout) => (
          <li
            key={workout.id}
            className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-blue-600">{workout.exercise}</span>
              <span className="text-sm text-gray-500">{workout.date}</span>
            </div>
            <p className="text-gray-700 mt-2">
              {workout.sets} sets × {workout.reps} reps @ {workout.weight} kg
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
