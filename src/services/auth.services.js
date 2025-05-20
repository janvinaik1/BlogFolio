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
  },

  forgotPassword:async(email)=>{
    try{
      const response=await axiosInstance.post("/forgot-password",email)
      return response.data;
    }catch(error){
      console.error("error:", error);
    }
  },

  resetPassword:async(token,newPassword)=>{
    try{
      const response=await axiosInstance.post("/reset-password",{token,newPassword})
      return response.data;
    }catch(error){
      console.error("error resetting password:", error);
    }
  }
};

export default authService;
