// src/utils/axios.js
// Use this instead of plain axios in CreatePost, EditPost, Home (delete)
// It automatically attaches the JWT token to every request

import axios from "axios";

const api = axios.create({
  baseURL: "https://blogg-qqfa.onrender.com/api",
});

// attach token from localStorage before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// if token expired, redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;