import axios from "axios";

// Generic axios instance
const API = import.meta.env.VITE_API_URL || "";

export const api = axios.create({
  baseURL: `${API}/api`,
});

export const calculate = async (payload) => {
  const res = await api.post("/calculate", payload);
  return res.data;
};

export const getMeta = () => api.get("/meta");

export const sendContact = (formData) =>
  api.post("/contact", new URLSearchParams(formData), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

