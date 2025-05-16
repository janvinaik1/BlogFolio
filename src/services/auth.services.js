// src/services/authService.js
import axiosInstance from "../../axios.config";

const authService = {
  login: async (blogData) => {
    try {
      const response = await axiosInstance.post("/login", blogData);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return error.response?.data || error;
    }
  },

  register: async (blogData) => {
    try {
      const response = await axiosInstance.post("/register", blogData);
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      return error.response?.data || error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  }
};

export default authService;
