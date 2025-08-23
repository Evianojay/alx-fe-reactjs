import React, { useEffect, useState } from "react";
import { fetchExercises } from "../services/wgerService";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExercises = async () => {
      const data = await fetchExercises();
      setExercises(data);
      setLoading(false);
    };
    loadExercises();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading exercises...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {exercises.map((ex) => (
        <div key={ex.id} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg mb-2">{ex.name}</h2>
          <p className="text-gray-600 text-sm">{ex.description.replace(/<[^>]+>/g, "")}</p>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
