import axiosInstance from "../../axios.config";

const portfolioService = {
  getPortfolio: async (id) => {
    try {
      const response = await axiosInstance.get(`/portfolio/${id}`);
      return { hasPortfolio: true, portfolio: response.data };
    } catch (err) {
      console.error("error fetching portfolio", err);
      if (err.response?.status === 404) {
        return { hasPortfolio: false, portfolio: null };
      }
      throw err;
    }
  },

  createPortfolio: async (portfoliodata, token, userId) => {
    try {
      const response = await axiosInstance.post(
        `/portfolio/create/${userId}`,
        portfoliodata, 
        {
          headers: {
            "Content-Type": "multipart/form-data", 
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error creating portfolio", err);
      throw err; 
    }
  },

  updatePortfolio: async (id, updatedData, token) => {
    try {
      const response = await axiosInstance.put(
        `/portfolio/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("error updating", err);
    }
  },

  deletePortfolio: async (id, token) => {
    try {
      const response = await axiosInstance.delete(`/portfolio/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.log("error deleting portfolio", err);
    }
  },
};

export default portfolioService;
