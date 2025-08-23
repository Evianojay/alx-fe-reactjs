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
    <div className="exercise-grid">
      {exercises.map((ex) => (
        <div key={ex.id} className="exercise-card">
          <h2>{ex.name}</h2>
          <p>{ex.description.replace(/<[^>]+>/g, "")}</p>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
