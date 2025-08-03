import axios from 'axios';

export const fetchUserData = (username, location = '', minRepos = '') => {
  let query = `user:${username}`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  return axios
    .get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`)
    .then((res) => res.data.items);
};
