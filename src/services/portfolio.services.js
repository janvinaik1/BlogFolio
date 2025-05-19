import axiosInstance from "../../axios.config";

const portfolioService = {
  getPortfolio: async (id) => {
    try {
      const response = await axiosInstance.get(`/portfolio/${id}`);
      return response.data;
    } catch (err) {
      console.error("error fetching portfolio", err);
    }
  },

  createPortfolio: async (portfoliodata, token,userId) => {
    try {
      console.log("testing:",portfoliodata)
      const response = await axiosInstance.post(
        `/portfolio/create/${userId}`,
        portfoliodata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("error creating portfolio", err);
    }
  },

  updatePortfolio: async (id, updatedData, token) => {
    try {
      const response = await axiosInstance.put(`/portfolio/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
