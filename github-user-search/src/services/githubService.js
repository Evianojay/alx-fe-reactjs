import axios from "axios";

const BASE_URL = "https://api.github.com";

export async function fetchUserData(username) {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
}
