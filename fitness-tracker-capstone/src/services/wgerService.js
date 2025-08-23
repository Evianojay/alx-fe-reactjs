import axios from "axios";

const API_BASE_URL = "https://wger.de/api/v2";

// Fetch list of exercises
export const fetchExercises = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exercise/?language=2&status=2&limit=20`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

// Fetch exercise details by ID
export const fetchExerciseDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exerciseinfo/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exercise ${id}:`, error);
    return null;
  }
};
