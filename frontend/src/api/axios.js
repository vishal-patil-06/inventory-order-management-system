import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const owner = localStorage.getItem("owner");

  if (owner) {
    const parsedOwner = JSON.parse(owner);

    config.headers["X-Owner-Id"] =
      parsedOwner.owner_id;
  }

  return config;
});

export default api;