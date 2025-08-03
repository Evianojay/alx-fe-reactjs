import axios from "axios";

const BASE_URL = import.meta.env.VITE_GITHUB_API_URL;

export async function fetchUserData(username) {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
}
