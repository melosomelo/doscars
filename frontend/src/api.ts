import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "7222c8cfd621473be07c0b36338c4cb0",
  },
});

export const posterBasePath = "https://image.tmdb.org/t/p/w342";

export default api;
